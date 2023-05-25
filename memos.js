fetch('/.netlify/functions/get-memos')
  .then(response => response.json())
  .then(data => {
    const memosDiv = document.getElementById('memos');

    data.data.forEach(memo => {
      const memoElement = document.createElement('p');
      memoElement.textContent = `${memo.data.name}: ${memo.data.memo}`;
      memosDiv.appendChild(memoElement);
    });
  });