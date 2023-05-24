const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { memo } = JSON.parse(event.body);

  try {
    await client.query(
      q.Create(q.Collection('memos'), {
        data: { memo },
      })
    );
    return { statusCode: 200, body: 'Memo saved' };
  } catch (error) {
    return { statusCode: 500, body: 'Error saving memo' };
  }
};