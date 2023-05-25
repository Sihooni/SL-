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