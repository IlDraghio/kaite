const form = document.getElementById("registration-form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const csrfToken = document.querySelector('#registration-form input[name="csrfmiddlewaretoken"]').value;
    
    const response = await fetch(registrationUrl, {
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
        showPopup(`User ${data.username} registered successfully!\nRedirecting to the login page...`);
        form.reset();
        setTimeout(() => {
        window.location.href = loginUrl;
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