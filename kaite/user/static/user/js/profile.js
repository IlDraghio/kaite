document.addEventListener("DOMContentLoaded", async () => {
    const list = document.getElementById("friends-list");
    const allList = document.getElementById("all-friends-list");
    const showAllBtn = document.getElementById("show-all-friends-btn");
    const popup = document.getElementById("friends-popup");
    const closePopup = document.getElementById("close-popup");

    try {
        const response = await fetch("/api/friends-list/");
        if (!response.ok) throw new Error("Failed to fetch friends");

        const friends = await response.json();
        if (friends.length === 0) {
                list.innerHTML = "<li>No friends to show ):</li>";
        } else {
            friends.slice(0, 5).forEach(friend => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="/users/${friend.username}/">
                        <img src="${friend.image_url}" alt="${friend.username}">
                        <span>${friend.username}</span>
                    </a>
                `;
                list.appendChild(li);
            });
        }

        allList.innerHTML = "";
        if (friends.length === 0) {
            allList.innerHTML = "<li>No friends to show.</li>";
        } else {
            friends.forEach(friend => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <a href="/users/${friend.username}/">
                        <img src="${friend.image_url}" alt="${friend.username}">
                        <span>${friend.username}</span>
                    </a>
                `;
                allList.appendChild(li);
            });
        }

    } catch (err) {
        console.error("Error loading friends:", err);
        list.innerHTML = "<li>Failed to load friends.</li>";
        showAllBtn.style.display = "none";
    }

    showAllBtn.addEventListener("click", () => {
    popup.style.display = "flex";
    });

    closePopup.addEventListener("click", () => {
        popup.style.display = "none";
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) popup.style.display = "none";
    });

});
