// memos.js

const memos = [];

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { memo } = JSON.parse(event.body);
    memos.push(memo);
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Memo stored successfully' })
    };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(memos)
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not found' })
  };
};