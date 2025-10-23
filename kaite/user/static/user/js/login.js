const form = document.getElementById("login-form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const csrfToken = document.querySelector('#login-form input[name="csrfmiddlewaretoken"]').value;
    
    const response = await fetch(loginAPIUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({username, password})
    });

    const data = await response.json();

    if (response.ok) {
        try {
        showPopup(`User ${username} login successfully!\nRedirecting to the home page...`);
        form.reset();
        setTimeout(() => {
        window.location.href = homeUrl;
        }, 3010);
        } catch (err) {
        console.error("Error inside success block:", err);
    }
    } else {
        let errors = "";
        for (const key in data) errors += `${key}: ${data[key]}\n`;
        showPopup(errors);
    }
});