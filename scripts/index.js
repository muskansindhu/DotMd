document.addEventListener("DOMContentLoaded", function() {
    markdownConverter();
    dragAndDrop();
});

function markdownConverter() {
    document.getElementById('markdown-content').addEventListener('input', function() {
        const markdownContent = document.getElementById('markdown-content');
        const htmlPreview = document.getElementById('preview-content');
        const htmlContent = marked.parse(markdownContent.value);
        htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
    });
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
    
                if (selected.innerHTML.includes('Section 4')) {
                    textToAdd = `\n\n## Hi Adhiraj`;
                } else {
                    textToAdd = description();
                }
    
                markdownContent.value += textToAdd;
                const htmlContent = marked.parse(markdownContent.value);
                const htmlPreview = document.getElementById('preview-content');
                htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
                selected = null;
            }
        });
    }
}

