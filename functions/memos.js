// memos.js

const fs = require('fs');
const path = require('path');

const memosFilePath = path.join(__dirname, 'memos.json');

let memos = [];

// Load existing memos from file
try {
  const memosData = fs.readFileSync(memosFilePath, 'utf-8');
  memos = JSON.parse(memosData);
} catch (error) {
  console.log('Error reading memos file:', error);
}

const saveMemosToFile = () => {
  fs.writeFileSync(memosFilePath, JSON.stringify(memos), 'utf-8');
};

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { memo } = JSON.parse(event.body);
    memos.push(memo);
    saveMemosToFile();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Memo stored successfully' })
    };
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify({ memos })
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not found' })
  };
};