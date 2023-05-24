// Make a request to the serverless function to retrieve the stored memos
fetch('/getMemos')
  .then(response => response.json())
  .then(data => {
    const memoList = document.getElementById('memoList');

    if (data.length === 0) {
      memoList.innerHTML = '<p>No memos found.</p>';
    } else {
      data.forEach(memo => {
        const memoItem = document.createElement('p');
        memoItem.textContent = memo.memo;
        memoList.appendChild(memoItem);
      });
    }
  })
  .catch(error => {
    console.error('Error retrieving memos:', error);
    alert('An error occurred while retrieving the memos. Please try again.');
  });