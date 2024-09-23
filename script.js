document.getElementById('askButton').addEventListener('click', async () => {
    const question = document.getElementById('question').value;
    const responseDiv = document.getElementById('response');

    responseDiv.innerHTML = "Thinking...";

    const res = await fetch('/api/answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

    const data = await res.json();
    responseDiv.innerHTML = data.answer || "Not available";
});

