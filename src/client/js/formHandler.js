function handleSubmit(event) {
    event.preventDefault();

    const url = document.getElementById('name').value;

    fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log('API response:', data);
            updateUI(data);
        })
        .catch((error) => console.error('Error:', error));

}

// Function to update the UI
function updateUI(data) {
    document.getElementById('result').innerHTML = `
        <p>Sentiment Polarity: ${data.polarity}</p>
        <p>Subjectivity: ${data.subjectivity}</p>
        <p>Analyzed Text: ${data.text}</p>
    `;
}

document.getElementById('submitButton').addEventListener('click', handleSubmit);

export { handleSubmit };
