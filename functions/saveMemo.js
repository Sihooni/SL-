// functions/saveMemo.js
const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

exports.handler = async (event) => {
  const { memo } = JSON.parse(event.body);

  try {
    const result = await client.query(
      q.Create(
        q.Collection('memos'),
        { data: { memo } },
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() }),
    };
  }
};