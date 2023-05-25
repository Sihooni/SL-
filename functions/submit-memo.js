const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: 'fnAFEuSNDNAAUQrblZXy_EL1tBzZITohjySb5ouA' });
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = new URLSearchParams(event.body);
  const data = {
    memo: params.get('memo'),
  };

  try {
    const documentRecord = await faunaClient.query(
      q.Create(q.Collection('memos'), { data: data })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(documentRecord),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to submit memo' }),
    };
  }
};