import { useState } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [memo, setMemo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here we will call our serverless function
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
          <input 
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Write your memo here..."
          />
          <button type="submit">Submit</button>
        </form>

      </main>

      <Footer />
    </div>
  )
}
// ...

const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('/.netlify/functions/saveMemo', {
    method: 'POST',
    body: JSON.stringify({ memo }),
  });

  // Handle response here
};

// ...