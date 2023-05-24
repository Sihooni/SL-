document.getElementById('memoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    const memoInput = document.getElementById('memoInput').value;
  
    // Make a request to the serverless function to store the memo
    fetch('/storeMemo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memo: memoInput })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Memo stored:', data);
        alert('Memo stored successfully!');
        document.getElementById('memoInput').value = ''; // Clear the input field
      })
      .catch(error => {
        console.error('Error storing memo:', error);
        alert('An error occurred while storing the memo. Please try again.');
      });
  });