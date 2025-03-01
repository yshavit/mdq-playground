use mdq::cli::Cli;
use wasm_bindgen::prelude::*;
use clap::Parser;

#[wasm_bindgen]
pub struct MdqOptions {
    output_format: String,
    wrap_width: Option<usize>,
    quiet: bool,
}

#[wasm_bindgen]
impl MdqOptions {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            output_format: "markdown".to_string(),
            wrap_width: None,
            quiet: false,
        }
    }

    #[wasm_bindgen]
    pub fn output_format(&self) -> String {
        self.output_format.clone()
    }

    #[wasm_bindgen]
    pub fn set_output_format(&mut self, format: String) {
        self.output_format = format;
    }

    #[wasm_bindgen]
    pub fn set_wrap_width(&mut self, width: Option<usize>) {
        self.wrap_width = width;
    }

    #[wasm_bindgen]
    pub fn set_quiet(&mut self, quiet: bool) {
        self.quiet = quiet;
    }
}

// Helper function to set up panic hook
#[cfg(feature = "console_error_panic_hook")]
fn set_panic_hook() {
    console_error_panic_hook::set_once();
}

#[cfg(not(feature = "console_error_panic_hook"))]
fn set_panic_hook() {
    // Do nothing if the feature is not enabled
}

#[wasm_bindgen]
pub fn process_markdown(markdown_content: &str, selector: &str, options: &MdqOptions) -> Result<String, JsValue> {
    // Set up panic hook for better error messages
    set_panic_hook();
    
    // Since we can't directly modify the fields of Cli, we'll build command-line arguments
    // and parse them using Cli::parse_from
    let mut args = vec!["mdq".to_string(), selector.to_string()];
    
    // Add output format
    if options.output_format == "json" {
        args.push("--output".to_string());
        args.push("json".to_string());
    }
    
    // Add wrap width if specified
    if let Some(width) = options.wrap_width {
        args.push("--wrap-width".to_string());
        args.push(width.to_string());
    }
    
    // Add quiet flag if needed
    if options.quiet {
        args.push("--quiet".to_string());
    }
    
    // Parse the arguments
    let cli = match Cli::try_parse_from(args.iter()) {
        Ok(cli) => cli,
        Err(e) => return Err(JsValue::from_str(&format!("Error parsing arguments: {}", e))),
    };
    
    // Run mdq with the provided options
    let (success, output) = mdq::run_in_memory(&cli, markdown_content);
    
    if success {
        Ok(output)
    } else {
        // If no matches were found, return an empty string rather than an error
        if output.is_empty() {
            Ok("No matches found.".to_string())
        } else {
            // If there was an actual error, return it
            Err(JsValue::from_str(&format!("Error: {}", output)))
        }
    }
}

// Add console error panic hook for better error messages
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen(start)]
pub fn start() {
    set_panic_hook();
}

// Helper function to log to the console
#[wasm_bindgen]
pub fn console_log(s: &str) {
    log(s);
}
