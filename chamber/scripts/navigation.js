document.addEventListener("DOMContentLoaded", function () {

    // Nav bar
    const navBar = document.querySelector('#nav-bar');
    const navButton = document.querySelector('#ham-btn');
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navBar.classList.toggle('show');
    });

    // Nav Wayfinding
    const pageTitle = document.querySelector("header span").textContent.trim();
    const menuItems = document.querySelectorAll(".navigation a");

    menuItems.forEach(link => {
        if (link.textContent.trim() === pageTitle) {
            link.classList.add("active");
        }
    });
})