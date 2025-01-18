require.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.23.0/min/vs",
  },
});

let editor;
let selected = null;
let currentSectionId = null;
let addedComponents = JSON.parse(localStorage.getItem("addedComponents")) || [];

require(["vs/editor/editor.main"], function () {
  editor = monaco.editor.create(document.getElementById("markdown-content"), {
    value: " ",
    language: "markdown",
    theme: "vs-dark",
    minimap: { enabled: false },
    scrollbar: { vertical: "hidden" },
    lineNumbers: "off",
    wordWrap: "on",
    overviewRulerBorder: false,
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    glyphMargin: true,
    folding: false,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 0,
  });

  editor.onDidChangeModelContent(() => {
    currentSection();
  });
  loadStateFromLocalStorage(); // Load state when editor is ready
});

document.addEventListener("DOMContentLoaded", function () {
  setupClickEvent();
});

let sectionContent = {};

function updatePreview() {
  let previewContent = "";
  const rawPreviewLabel = document.getElementById("raw-label");
  const previewLabel = document.getElementById("preview-label");
  addedComponents.forEach((componentId) => {
    if (sectionContent.hasOwnProperty(componentId)) {
      previewContent += sectionContent[componentId];
    }
  });
  const htmlPreview = document.getElementById("preview-content");
  const htmlContent = marked.parse(previewContent);
  rawPreviewLabel.style.color = "rgb(90, 89, 89)";
  previewLabel.style.color = "#6fb3f7";
  htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, {
    USE_PROFILES: { html: true },
  });
}

function rawPreview() {
  let rawPreview = "";
  const rawPreviewLabel = document.getElementById("raw-label");
  const previewLabel = document.getElementById("preview-label");
  addedComponents.forEach((componentId) => {
    if (sectionContent.hasOwnProperty(componentId)) {
      rawPreview = rawPreview + sectionContent[componentId] + "<br><br>";
    }
  });
  const rawPreviewContent = document.getElementById("preview-content");
  rawPreviewLabel.style.color = "#6fb3f7";
  previewLabel.style.color = "rgb(90, 89, 89)";
  rawPreviewContent.innerHTML = rawPreview;
}

function getRaw() {
  let raw = "";
  addedComponents.forEach((componentId) => {
    if (sectionContent.hasOwnProperty(componentId)) {
      raw = raw + sectionContent[componentId] + "\n";
    }
  });
  return raw;
}

function setupClickEvent() {
  const components = document.getElementsByClassName("list");
  const addedComponentBlock = document.getElementById("added-component-block");

  for (let component of components) {
    component.removeEventListener("click", componentClickHandler);
    component.addEventListener("click", componentClickHandler);
  }
}

function componentClickHandler(event) {
  const component = event.currentTarget;
  const addedComponentBlock = document.getElementById("added-component-block");

  if (
    !addedComponentBlock.contains(component) &&
    !addedComponents.includes(component.id)
  ) {
    addedComponentBlock.appendChild(component);

    let textToAdd = "";
    const sectionId = component.id;

    if (component.innerHTML.includes("API Reference")) {
      textToAdd = apiReference();
    } else if (component.innerHTML.includes("Acknowledgement")) {
      textToAdd = acknowledgement();
    } else if (component.innerHTML.includes("Appendix")) {
      textToAdd = appendix();
    } else if (component.innerHTML.includes("Authors")) {
      textToAdd = authors();
    } else if (component.innerHTML.includes("Badges")) {
      textToAdd = badges();
    } else if (component.innerHTML.includes("Color Reference")) {
      textToAdd = colorReference();
    } else if (component.innerHTML.includes("Contributing")) {
      textToAdd = contributing();
    } else if (component.innerHTML.includes("Demo")) {
      textToAdd = demo();
    } else if (component.innerHTML.includes("Deployment")) {
      textToAdd = deployment();
    } else if (component.innerHTML.includes("Documentation")) {
      textToAdd = documentation();
    } else if (component.innerHTML.includes("Environment Variables")) {
      textToAdd = envVariables();
    } else if (component.innerHTML.includes("FAQ")) {
      textToAdd = faq();
    } else if (component.innerHTML.includes("Features")) {
      textToAdd = features();
    } else if (component.innerHTML.includes("Feedback")) {
      textToAdd = feedback();
    } else if (component.innerHTML.includes("License")) {
      textToAdd = license();
    } else if (component.innerHTML.includes("Logo")) {
      textToAdd = logo();
    } else if (component.innerHTML.includes("Screenshots")) {
      textToAdd = screenshots();
    } else if (component.innerHTML.includes("Technology")) {
      textToAdd = technology();
    } else if (component.innerHTML.includes("Usage/Example")) {
      textToAdd = usageOrExample();
    } else {
      textToAdd = description();
    }

    sectionContent[sectionId] = textToAdd;
    currentSectionId = sectionId;
    editor.setValue(textToAdd);
    updatePreview();

    if (!addedComponents.includes(sectionId)) {
      addedComponents.push(sectionId);
      saveStateToLocalStorage();
      updatePreview();
    }
  }
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
  const allSections = document.querySelectorAll(".list");
  allSections.forEach((section) => section.classList.remove("selected"));

  const selectedSection = document.getElementById(selectedSectionId);
  if (selectedSection) {
    selectedSection.classList.add("selected");
  }

  currentSectionId = selectedSectionId;
  if (editor && sectionContent[selectedSectionId]) {
    editor.setValue(sectionContent[selectedSectionId]);
  }
}

