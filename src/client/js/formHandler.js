

function handleSubmit(event) {
    event.preventDefault();

    const url = document.getElementById('url').value;

    fetch('http://localhost:3000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('API response:', data);
            document.getElementById('result').innerText = `Sentiment: ${data.polarity}`;
        })
        .catch((error) => console.error('Error:', error));
}
document.getElementById('submit').addEventListener('click', handleSubmit);
// Export the handleSubmit function
export { handleSubmit };

