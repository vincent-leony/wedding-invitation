function copyToClipboard() {
    var iban = document.getElementById("iban").innerText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern browser
        navigator.clipboard.writeText(iban)
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch(err => {
                console.error("Clipboard API failed, using fallback:", err);
                fallbackCopyToClipboard(iban);
            });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(iban);
    }
}

function fallbackCopyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    // Prevent scrolling to bottom
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const success = document.execCommand("copy");
        if (success) {
            alert("Copied to clipboard!");
        } else {
            alert("Failed to copy.");
        }
    } catch (err) {
        console.error("Fallback copy failed:", err);
        alert("Browser not supported.");
    }

    document.body.removeChild(textarea);
}
