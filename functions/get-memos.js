const faunadb = require('faunadb');

const faunaClient = new faunadb.Client({ secret: 'fnAFEuSNDNAAUQrblZXy_EL1tBzZITohjySb5ouA' });
const q = faunadb.query;

exports.handler = async (event, context) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const memos = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection('memos'))),
        q.Lambda(x => q.Get(x))
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(memos),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch memos' }),
    };
  }
};