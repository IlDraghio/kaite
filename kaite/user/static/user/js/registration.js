const form = document.getElementById("registration-form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
const csrfToken = document.querySelector('#registration-form input[name="csrfmiddlewaretoken"]').value;    
    
    const response = await fetch(registrationAPIUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify({username, password})
    });

    const data = await response.json();

    if (response.ok) {

        showPopup(`User ${data.username} registered successfully!\nRedirecting to the login page...`);
        form.reset();
        setTimeout(() => {
        window.location.href = loginAPIUrl;
        }, 2000);
    } else {
        let errors = "";
        for (const key in data) errors += `${key}: ${data[key]}\n`;
        showPopup(errors);
    }
});