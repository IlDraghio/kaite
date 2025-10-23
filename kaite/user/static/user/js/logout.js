document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('/api/logout/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': CSRF_TOKEN,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(data => {
            if(data.success) {
                showPopup(`User logged out!\nRedirecting to the home page...`);
                setTimeout(() => {
                window.location.href = '/';
                }, 2000);
            } else {
                let errors = "";
                for (const key in data) errors += `${key}: ${data[key]}\n`;
                showPopup(errors);}
                }).catch(err => console.log(err));
    });