document.addEventListener("DOMContentLoaded", function () {
    // Footer
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;
})