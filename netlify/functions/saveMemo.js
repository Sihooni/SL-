// netlify/functions/saveMemo.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { memo } = JSON.parse(event.body);

  try {
    fs.writeFileSync(path.resolve(__dirname, '..', 'memo.txt'), memo);
    return { statusCode: 200, body: 'Memo saved' };
  } catch (error) {
    return { statusCode: 500, body: 'Error saving memo' };
  }
};