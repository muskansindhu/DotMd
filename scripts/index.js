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
        wordWrap: 'on',
        overviewRulerBorder: false,
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        glyphMargin: true,
        folding: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 0
    });

    editor.onDidChangeModelContent(() => {
        currentSection(); 
    });
});

document.addEventListener("DOMContentLoaded", function() {
    dragAndDrop();
});

let sectionContent = []; 
function updatePreview() {
    let previewContent = ""; 
    for (const content of sectionContent) {
        previewContent += content;
    }
    const htmlPreview = document.getElementById('preview-content');
    const htmlContent = marked.parse(previewContent);
    htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
}

function dragAndDrop() {
    let lists = document.getElementsByClassName("list");
    let addedComponentBlock = document.getElementById("added-component-block");
    let markdownContent = document.getElementById('markdown-content');

    for (list of lists) {
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
            
            sectionContent.push(textToAdd); 
            editor.setValue(textToAdd);
            updatePreview();
            selected = null;
        }
    });
}


function currentSection() {
    const currentContent = editor.getValue();
    if (sectionContent.length > 0) {
        sectionContent[sectionContent.length - 1] = currentContent; 
        updatePreview(); 
    }
}
