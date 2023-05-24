import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState, useEffect } from 'react'

export default function Home() {
  const [memo, setMemo] = useState('')
  const [memos, setMemos] = useState([])

  useEffect(() => {
    fetch('/.netlify/functions/fetch-memos')
      .then(response => response.json())
      .then(data => {
        setMemos(data)
      })
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await fetch('/.netlify/functions/submit-memo', {
      method: 'POST',
      body: JSON.stringify({ memo }),
    })
    const data = await response.json()
    setMemos([...memos, data])
    setMemo('')
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" value={memo} onChange={e => setMemo(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
        {memos.map((memo, index) => (
          <p key={index}>{memo.data.memo}</p>
        ))}
      </main>

      <Footer />
    </div>
  )
}