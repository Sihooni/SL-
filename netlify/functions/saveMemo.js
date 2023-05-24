const faunadb = require('faunadb');

const client = new faunadb.Client({ secret: process.env.FAUNA_SECRET });
const q = faunadb.query;

exports.handler = async (event, context) => {
    if (event.httpMethod === 'GET') {
        try {
          const { data } = await client.query(
            q.Map(
              q.Paginate(q.Match(q.Index('all_memos'))),
              q.Lambda('X', q.Get(q.Var('X')))
            )
          );
          const memos = data.map((item) => item.data.memo);
          return {
            statusCode: 200,
            body: JSON.stringify(memos),
          };
        } catch (error) {
          return { statusCode: 500, body: 'Error retrieving memos' };
        }
      } else {
        return { statusCode: 405, body: 'Method Not Allowed' };
      }
    };