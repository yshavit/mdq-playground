# Build script for MDQ WebAssembly Demo

# Check if wasm-pack is installed
try {
    $wasmPackVersion = wasm-pack --version
    Write-Host "Found wasm-pack: $wasmPackVersion"
} catch {
    Write-Host "Error: wasm-pack not found. Please install it with 'cargo install wasm-pack'" -ForegroundColor Red
    Write-Host "Visit https://rustwasm.github.io/wasm-pack/installer/ for more information."
    exit 1
}

# Build the WebAssembly module
Write-Host "Building WebAssembly module..." -ForegroundColor Cyan
wasm-pack build --target web

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to build WebAssembly module" -ForegroundColor Red
    Write-Host "Please check TROUBLESHOOTING.md for common issues and solutions." -ForegroundColor Yellow
    exit 1
}

Write-Host "WebAssembly module built successfully!" -ForegroundColor Green

# Check if http-server is installed
$startServer = $false
try {
    # Try to find http-server using npm
    $httpServerVersion = npx http-server --version
    Write-Host "Found http-server: $httpServerVersion"
    $startServer = $true
} catch {
    Write-Host ""
    Write-Host "http-server not found. To run the demo, you can use a local web server:" -ForegroundColor Yellow
    Write-Host "  npx http-server" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or install it globally:" -ForegroundColor Yellow
    Write-Host "  npm install -g http-server" -ForegroundColor Cyan
    Write-Host "  http-server" -ForegroundColor Cyan
}

if ($startServer) {
    Write-Host ""
    Write-Host "Starting local web server..." -ForegroundColor Cyan
    Write-Host "Press Ctrl+C to stop the server when done." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Open your browser and navigate to http://localhost:8080" -ForegroundColor Green
    
    # Start the server
    npx http-server
}
else {
    Write-Host ""
    Write-Host "Then open your browser and navigate to http://localhost:8080" -ForegroundColor Cyan
}
