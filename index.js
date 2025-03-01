// Import our WASM module
// Note: The actual path will depend on how you build and serve the WASM files
import init, { process_markdown, MdqOptions } from './pkg/mdq_wasm.js';

// Sample markdown for the demo
const sampleMarkdown = `# MDQ Demo Document

This is a paragraph with some **bold** and *italic* text.

## Second Level Heading

- List item 1
- List item 2
  - Nested list item
- List item 3

### Task Lists

- [ ] Uncompleted task
- [x] Completed task
- [ ] Another task to do

## Ordered Lists

1. First item
2. Second item
3. Third item

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

\`\`\`rust
fn main() {
    println!("Hello from Rust!");
}
\`\`\`

Here's a [link to MDQ](https://github.com/yshavit/mdq) repository.

#### Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

##### Blockquote

> This is a blockquote.
> It can span multiple lines.

###### Images

![MDQ Logo](https://via.placeholder.com/150)

`;

// Initialize the Ace editor
let editor;

// Initialize our application when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize the WASM module
        await init();
        console.log('WASM module initialized successfully');
        
        // Set up the Ace editor
        editor = ace.edit("markdown-editor");
        editor.setTheme("ace/theme/github");
        editor.session.setMode("ace/mode/markdown");
        editor.setValue(sampleMarkdown);
        editor.clearSelection();
        
        // Add event listeners
        document.getElementById('process-btn').addEventListener('click', processMarkdown);
        
        // Add event listeners for example selectors
        document.querySelectorAll('.example-selector').forEach(elem => {
            elem.addEventListener('click', () => {
                document.getElementById('selector').value = elem.dataset.selector;
                processMarkdown();
            });
        });
        
        // Process with default selector
        document.getElementById('selector').value = '# heading';
        processMarkdown();
        
    } catch (error) {
        console.error('Failed to initialize WASM module:', error);
        document.getElementById('result').innerHTML = `<div class="alert alert-danger">
            Failed to initialize WASM module: ${error.message}
        </div>`;
    }
});

// Process the markdown with the given selector
async function processMarkdown() {
    const markdownContent = editor.getValue();
    const selector = document.getElementById('selector').value;
    const outputFormat = document.getElementById('output-format').value;
    
    if (!markdownContent || !selector) {
        document.getElementById('result').innerHTML = '<div class="alert alert-warning">Please provide both markdown content and a selector.</div>';
        return;
    }
    
    // Show loading indicator
    document.getElementById('loading').style.display = 'inline-block';
    document.getElementById('process-btn').disabled = true;
    
    try {
        // Create options object
        const options = new MdqOptions();
        options.set_output_format(outputFormat);
        
        // Process the markdown
        const result = process_markdown(markdownContent, selector, options);
        
        // Check if the result is exactly '{"items":[]}'
        if (result === '{"items":[]}') {
            document.getElementById('result').innerHTML = `<pre>No matches found.</pre>`;
            return;
        }
        
        // Display the result
        const resultElem = document.getElementById('result');
        
        if (outputFormat === 'json') {
            // Format JSON for better display
            try {
                const jsonObj = JSON.parse(result);
                
                // Check if no matches were found (empty items array)
                if (jsonObj.items && jsonObj.items.length === 0) {
                    resultElem.innerHTML = `<pre>No matches found.</pre>`;
                } else {
                    resultElem.innerHTML = `<pre>${JSON.stringify(jsonObj, null, 2)}</pre>`;
                }
            } catch (e) {
                resultElem.innerHTML = `<pre>${result}</pre>`;
            }
        } else {
            // For markdown, we'll use a simple markdown renderer
            // In a real app, you might want to use a proper markdown renderer like marked.js
            resultElem.innerHTML = `<pre>${result}</pre>`;
        }
    } catch (error) {
        console.error('Error processing markdown:', error);
        
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
    } finally {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';
        document.getElementById('process-btn').disabled = false;
    }
}
