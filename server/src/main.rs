use command::Command;
use httplib::{health_check, serve_static_file};
use log::{log_debug, log_error, log_info};
use std::io::{Read, Write};
use std::net::TcpStream;
use std::sync::LazyLock;

pub static PATHS_EXCLUDED_FROM_AUTH: [&str; 1] = ["/api/healthcheck"];

pub static FOLDER_PATH: LazyLock<String> = std::sync::LazyLock::new(|| {
    let static_dir = std::env::var("FOLDER_PATH").expect("FOLDER_PATH not set");
    return static_dir;
});

// TODO: create command to generate the sitemap from the folder path
fn main() -> Result<(), String> {
    let args: Vec<String> = std::env::args().skip(1).collect::<Vec<String>>();
    let server_cmd = Command {
        name: "server".to_string(),
        subcommands: vec![],
        flags: vec![
            command::FlagMeta::new("port", "p", "Port", true),
            command::FlagMeta::new("thread_pool_size", "t", "Thread pool size", true),
        ],
        handler: |args, _pos_args| -> Result<(), String> {
            let port_str = args.get("port").unwrap().get(0).unwrap();
            let port = port_str
                .parse::<u16>()
                .map_err(|e| format!("Failed to parse port: {}", e))?;
            let thread_pool_size = args
                .get("thread_pool_size")
                .unwrap()
                .get(0)
                .unwrap()
                .parse::<usize>()
                .map_err(|e| format!("Failed to parse thread pool size: {}", e))?;
            start_server(port, thread_pool_size).unwrap();
            Ok(())
        },
        num_positional_args: 0,
        description: "Start the server".to_string(),
    };
    let root_cmd = Command {
        name: "notes".to_string(),
        subcommands: vec![server_cmd],
        handler: |_args, _pos_args| -> Result<(), String> { Ok(()) },
        flags: vec![],
        num_positional_args: 0,
        description: "Root command".to_string(),
    };
    command::process_command(&args, root_cmd)
}

fn handle_http_request(mut stream: TcpStream) {
    let mut buffer = vec![0; httplib::MAX_REQUEST_SIZE];
    stream
        .read(&mut buffer)
        .expect(format!("Failed to read request").as_str());

    let mut headers = [httparse::EMPTY_HEADER; 32];
    let mut req = httparse::Request::new(&mut headers);
    let parse_status: httparse::Status<usize> = match req.parse(&buffer) {
        Ok(status) => status,
        Err(e) => {
            log_error!("Failed to parse request: {:?}", e);
            return;
        }
    };

    for header in req.headers.iter() {
        log_info!(
            "Header: {} = {}",
            header.name,
            std::str::from_utf8(header.value).unwrap()
        );
    }

    if parse_status.is_complete() {
        let method = req.method.unwrap();
        let complete_path = req.path.unwrap();
        let (path, _) = httplib::parse_query_params(complete_path);

        // Serve static files
        let files_path = format!("{}", FOLDER_PATH.as_str());
        if let Some(file_response) = serve_static_file(&&files_path, path) {
            stream.write_all(&file_response).unwrap();
            stream.flush().unwrap();
            return;
        }

        let start_time = std::time::Instant::now();
        let response: Result<Vec<u8>, httplib::HttpError> = match (method, path) {
            ("GET", "/api/healthcheck") => Ok(health_check().into_bytes()),
            _ => Err(httplib::HttpError {
                status_code: 405,
                message: format!("Method {} and Path {} not allowed", method, path),
            }),
        };
        log_debug!(
            "Time taken for {} {} is {:?}",
            method,
            path,
            start_time.elapsed()
        );

        match response {
            Ok(response) => stream.write_all(&response).unwrap(),
            Err(http_error) => {
                let response = http_error.to_bytes();
                stream.write_all(&response).unwrap();
            }
        }
        stream.flush().expect("Failed to flush stream");
    }
}

pub fn start_server(port: u16, thread_pool_size: usize) -> Result<(), String> {
    log_info!("Server is listening at http://localhost:{}", port);
    let mut senders = vec![];
    for _ in 0..thread_pool_size {
        let (sender, receiver) = std::sync::mpsc::channel();
        senders.push(sender);
        std::thread::spawn(move || {
            for stream in receiver {
                handle_http_request(stream);
            }
        });
    }

    // now send the requests to the threads in a round robin fashion
    let mut index = 0;
    let tcp_listener = std::net::TcpListener::bind(format!("0.0.0.0:{}", port)).unwrap();
    for stream_res in tcp_listener.incoming() {
        match stream_res {
            Ok(stream) => {
                match senders[index].send(stream) {
                    Ok(_) => {}
                    Err(e) => log_error!("Failed to send stream: {}", e),
                }
                index = (index + 1) % thread_pool_size;
            }
            Err(e) => log_error!("Error: {}", e),
        }
    }
    Ok(())
}
