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
      setMessage('계정이 생성되었습니다.');
      setUsername('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : '실패했습니다.');
    }
  };

  const handleCreateRelation = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      await createRelationship(start.trim(), end.trim());
      setMessage('팔로우 관계가 생성되었습니다.');
      setStart('');
      setEnd('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : '실패했습니다.');
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
      setMessage(err instanceof Error ? err.message : '찾을 수 없습니다.');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '32rem' }}>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>계정 생성</h2>
        <form onSubmit={handleCreateNode}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자명"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <button type="submit">생성</button>
        </form>
      </section>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>팔로우 생성</h2>
        <form onSubmit={handleCreateRelation}>
          <input
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="팔로우 하는 사용자명"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <span style={{ marginRight: '0.5rem' }}>→</span>
          <input
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="팔로우 대상 사용자명"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <button type="submit">팔로우</button>
        </form>
      </section>
      <section style={{ marginBottom: '1.5rem' }}>
        <h2>계정 조회</h2>
        <form onSubmit={handleLookup}>
          <input
            value={lookup}
            onChange={(e) => setLookup(e.target.value)}
            placeholder="사용자명"
            required
            style={{ marginRight: '0.5rem', padding: '0.25rem' }}
          />
          <button type="submit">조회</button>
        </form>
        {account && (
          <pre style={{ marginTop: '0.5rem', padding: '0.5rem', background: '#f5f5f5', overflow: 'auto' }}>
            {JSON.stringify(account, null, 2)}
          </pre>
        )}
      </section>
      {message && <p style={{ color: message.startsWith('계정이') || message.startsWith('팔로우') ? 'green' : 'crimson' }}>{message}</p>}
    </div>
  );
}
