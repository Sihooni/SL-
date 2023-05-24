// functions/submit-memo.js
const faunadb = require('faunadb')

const faunaClient = new faunadb.Client({ secret: process.env.FAUNADB_SECRET_KEY })
const q = faunadb.query

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body)
  const memo = data.memo
  const result = await faunaClient.query(
    q.Create(
      q.Collection('memos'),
      { data: { memo } },
    )
  )
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

// functions/fetch-memos.js
const faunadb = require('faunadb')


exports.handler = async (event, context) => {
  const result = await faunaClient.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('memos'))),
      q.Lambda('X', q.Get('X'))
    )
  )
  return {
    statusCode: 200,
    body: JSON.stringify(result.data),
  }
}