document.addEventListener("DOMContentLoaded", function(){
document.getElementById('markdown-content').addEventListener('input', function(){
    const markdownContent = document.getElementById('markdown-content');
    const htmlPreview = document.getElementById('preview-content');
    const htmlContent = marked.parse(markdownContent.value);
    htmlPreview.innerHTML = DOMPurify.sanitize(htmlContent, { USE_PROFILES: { html: true } });
});
});