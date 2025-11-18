import { useState, useEffect } from 'react'
import './styles/global.css'

interface Script {
  number: number
  hook: string
  body: string
  cta: string
  hashtags: string
}

interface GenerationResult {
  preview: Script[]
  sessionId?: string
  fullScripts?: Script[]
}

function App() {
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Funny')
  const [platform, setPlatform] = useState('TikTok')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<GenerationResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    document.title = 'AI TikTok Script Generator – Viral Scripts (Free Preview)'
    
    // Check if returning from Stripe checkout
    const urlParams = new URLSearchParams(window.location.search)
    const sessionId = urlParams.get('session_id')
    
    if (sessionId) {
      handlePaymentSuccess(sessionId)
    }
  }, [])

  const handlePaymentSuccess = async (sessionId: string) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/.netlify/functions/getFullScripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to retrieve full scripts')
      
      const data = await response.json()
      setResult(prev => ({ ...prev!, fullScripts: data.fullScripts }))
      setIsPaid(true)
      
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load scripts')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or niche')
      return
    }
    
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const response = await fetch('/.netlify/functions/generateScripts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, tone, platform })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation failed')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during generation')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    if (!result?.sessionId) {
      setError('Session expired. Please generate scripts again.')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/.netlify/functions/createCheckoutSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: result.sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to create checkout session')
      
      const data = await response.json()
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate payment')
      setLoading(false)
    }
  }

  const renderScript = (script: Script) => (
    <div key={script.number} style={{ 
      background: 'var(--bg-gray)', 
      padding: '1.5rem', 
      borderRadius: '0.5rem',
      marginBottom: '1rem'
    }}>
      <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
        Script #{script.number}
      </h4>
      <div style={{ marginBottom: '0.75rem' }}>
        <strong>Hook:</strong> {script.hook}
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <strong>Body:</strong>
        <div style={{ whiteSpace: 'pre-wrap', marginTop: '0.25rem' }}>{script.body}</div>
      </div>
      <div style={{ marginBottom: '0.75rem' }}>
        <strong>CTA:</strong> {script.cta}
      </div>
      <div>
        <strong>Hashtags:</strong> {script.hashtags}
      </div>
    </div>
  )

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>AI Social Script Generator</h1>
        <p className="subtitle">
          Get viral-ready TikTok/Reels scripts in seconds – hooks, lines and CTAs included.
        </p>
        <ul className="benefits">
          <li>10 scripts per topic</li>
          <li>Hooks, CTAs and hashtag packs</li>
          <li>Gen Z style, short-form optimized</li>
        </ul>
      </div>

      {/* Input Section */}
      <div className="card input-section">
        <h2>Generate Scripts</h2>
        
        <div className="form-group">
          <label htmlFor="topic">Your Niche or Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., fitness tips, cooking hacks, productivity..."
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid var(--border-color)', 
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tone">Tone</label>
          <select 
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="Funny">Funny</option>
            <option value="Emotional">Emotional</option>
            <option value="Informative">Informative</option>
            <option value="Storytelling">Storytelling</option>
            <option value="Street / Gen Z">Street / Gen Z</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="platform">Target Platform</label>
          <select 
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="TikTok">TikTok</option>
            <option value="Reels">Instagram Reels</option>
            <option value="Shorts">YouTube Shorts</option>
          </select>
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate scripts'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && !error && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Generating viral scripts with AI...</p>
        </div>
      )}

      {/* Preview Section */}
      {result && !isPaid && (
        <div className="card preview-section">
          <h2>Free Preview (2 Scripts)</h2>
          <div style={{ marginTop: '1rem' }}>
            {result.preview.map(renderScript)}
          </div>
        </div>
      )}

      {/* Paywall Section */}
      {result && !isPaid && (
        <div className="paywall-section">
          <div className="paywall-box">
            <h3>Unlock Full Script Pack</h3>
            <ul>
              <li>10 complete short-form scripts</li>
              <li>Hooks, CTAs and hashtag packs</li>
              <li>Copy & paste into your next video</li>
            </ul>
            <div className="price">$3.90</div>
            <button 
              className="btn"
              onClick={handleUnlock}
              disabled={loading}
            >
              Unlock all scripts – $3.90
            </button>
          </div>
        </div>
      )}

      {/* Full Result Section */}
      {isPaid && result?.fullScripts && (
        <div className="card result-section">
          <h2>Full Script Pack (10 Scripts)</h2>
          <div style={{ marginTop: '1rem' }}>
            {result.fullScripts.map(renderScript)}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <p className="disclaimer">
          AI assistance only. This tool does not provide legal, financial, or medical advice and cannot replace consultation with a qualified professional. Your data is processed temporarily and is not stored.
        </p>
        <div className="links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </div>
  )
}

export default App
