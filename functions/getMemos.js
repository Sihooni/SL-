// getMemos.js
const faunadb = require('faunadb');
const { Paginate, Documents, Collection, Lambda, Map, Get } = faunadb.query;

exports.handler = async (event, context) => {
  try {
    const client = new faunadb.Client({ secret: 'YOUR_FAUNADB_SECRET_KEY' }); // Replace with your FaunaDB secret key

    // Retrieve all memos from FaunaDB
    const response = await client.query(
      Map(
        Paginate(Documents(Collection('memos'))),
        Lambda(x => Get(x))
      )
    );

    const memos = response.data.map(item => item.data);

    return {
      statusCode: 200,
      body: JSON.stringify(memos)
    };
  } catch (error) {
    console.error('Error retrieving memos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred while retrieving the memos' })
    };
  }
};