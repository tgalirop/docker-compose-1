import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function App() {
  const [counts, setCounts] = useState({ A: 0, B: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCounts = () => {
    fetch(`${API}/api/counts`)
      .then(r => { if (!r.ok) throw new Error('Failed to fetch counts'); return r.json() })
      .then(data => setCounts({ A: data.A || 0, B: data.B || 0 }))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchCounts() }, [])

  const sendClick = (button) => {
    fetch(`${API}/api/clicks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ button })
    })
      .then(r => { if (!r.ok) throw new Error('Failed to send click'); return r.json() })
      .then(() => fetchCounts())
      .catch(err => setError(err.message))
  }

  const clearClicks = () => {
    fetch(`${API}/api/clicks/clear`, { method: 'DELETE' })
      .then(r => { if (!r.ok) throw new Error('Failed to clear clicks'); return r.json() })
      .then(() => fetchCounts())
      .catch(err => setError(err.message))
  }

  return (
    <div style={{fontFamily:'system-ui', padding: 24, maxWidth: 560, margin: '0 auto'}}>
      <h1>☕ Click Tracker</h1>
      <p><small>API: {API}</small></p>
      {loading && <p>Loading…</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}

      <div style={{display:'flex', gap: 12, marginTop: 12}}>
        <button onClick={() => sendClick('A')} style={{padding:'12px 20px', fontSize: 18}}>Button A</button>
        <button onClick={() => sendClick('B')} style={{padding:'12px 20px', fontSize: 18}}>Button B</button>
      </div>

      <div style={{marginTop: 20, fontSize: 18}}>
        <div><strong>A:</strong> {counts.A}</div>
        <div><strong>B:</strong> {counts.B}</div>
      </div>

      <div style={{marginTop: 20}}>
        <button
          onClick={clearClicks}
          style={{padding:'10px 16px', fontSize: 16, backgroundColor:'#f66', color:'#fff', border:'none', borderRadius:4}}
        >
          Clear All Clicks
        </button>
      </div>
    </div>
  )
}
