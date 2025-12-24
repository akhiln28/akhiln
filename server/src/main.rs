use axum::{
    body::Body,
    extract::State,
    http::{header, Request, Response, StatusCode},
    routing::get,
    Router,
};
use command::Command;
use include_dir::{include_dir, Dir};
use pulldown_cmark::{html, Options, Parser};
use serde::Serialize;
use std::sync::Arc;

static PROJECT_DIR: Dir<'_> = include_dir!("$CARGO_MANIFEST_DIR/../publish");

#[derive(Clone)]
struct AppState {
    search_index: Arc<Vec<SearchItem>>,
    layout: String,
}

#[derive(Serialize, Clone)]
struct SearchItem {
    title: String,
    path: String,
    content: String,
}

#[tokio::main]
async fn main() -> Result<(), String> {
    let args: Vec<String> = std::env::args().skip(1).collect::<Vec<String>>();
    
    let server_cmd = Command {
        name: "server".to_string(),
        subcommands: vec![],
        flags: vec![
            command::FlagMeta::new("port", "p", "Port", true),
        ],
        handler: |args, _pos_args| -> Result<(), String> {
            let port_str = args.get("port").unwrap().get(0).unwrap();
            let port = port_str
                .parse::<u16>()
                .map_err(|e| format!("Failed to parse port: {}", e))?;
            
            start_server_sync(port).map_err(|e| e.to_string())?;
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

    command::process_command(&args, root_cmd).map_err(|e| format!("{:?}", e))
}

fn start_server_sync(port: u16) -> Result<(), Box<dyn std::error::Error>> {
    let rt = tokio::runtime::Runtime::new()?;
    rt.block_on(async {
        let search_index = build_search_index();
        let layout = PROJECT_DIR
            .get_file("layout.html")
            .and_then(|f| f.contents_utf8())
            .unwrap_or("<html><body>{{CONTENT}}</body></html>")
            .to_string();

        let state = AppState {
            search_index: Arc::new(search_index),
            layout,
        };

        let app = Router::new()
            .route("/api/search_index", get(get_search_index))
            .fallback(handle_request)
            .with_state(state);

        let listener = tokio::net::TcpListener::bind(format!("0.0.0.0:{}", port)).await?;
        println!("Server running on http://localhost:{}", port);
        axum::serve(listener, app).await?;
        Ok(())
    })
}

fn build_search_index() -> Vec<SearchItem> {
    let mut index = Vec::new();
    collect_md_files(&PROJECT_DIR, &mut index);
    index
}

fn collect_md_files(dir: &Dir<'_>, index: &mut Vec<SearchItem>) {
    for entry in dir.entries() {
        match entry {
            include_dir::DirEntry::Dir(d) => collect_md_files(d, index),
            include_dir::DirEntry::File(f) => {
                let path_str = f.path().to_string_lossy();
                if path_str.ends_with(".md") {
                    let content = f.contents_utf8().unwrap_or("");
                    let display_path = format!("/{}", path_str.replace(".md", ".html"));
                    let title = extract_title(content).unwrap_or_else(|| display_path.clone());
                    index.push(SearchItem {
                        title,
                        path: display_path,
                        content: content.to_string(),
                    });
                }
            }
        }
    }
}

fn extract_title(md: &str) -> Option<String> {
    if md.starts_with("---") {
        let after_dash = &md[3..];
        if let Some(end) = after_dash.find("---") {
            let frontmatter = &after_dash[..end];
            for line in frontmatter.lines() {
                if line.starts_with("title:") {
                    return Some(line["title:".len()..].trim().to_string());
                }
            }
        }
    }
    for line in md.lines() {
        if line.starts_with("# ") {
            return Some(line[2..].trim().to_string());
        }
    }
    None
}

async fn get_search_index(State(state): State<AppState>) -> axum::Json<Vec<SearchItem>> {
    axum::Json((*state.search_index).clone())
}

async fn handle_request(
    State(state): State<AppState>,
    req: Request<Body>,
) -> Response<Body> {
    let path = req.uri().path().trim_start_matches('/');
    let path = if path.is_empty() { "index.html" } else { path };

    if let Some(file) = PROJECT_DIR.get_file(path) {
        let mime = mime_guess::from_path(path).first_or_octet_stream();
        return Response::builder()
            .header(header::CONTENT_TYPE, mime.as_ref())
            .body(Body::from(file.contents()))
            .unwrap();
    }

    let md_path = if path.ends_with(".html") {
        path.replace(".html", ".md")
    } else {
        format!("{}.md", path)
    };

    if let Some(file) = PROJECT_DIR.get_file(&md_path) {
        let md_content = file.contents_utf8().unwrap_or("");
        
        let body_content = if md_content.starts_with("---") {
            let after_dash = &md_content[3..];
            if let Some(end) = after_dash.find("---") {
                &after_dash[end+3..]
            } else {
                md_content
            }
        } else {
            md_content
        };

        let mut options = Options::empty();
        options.insert(Options::ENABLE_TABLES);
        options.insert(Options::ENABLE_FOOTNOTES);
        options.insert(Options::ENABLE_STRIKETHROUGH);
        options.insert(Options::ENABLE_TASKLISTS);
        
        let parser = Parser::new_ext(body_content, options);
        let mut html_output = String::new();
        html::push_html(&mut html_output, parser);

        let title = extract_title(md_content).unwrap_or_else(|| path.to_string());
        let full_html = state.layout
            .replace("{{TITLE}}", &title)
            .replace("{{CONTENT}}", &html_output);

        return Response::builder()
            .header(header::CONTENT_TYPE, "text/html")
            .body(Body::from(full_html))
            .unwrap();
    }

    Response::builder()
        .status(StatusCode::NOT_FOUND)
        .body(Body::from("404 Not Found"))
        .unwrap()
}