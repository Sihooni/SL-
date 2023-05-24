// storeMemo.js
const faunadb = require('faunadb');
const { Create, Collection } = faunadb.query;

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({ secret: 'fnAFEuSNDNAAUQrblZXy_EL1tBzZITohjySb5ouA' }); // Replace with your FaunaDB secret key
    const data = JSON.parse(event.body);

    // Store the memo in FaunaDB
    const response = await client.query(
      Create(Collection('memos'), { data: { memo: data.memo } })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Memo stored successfully!' })
    };
  } catch (error) {
    console.error('Error storing memo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while storing the memo' })
    };
  }
};