function saveStateToLocalStorage() {
  localStorage.setItem("sectionContent", JSON.stringify(sectionContent));
  localStorage.setItem("currentSectionId", currentSectionId);
  localStorage.setItem("addedComponents", JSON.stringify(addedComponents));
}

function loadStateFromLocalStorage() {
  const savedSectionContent = localStorage.getItem("sectionContent");
  const savedCurrentSectionId = localStorage.getItem("currentSectionId");
  const savedAddedComponents = localStorage.getItem("addedComponents");

  if (savedSectionContent) {
    sectionContent = JSON.parse(savedSectionContent);
  }

  if (savedCurrentSectionId) {
    currentSectionId = savedCurrentSectionId;
    if (editor) {
      editor.setValue(sectionContent[currentSectionId] || "");
    }
  }

  if (savedAddedComponents) {
    addedComponents = JSON.parse(savedAddedComponents);
    const addedComponentBlock = document.getElementById(
      "added-component-block"
    );
    const newComponentBlock = document.getElementById("new-component-block");

    document.querySelectorAll(".list").forEach((element) => {
      if (addedComponents.includes(element.id)) {
        addedComponentBlock.appendChild(element);
      } else {
        newComponentBlock.appendChild(element);
      }
    });
  }

  updatePreview();
  setupClickEvent(); // Re-setup click events after loading from local storage
}

function reset(componentId) {
  let text = "";
  if (componentId === "acknowledgement") {
    text = acknowledgement();
    sectionContent["acknowledgement"] = text;
  } else if (componentId === "apiReference") {
    text = apiReference();
    sectionContent["apiReference"] = text;
  } else if (componentId === "appendix") {
    text = appendix();
    sectionContent["appendix"] = text;
  } else if (componentId === "title&description") {
    text = description();
    sectionContent["title&description"] = text;
  } else if (componentId === "badges") {
    text = badges();
    sectionContent["badges"] = text;
  } else if (componentId === "colorReference") {
    text = colorReference();
    sectionContent["colorReference"] = text;
  } else if (componentId === "contributing") {
    text = contributing();
    sectionContent["contributing"] = text;
  } else if (componentId === "demo") {
    text = demo();
    sectionContent["demo"] = text;
  } else if (componentId === "deployment") {
    text = deployment();
    sectionContent["deployment"] = text;
  } else if (componentId === "documentation") {
    text = documentation();
    sectionContent["documentation"] = text;
  } else if (componentId === "envVariables") {
    text = envVariables();
    sectionContent["envVariables"] = text;
  } else if (componentId === "faq") {
    textToAdd = faq();
    sectionContent["faq"] = text;
  } else if (componentId === "features") {
    text = features();
    sectionContent["features"] = text;
  } else if (componentId === "feedback") {
    text = feedback();
    sectionContent["feedback"] = text;
  } else if (componentId === "license") {
    text = license();
    sectionContent["license"] = text;
  } else if (componentId === "logo") {
    text = logo();
    sectionContent["logo"] = text;
  } else if (componentId === "screenshots") {
    text = screenshots();
    sectionContent["screenshots"] = text;
  } else if (componentId === "technology") {
    text = technology();
    sectionContent["technology"] = text;
  } else if (componentId === "usageOrExample") {
    text = usageOrExample();
    sectionContent["usageOrExample"] = text;
  } else {
    text = authors();
    sectionContent["authors"] = text;
  }

  saveStateToLocalStorage();
  loadStateFromLocalStorage();
  updatePreview();
}

function remove(componentId) {
  const component = document.getElementById(componentId);
  if (!component) return;

  addedComponents = addedComponents.filter((id) => id !== componentId);

  delete sectionContent[componentId];

  const newComponentBlock = document.getElementById("new-component-block");
  newComponentBlock.appendChild(component);

  if (currentSectionId === componentId) {
    currentSectionId = null;
    if (editor) {
      editor.setValue("");
    }
  }

  updatePreview();
  saveStateToLocalStorage();

  component.removeEventListener("click", componentClickHandler);
}

function download() {
  let rawText = getRaw();
  let filename = "README.md";

  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8, " + encodeURIComponent(rawText)
  );
  element.setAttribute("download", filename);
  document.body.appendChild(element);
  element.click();

  document.body.removeChild(element);
}
