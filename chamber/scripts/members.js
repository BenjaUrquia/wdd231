const memberCards = document.querySelector('#members-display');

const membershipLevels = {
    "1": "Bronze",
    "2": "Silver",
    "3": "Gold"
};

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        const cleanedMembers = data.members.map(member => {
            return {
                ...member,
                urls: member.urls.replace("https://www.", ""),
                adress: member.adress.replace(", Rosario, Santa Fe", "")
            };
        });

        return cleanedMembers;
    } catch (error) {
        console.error("Error loading members:", error);
    }
}


function getRandomMembers(members, count) {
    const shuffled = [...members].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displayMemberCards(members) {

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        const levelText = membershipLevels[member["member-level"]] || "Unknown";

        if (levelText === "Silver") {
            card.classList.add("silver");
        } else if (levelText === "Gold") {
            card.classList.add("gold");
        }

        card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member["icon-file"]}" alt="${member.name} logo">
        <div>
        <p><strong>ADRESS: </strong>${member.adress}</p>
        <p><strong>PHONE: </strong> ${member.tel}</p>
        <p><strong>URL: </strong><a href="${member.urls}" target="_blank">${member.urls}</a>
        <p><strong>${levelText} Member</p></strong>
        </div>
        `;

        memberCards.appendChild(card);
    });
}

async function Spotlights() {
    const members = await loadMembers();
    const bestMembers = members.filter(m => m["member-level"] === "2" || m["member-level"] === "3");

    const chosen = getRandomMembers(bestMembers, 3);

    displayMemberCards(chosen);
}

Spotlights();