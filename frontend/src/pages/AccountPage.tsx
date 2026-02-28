import { useState } from 'react';
import { createNode, getNode, createRelationship } from '@/api/client';

export default function AccountPage() {
  const [username, setUsername] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [lookup, setLookup] = useState('');
  const [account, setAccount] = useState<{ username: string; following: string[]; followers: string[] } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await createNode(username.trim());
      setMessage('Created.');
      setUsername('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed');
    }
  };

  const handleCreateRelation = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await createRelationship(start.trim(), end.trim());
      setMessage('Relationship created.');
      setStart('');
      setEnd('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed');
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setAccount(null);
    try {
      const res = await getNode(lookup.trim());
      setAccount(res);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Not found');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '32rem' }}>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Create account</h2>
        <form onSubmit={handleCreateNode}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <button type="submit">Create</button>
        </form>
      </section>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Create follow</h2>
        <form onSubmit={handleCreateRelation}>
          <input
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="From username"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <span style={{ marginRight: '0.5rem' }}>→</span>
          <input
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="To username"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <button type="submit">Follow</button>
        </form>
      </section>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Lookup account</h2>
        <form onSubmit={handleLookup}>
          <input
            value={lookup}
            onChange={(e) => setLookup(e.target.value)}
            placeholder="Username"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <button type="submit">Lookup</button>
        </form>
        {account && (
          <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', overflow: 'auto' }}>
            {JSON.stringify(account, null, 2)}
          </pre>
        )}
      </section>
      {message && <p style={{ color: message.startsWith('Created') || message.startsWith('Relationship') ? 'green' : 'crimson' }}>{message}</p>}
    </div>
  );
}
