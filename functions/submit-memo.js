// functions/submit-memo.js
const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = new URLSearchParams(event.body);
  const data = {
    name: params.get('name'),
    memo: params.get('memo'),
  };

  try {
    await faunaClient.query(
      q.Create(q.Collection('memos'), { data: data })
    );

    return {
      statusCode: 303,
      headers: {
        Location: '/memos.html',
      },
      body: '',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit memo' }),
    };
  }
};

window.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('memo-form');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const data = new URLSearchParams();
    for (const pair of new FormData(form)) {
      data.append(pair[0], pair[1]);
    }

    try {
      const response = await fetch('/.netlify/functions/submit-memo', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        messageDiv.textContent = 'Submitted';
        form.reset();
      } else {
        messageDiv.textContent = 'Submission failed';
      }
    } catch (error) {
      messageDiv.textContent = 'Submission failed';
    }
  });
});