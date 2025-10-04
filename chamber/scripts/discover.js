document.addEventListener("DOMContentLoaded", () => {
    fetch("data/places.json")
        .then(response => response.json())
        .then(data => displayPlaces(data))
        .catch(error => console.error("Error loading JSON:", error));

    function displayPlaces(places) {
        const div = document.getElementById("discover-div");
        const list = document.createElement("ul");

        places.forEach(place => {
            const li = document.createElement("li");
            li.classList.add("place-card");

            li.innerHTML = `
                <h2>${place.title}</h2>
                <figure>
                    <img src="${place.image}" alt="${place.title}" loading="lazy">
                </figure>
                <address>${place.address}</address>
                <p>${place.description}</p>
                <button class="learn-btn">Learn More</button>
            `;

            list.appendChild(li);
        });

        div.appendChild(list);
    }


    const messageDiv = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        messageDiv.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const msInDay = 1000 * 60 * 60 * 24;
        const daysSince = Math.floor((now - parseInt(lastVisit)) / msInDay);

        if (daysSince < 1) {
            messageDiv.textContent = "Back so soon! Awesome!";
        } else if (daysSince === 1) {
            messageDiv.textContent = "You last visited 1 day ago.";
        } else {
            messageDiv.textContent = `You last visited ${daysSince} days ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);
});
