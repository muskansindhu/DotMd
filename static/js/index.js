require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs' } });

let editor;
let selected = null;
let currentSectionId = null;
let addedComponents = JSON.parse(localStorage.getItem('addedComponents')) || [];

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
    loadStateFromLocalStorage();  // Load state when editor is ready
});

document.addEventListener("DOMContentLoaded", function() {
    dragAndDrop();
});

let sectionContent = {}; 

function updatePreview() {
    let previewContent = ""; 
    for (const key in sectionContent) {
        if (sectionContent.hasOwnProperty(key)) {
            previewContent += sectionContent[key];
        }
    }
    const htmlPreview = document.getElementById('preview-content');
    const htmlContent = marked.parse(previewContent);
    htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
}

function dragAndDrop() {
    let lists = document.getElementsByClassName("list");
    let addedComponentBlock = document.getElementById("added-component-block");
    let markdownContent = document.getElementById('markdown-content');

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
            let sectionId = selected.id; 

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
            else if (selected.innerHTML.includes('Badges')) {
                textToAdd = badges();
            }
            else if (selected.innerHTML.includes('Color Reference')) {
                textToAdd = colorReference();
            }
            else if (selected.innerHTML.includes('Contributing')) {
                textToAdd = contributing();
            }
            else if (selected.innerHTML.includes('Demo')) {
                textToAdd = demo();
            }
            else if (selected.innerHTML.includes('Deployment')) {
                textToAdd = deployment();
            }
            else if (selected.innerHTML.includes('Documentation')) {
                textToAdd = documentation();
            }
            else if (selected.innerHTML.includes('Environment Variables')) {
                textToAdd = envVariables();
            }
            else if (selected.innerHTML.includes('FAQ')) {
                textToAdd = faq();
            }
            else if (selected.innerHTML.includes('Features')) {
                textToAdd = features();
            }
            else if (selected.innerHTML.includes('Feedback')) {
                textToAdd = feedback();
            }
            else if (selected.innerHTML.includes('License')) {
                textToAdd = license();
            }
            else if (selected.innerHTML.includes('Logo')) {
                textToAdd = logo();
            }
            else if (selected.innerHTML.includes('Screenshots')) {
                textToAdd = screenshots();
            }
            else if (selected.innerHTML.includes('Technology')) {
                textToAdd = technology();
            }
            else if (selected.innerHTML.includes('Usage/Example')) {
                textToAdd = usageOrExample();
            }
            else {
                textToAdd = description();
            }
            
            sectionContent[sectionId] = textToAdd; 
            currentSectionId = sectionId; 
            editor.setValue(textToAdd);
            updatePreview();
            selected = null;

            if (!addedComponents.includes(sectionId)) {
                addedComponents.push(sectionId);
                saveStateToLocalStorage();
            }
        }
    });
}

function currentSection() {
    if (currentSectionId) {
        const currentContent = editor.getValue();
        sectionContent[currentSectionId] = currentContent; 
        updatePreview(); 
        saveStateToLocalStorage(); 
    }
}

function selectedSection(selectedSectionId) {
    const allSections = document.querySelectorAll('.list');
    allSections.forEach(section => section.classList.remove('selected'));

    const selectedSection = document.getElementById(selectedSectionId);
    selectedSection.classList.add('selected');

    currentSectionId = selectedSectionId;
    editor.setValue(sectionContent[selectedSectionId]);
    // console.log(selectedSectionId);
}

function saveStateToLocalStorage() {
    localStorage.setItem('sectionContent', JSON.stringify(sectionContent));
    localStorage.setItem('currentSectionId', currentSectionId);
    localStorage.setItem('addedComponents', JSON.stringify(addedComponents));
}

function loadStateFromLocalStorage() {
    const savedSectionContent = localStorage.getItem('sectionContent');
    const savedCurrentSectionId = localStorage.getItem('currentSectionId');
    const savedAddedComponents = localStorage.getItem('addedComponents');

    if (savedSectionContent) {
        sectionContent = JSON.parse(savedSectionContent);
    }

    if (savedCurrentSectionId) {
        currentSectionId = savedCurrentSectionId;
        editor.setValue(sectionContent[currentSectionId] || '');
    }

    if (savedAddedComponents) {
        addedComponents = JSON.parse(savedAddedComponents);
        const addedComponentBlock = document.getElementById("added-component-block");
        addedComponents.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                addedComponentBlock.appendChild(element);
            }
        });
    }

    updatePreview();
}

function reset(componentId){
    let text = ""
    if (componentId === "acknowledgement") {
        text = acknowledgement()
        sectionContent["acknowledgement"] = text
    }
    else if (componentId === "apiReference") {
        text = apiReference();
        sectionContent["apiReference"] = text
    }
    else if (componentId === "appendix") {
        text = appendix();
        sectionContent["appendix"] = text
    }
    else if (componentId === "title&description") {
        text = description();
        sectionContent["title&description"] = text
    }
    else if (componentId === "badges") {
        text = badges();
        sectionContent["badges"] = text
    }
    else if (componentId === "colorReference") {
        text = colorReference();
        sectionContent["colorReference"] = text
    }
    else if (componentId === "contributing") {
        text = contributing();
        sectionContent["contributing"] = text
    }
    else if (componentId === "demo") {
        text = demo();
        sectionContent["demo"] = text
    }
    else if (componentId === "deployment") {
        text = deployment();
        sectionContent["deployment"] = text
    }
    else if (componentId === "documentation") {
        text = documentation();
        sectionContent["documentation"] = text
    }
    else if (componentId === "envVariables") {
        text = envVariables();
        sectionContent["envVariables"] = text
    }
    else if (componentId === "faq") {
        textToAdd = faq();
        sectionContent["faq"] = text
    }
    else if (componentId === "features") {
        text = features();
        sectionContent["features"] = text
    }
    else if (componentId === "feedback") {
        text = feedback();
        sectionContent["feedback"] = text
    }
    else if (componentId === "license") {
        text = license();
        sectionContent["license"] = text
    }
    else if (componentId === "logo") {
        text = logo();
        sectionContent["logo"] = text
    }
    else if (componentId === "") {
        text = screenshots();
        sectionContent["screenshots"] = text
    }
    else if (componentId === "technology") {
        text = technology();
        sectionContent["technology"] = text
    }
    else if (componentId === "usageOrExample") {
        text = usageOrExample();
        sectionContent["usageOrExample"] = text
    }
    else{
        text = authors();
        sectionContent["authors"] = text
    }

    saveStateToLocalStorage(); 
    loadStateFromLocalStorage();
    updatePreview();
}

function remove(componentId) {
    let addedComponentBlock = document.getElementById('added-component-block');
    let newComponentBlock = document.getElementById('new-component-block');
    let component = document.getElementById(componentId);

    if (component && addedComponentBlock.contains(component)) {
        addedComponentBlock.removeChild(component); 
        newComponentBlock.appendChild(component); 

        delete sectionContent[componentId];
        const index = addedComponents.indexOf(componentId);
        if (index !== -1) {
            addedComponents.splice(index, 1);
        }

        saveStateToLocalStorage();
        loadStateFromLocalStorage();
        updatePreview();
    }
}
