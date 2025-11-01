const input = document.getElementById("search-input");
const suggestions = document.getElementById("search-suggestions");

input.addEventListener("input", async () => {
    const query = input.value.trim();
    if (!query) {
        suggestions.style.display = "none";
        suggestions.innerHTML = "";
        return;
    }

    try {
        const res = await fetch(`/api/search-users/?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        
        suggestions.innerHTML = "";
        if (data.length === 0) {
            suggestions.innerHTML = "<li>No results</li>";
        } else {
            data.results.forEach(user => {
                const li = document.createElement("li");
                li.innerHTML = `<img src="${user.profile_image}" class="search-img">${user.username}`;
                li.addEventListener("click", () => {
                    window.location.href = `/users/${user.username}/`;
                });
                suggestions.appendChild(li);
            });
        }

        suggestions.style.display = "block";
    } catch (err) {
        console.error(err);
    }
});

document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !suggestions.contains(e.target)) {
        suggestions.style.display = "none";
    }
});