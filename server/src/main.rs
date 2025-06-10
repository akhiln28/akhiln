use command::Command;
use httplib::{health_check, parse_http_request, serve_static_file, start_server};
use log::log_debug;
use std::io::Write;
use std::net::TcpStream;

pub const FOLDER_PATH: &str = "publish";

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
            start_server(port, thread_pool_size, handle_http_request).unwrap();
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

fn handle_http_request(mut stream: TcpStream) -> Result<(), String> {
    let request = parse_http_request(&mut stream)?;

    let files_path = format!("{}", FOLDER_PATH);
    if let Some(file_response) = serve_static_file(&&files_path, &request.path) {
        stream.write_all(&file_response).unwrap();
        return stream
            .flush()
            .map_err(|e| format!("failed to flush stream: {}", e));
    }

    let start_time = std::time::Instant::now();
    let response: Result<Vec<u8>, httplib::HttpError> =
        match (request.method.as_str(), request.path.as_str()) {
            ("GET", "/healthcheck") => Ok(health_check()),
            _ => Err(httplib::HttpError {
                status_code: 405,
                message: format!(
                    "Method {} and Path {} not allowed",
                    request.method, request.path
                ),
            }),
        };
    log_debug!(
        "Time taken for {} {} is {:?}",
        request.method,
        request.path,
        start_time.elapsed()
    );

    match response {
        Ok(response) => stream.write_all(&response).unwrap(),
        Err(http_error) => {
            let response = http_error.to_bytes();
            stream.write_all(&response).unwrap();
        }
    }
    stream
        .flush()
        .map_err(|e| format!("Failed to flush stream: {}", e))
}
