const form = document.getElementById("registration-form");
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(registrationUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": "{{ csrf_token }}",
        },
        body: JSON.stringify({username, password})
    });

    const data = await response.json();

    if (response.ok) {
        showPopup(`User ${data.username} registered successfully!`);
        form.reset();
    } else {
        let errors = "";
        for (const key in data) errors += `${key}: ${data[key]}\n`;
        showPopup(errors);
    }
});