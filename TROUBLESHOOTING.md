# Troubleshooting Guide for MDQ WebAssembly Demo

This guide addresses common issues you might encounter when building and running the MDQ WebAssembly demo.

## Fixed Issues

### 1. Missing `default()` implementation for `Cli`

**Error:**
```
error[E0599]: no function or associated item named `default` found for struct `Cli` in the current scope
```

**Solution:**
The code has been updated to use `Cli::parse_from(["mdq", ""])` instead of `Cli::default()`.

### 2. Feature flag issue with `console_error_panic_hook`

**Error:**
```
warning: unexpected `cfg` condition value: `console_error_panic_hook`
```

**Solution:**
Added a proper feature definition in Cargo.toml and made the dependency optional:
```toml
[dependencies]
console_error_panic_hook = { version = "0.1.7", optional = true }

[features]
default = ["console_error_panic_hook"]
```

Also added conditional compilation in the code:
```rust
#[cfg(feature = "console_error_panic_hook")]
fn set_panic_hook() {
    console_error_panic_hook::set_once();
}

#[cfg(not(feature = "console_error_panic_hook"))]
fn set_panic_hook() {
    // Do nothing if the feature is not enabled
}
```

### 3. Non-optional dependency in features

**Error:**
```
feature `default` includes `console_error_panic_hook`, but `console_error_panic_hook` is not an optional dependency
```

**Solution:**
Made the console_error_panic_hook dependency optional in Cargo.toml:
```toml
console_error_panic_hook = { version = "0.1.7", optional = true }
```

### 4. JavaScript method access issue

**Error:**
```
Error processing markdown: options.set_output_format is not a function
```

**Solution:**
In the Rust code, changed the `#[wasm_bindgen(setter)]` attribute to just `#[wasm_bindgen]` for the setter methods:

```rust
// Change this:
#[wasm_bindgen(setter)]
pub fn set_output_format(&mut self, format: String) {
    self.output_format = format;
}

// To this:
#[wasm_bindgen]
pub fn set_output_format(&mut self, format: String) {
    self.output_format = format;
}
```

The `setter` attribute is used to expose Rust methods as JavaScript property setters, but in our case, we want them to be exposed as regular methods that can be called with parentheses.

### 5. Error displaying "No matches found" in JSON format

**Error:**
```
Error processing markdown: Error: {"items":[]}
```

**Solution:**
When no matches are found in JSON format, the error handling needs to be modified to check for the empty items array in the error string:

```javascript
// In the catch block of processMarkdown function
catch (error) {
    // Handle the case where error is a string
    const errorStr = typeof error === 'string' ? error : (error.message || error.toString());
    
    // Check if the error string contains '{"items":[]}'
    if (errorStr.includes('{"items":[]}')) {
        document.getElementById('result').innerHTML = `<pre>No matches found.</pre>`;
    } else {
        document.getElementById('result').innerHTML = `<div class="alert alert-danger">
            Error processing markdown: ${errorStr}
        </div>`;
    }
}
```

This ensures that when no matches are found in JSON mode, the user sees "No matches found." instead of an error message, providing consistent behavior with the Markdown output format.

## Building the Project

To build the project, follow these steps:

1. Install wasm-pack if you haven't already:
```bash
cargo install wasm-pack
```

2. Navigate to the web-demo directory:
```bash
cd web-demo
```

3. Build the WebAssembly module:
```bash
wasm-pack build --target web
```

## Other Common Issues

### 1. Missing dependencies

If you encounter errors about missing dependencies, make sure you have all required packages installed:

```bash
cargo install wasm-bindgen-cli
```

### 2. WebAssembly module not found

If your browser can't find the WebAssembly module, check:
- The path in your `index.js` file matches the actual location of the files
- You're serving the files from a web server (not just opening the HTML file directly)

### 3. Runtime errors in the browser

If you encounter runtime errors:
- Check the browser console for specific error messages
- Make sure the JavaScript API matches what's exported from the Rust code
- Verify that all required functions and types are properly exported with `#[wasm_bindgen]`

## Additional Resources

- [wasm-bindgen documentation](https://rustwasm.github.io/docs/wasm-bindgen/)
- [Rust and WebAssembly book](https://rustwasm.github.io/docs/book/)
- [MDN WebAssembly documentation](https://developer.mozilla.org/en-US/docs/WebAssembly)
