// script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('analysisForm');
    const resultsContainer = document.getElementById('analysisResults');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const websiteUrl = document.getElementById('websiteUrl').value;

        fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ websiteUrl })
        })
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
