require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs' } });

let editor;
let selected = null;

require(["vs/editor/editor.main"], function() {
    editor = monaco.editor.create(document.getElementById('markdown-content'), {
        value: ' ',
        language: 'markdown',
        theme: 'vs-dark',
        minimap: { enabled: false },
        scrollbar: { vertical: "hidden" },
        lineNumbers: "off",
    });

    editor.getModel().onDidChangeContent(() => {
        updatePreview();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    dragAndDrop();
});

function updatePreview() {
    const markdownContent = editor.getValue();
    const htmlPreview = document.getElementById('preview-content');
    const htmlContent = marked.parse(markdownContent);
    htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
}

function dragAndDrop() {
    let lists = document.getElementsByClassName("list");
    let addedComponentBlock = document.getElementById("added-component-block");
    let markdownContent = document.getElementById('markdown-content');

    for(list of lists) {
        for (let list of lists) {
            list.addEventListener("dragstart", function(e) {
                selected = e.target;
            });
        }
    
        addedComponentBlock.addEventListener("dragover", function(e) {
            e.preventDefault();
        });
    
        addedComponentBlock.addEventListener("drop", function(e) {
            e.preventDefault();
            if (selected) {
                addedComponentBlock.appendChild(selected);
                let textToAdd = '';
    
                if (selected.innerHTML.includes('API Reference')) {
                    textToAdd = apiReference();
                }
                else if (selected.innerHTML.includes('Acknowledgement')) {
                    textToAdd = acknowledgement();
                }
                else if (selected.innerHTML.includes('Appendix')) {
                    textToAdd = appendix();
                }
                else if (selected.innerHTML.includes('Authors')) {
                    textToAdd = authors();
                }
                else {
                    textToAdd = description();
                }
    
                editor.setValue(editor.getValue() + textToAdd);
                updatePreview();
                selected = null;
            }
        });
    }
}

