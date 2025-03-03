# MDQ WebAssembly Demo Setup Guide

This guide will walk you through setting up and building the MDQ WebAssembly demo project.

## Step 1: Install Required Tools

### 1. Rust and Cargo

If you don't have Rust installed, you can install it from https://www.rust-lang.org/tools/install

Verify your installation:
```bash
rustc --version
cargo --version
```

### 2. Install wasm-pack

wasm-pack is a tool for building Rust-generated WebAssembly packages:

```bash
cargo install wasm-pack
```

Verify your installation:
```bash
wasm-pack --version
```

### 3. Install a local web server (optional)

You can use any local web server to serve the demo. Here are a few options:

- Using npm:
  ```bash
  npm install -g http-server
  # or run without installing
  npx http-server
  ```

- Using Python:
  ```bash
  # Python 3
  python -m http.server 8080
  ```

## Step 2: Build the WebAssembly Module

1. Navigate to the web-demo directory:
   ```bash
   cd web-demo
   ```

2. Build the WebAssembly module:
   ```bash
   wasm-pack build --target web
   ```

   This will create a `pkg` directory containing the compiled WebAssembly module and JavaScript bindings.

## Step 3: Serve the Web Demo

1. Start a local web server in the web-demo directory:
   ```bash
   # If using http-server from npm
   http-server
   
   # If using Python
   python -m http.server 8080
   ```

2. Open your browser and navigate to `http://localhost:8080`

This script will build the WebAssembly module and start a local web server.

## Troubleshooting

### Common Issues:

1. **wasm-pack build fails**:
   - Make sure you have the latest version of Rust: `rustup update`
   - Try with the `--debug` flag: `wasm-pack build --target web --debug`

2. **Module not found errors in browser**:
   - Check the browser console for specific error messages
   - Ensure the path to the WASM module in `index.js` matches the actual path

3. **CORS errors when loading WASM**:
   - This is why we need a local web server; you can't just open the HTML file directly

4. **Blank page or no output**:
   - Check the browser console for JavaScript errors
   - Verify that all files are in the correct locations

## Next Steps

Once you have the demo working, you can:

1. Customize the UI in `index.html`
2. Add more features to the Rust library in `src/lib.rs`
3. Enhance the JavaScript integration in `index.js`

For troubleshooting, refer to the `TROUBLESHOOTING.md` file.
