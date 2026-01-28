import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://testazapi-hja8fkbdaheue9d0.canadacentral-01.azurewebsites.net/api/users')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setApiData(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Errore nel fetch dei dati:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React__llll3</h1>
      
      {/* Sezione API Data */}
      <div className="api-section" style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Dati dall'API Users</h2>
        {loading && <p>Caricamento in corso...</p>}
        {error && <p style={{ color: 'red' }}>Errore: {error}</p>}
        {apiData && (
          <div style={{ textAlign: 'left', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
