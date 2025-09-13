document.addEventListener("DOMContentLoaded", () => {
    const directoryDiv = document.getElementById("directory-div");
    const buttons = document.querySelectorAll(".directory-sec ul button");

    const membershipLevels = {
        "1": "Bronze",
        "2": "Silver",
        "3": "Gold"
    };

    async function loadMembers() {
        try {
            const response = await fetch("data/members.json");
            const data = await response.json();
            displayMembers(data.members, "list");
        } catch (error) {
            console.error("Error loading members:", error);
        }
    }


    function displayMembers(members, view) {
        directoryDiv.innerHTML = "";
        directoryDiv.className = view;

        members.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("member-card");


            const levelText = membershipLevels[member["member-level"]] || "Unknown";

            card.innerHTML = `
        <img src="images/${member["icon-file"]}" alt="${member.name} logo">
        <h2>${member.name}</h2>
        <p>${member.adress}</p>
        <p>📞 ${member.tel}</p>
        <p><strong>Membership Level:</strong> ${levelText}</p>
        <a href="${member.urls}" target="_blank">Visit Website</a>
      `;

            directoryDiv.appendChild(card);
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filter = button.dataset.filter;

            fetch("data/members.json")
                .then(res => res.json())
                .then(data => displayMembers(data.members, filter));
        });
    });

    loadMembers();
});