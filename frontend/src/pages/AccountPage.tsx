import { useState } from 'react'
import { createNode, getNode, createRelationship } from '../api/client'
import type { AccountResponse } from '../types/api'

export default function AccountPage() {
  const [createUsername, setCreateUsername] = useState('')
  const [lookupUsername, setLookupUsername] = useState('')
  const [lookupResult, setLookupResult] = useState<AccountResponse | null>(null)
  const [followFrom, setFollowFrom] = useState('')
  const [followTo, setFollowTo] = useState('')
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const showMessage = (type: 'ok' | 'err', text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 4000)
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = createUsername.trim()
    if (!username) return
    try {
      await createNode({ username })
      showMessage('ok', `Account "${username}" created.`)
      setCreateUsername('')
    } catch (err) {
      showMessage('err', err instanceof Error ? err.message : 'Create failed.')
    }
  }

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault()
    const username = lookupUsername.trim()
    if (!username) return
    try {
      const res = await getNode(username)
      setLookupResult(res)
    } catch (err) {
      setLookupResult(null)
      showMessage('err', err instanceof Error ? err.message : 'Lookup failed.')
    }
  }

  const handleFollow = async (e: React.FormEvent) => {
    e.preventDefault()
    const start = followFrom.trim()
    const end = followTo.trim()
    if (!start || !end) return
    try {
      await createRelationship({ start, end })
      showMessage('ok', `Follow: ${start} → ${end}`)
      setFollowFrom('')
      setFollowTo('')
    } catch (err) {
      showMessage('err', err instanceof Error ? err.message : 'Follow failed.')
    }
  }

  return (
    <div>
      <h1>Account</h1>

      {message && (
        <p
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 6,
            background: message.type === 'ok' ? '#e8f5e9' : '#ffebee',
            color: message.type === 'ok' ? '#2e7d32' : '#c62828',
          }}
        >
          {message.text}
        </p>
      )}

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Create account</h2>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Username"
            value={createUsername}
            onChange={(e) => setCreateUsername(e.target.value)}
            style={{ padding: '0.5rem', width: 200 }}
          />
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Lookup account</h2>
        <form onSubmit={handleLookup} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Username"
            value={lookupUsername}
            onChange={(e) => setLookupUsername(e.target.value)}
            style={{ padding: '0.5rem', width: 200 }}
          />
          <button type="submit">Lookup</button>
        </form>
        {lookupResult && (
          <pre
            style={{
              marginTop: '0.5rem',
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: 6,
              overflow: 'auto',
            }}
          >
            {JSON.stringify(lookupResult, null, 2)}
          </pre>
        )}
      </section>

      <section style={{ marginTop: '1.5rem' }}>
        <h2>Create follow</h2>
        <form onSubmit={handleFollow} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="From (follower)"
            value={followFrom}
            onChange={(e) => setFollowFrom(e.target.value)}
            style={{ padding: '0.5rem', width: 160 }}
          />
          <span>→</span>
          <input
            type="text"
            placeholder="To (followed)"
            value={followTo}
            onChange={(e) => setFollowTo(e.target.value)}
            style={{ padding: '0.5rem', width: 160 }}
          />
          <button type="submit">Follow</button>
        </form>
      </section>
    </div>
  )
}
