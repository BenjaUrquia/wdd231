document.addEventListener("DOMContentLoaded", function () {

    const pageTitle = document.getElementById("pageTitle");

    if (pageTitle.textContent.trim() === "Join") {


        document.getElementById("timestamp").value = new Date().toISOString();


        document.querySelectorAll(".modal-btn").forEach(btn => {
            btn.addEventListener("click", e => {
                const modalId = e.target.getAttribute("data-modal");
                document.getElementById(modalId).showModal();
            });
        });

        document.querySelectorAll(".close-btn").forEach(btn => {
            btn.addEventListener("click", e => {
                e.target.closest("dialog").close();
            });
        });
    } else {

        const params = new URLSearchParams(window.location.search);
        document.getElementById("firstName").textContent = params.get("firstName") || "";
        document.getElementById("lastName").textContent = params.get("lastName") || "";
        document.getElementById("email").textContent = params.get("email") || "";
        document.getElementById("mobile").textContent = params.get("phone") || "";
        document.getElementById("organization").textContent = params.get("orgTitle") || "";
        document.getElementById("timestamp").textContent = params.get("timestamp") || "";
    }
});