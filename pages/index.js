import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react'

export default function Home() {
  const [memo, setMemo] = useState('');
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    try {
      const response = await fetch('/.netlify/functions/getMemos');
      const data = await response.json();
      setMemos(data);
    } catch (error) {
      console.error('Error fetching memos:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch('/.netlify/functions/saveMemo', {
      method: 'POST',
      body: JSON.stringify({ memo }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setMemo('');
    fetchMemos(); // Fetch updated memos after saving
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to my app!</h1>
        <form onSubmit={handleSubmit}>
          <textarea value={memo} onChange={(e) => setMemo(e.target.value)} />
          <button type="submit">Submit</button>
        </form>

        <h2>Memos:</h2>
        <ul>
          {memos.map((memo, index) => (
            <li key={index}>{memo}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}