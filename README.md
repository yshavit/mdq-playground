# MDQ WebAssembly Demo

This project demonstrates how to use the MDQ (Markdown Query) tool in a web browser by compiling it to WebAssembly.

## Overview

The demo compiles the Rust-based MDQ library to WebAssembly, making it available to use directly in the browser. The web interface allows you to:

1. Enter or paste Markdown content
2. Specify a selector to query specific elements in the Markdown
3. Choose the output format (Markdown or JSON)
4. View the results instantly

## Quick Start

See the `SETUP_GUIDE.md` file for detailed setup instructions. In short:

```bash
# Install wasm-pack if you don't have it
cargo install wasm-pack

# Build the WebAssembly module
wasm-pack build --target web

# Serve the web demo (using any local web server)
npx http-server
```

Then open your browser and navigate to `http://localhost:8080`

## MDQ Selector Syntax

MDQ uses a simple query language to select elements from Markdown documents. Here are some examples:

| Syntax | Selects | String matcher matches... |
|--------|---------|---------------------------|
| `# matcher` | section | section's header title |
| `- matcher` | unordered list items | text in the list item |
| `- [?] matcher` | unordered task items | task text |
| `[matcher](matcher)` | links | first matches link text, second matches URL |

For more details, see the [Full User Manual](https://github.com/yshavit/mdq/wiki/Full-User-Manual).

## Project Structure

- `src/lib.rs` - Rust code that exposes MDQ functionality to JavaScript
- `index.html` - The web interface
- `index.js` - JavaScript code that interacts with the WebAssembly module
- `pkg/` - (Generated) Contains the compiled WebAssembly module and JavaScript bindings
- `SETUP_GUIDE.md` - Detailed instructions for setting up the project
- `TROUBLESHOOTING.md` - Solutions for common issues
- `build.ps1` - PowerShell script to automate the build process

## Troubleshooting

If you encounter any issues during the build process, please refer to the `TROUBLESHOOTING.md` file for common problems and their solutions.

## About MDQ

MDQ is a command-line tool that lets you select specific elements from a Markdown document using a simple query language. You can install the original MDQ tool using one of these methods:

```bash
# Using cargo with git repository
cargo install --git https://github.com/yshavit/mdq

# Using Homebrew
brew install mdq

# Using Docker
docker pull yshavit/mdq
echo 'My [example](https://github.com/yshavit/mdq) markdown' | docker run --rm -i yshavit/mdq '[]()'
```

You can also download binaries from the [latest release](https://github.com/yshavit/mdq/releases).

## Acknowledgements

Special thank you to [@jerrylususu] for kickstarting this playground project!

[@jerrylususu]: https://github.com/jerrylususu
