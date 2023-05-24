import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'

export default function Home() {
  const [memo, setMemo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/.netlify/functions/saveMemo', {
      method: 'POST',
      body: JSON.stringify({ memo }),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    setMemo('');
  };

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
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </main>

      <Footer />
    </div>
  )
}