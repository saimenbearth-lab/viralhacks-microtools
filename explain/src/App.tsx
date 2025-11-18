import { useState, useEffect } from 'react'
import './styles/global.css'

interface ExplanationResult {
  preview: string
  sessionId?: string
  fullExplanation?: string
}

function App() {
  const [activeTab, setActiveTab] = useState<'text' | 'pdf' | 'url'>('text')
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ExplanationResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    document.title = 'ExplainThis AI – Simplify Text & PDFs Instantly (Free Preview)'
    
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
      const response = await fetch('/.netlify/functions/getFullExplanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to retrieve full explanation')
      
      const data = await response.json()
      setResult(prev => ({ ...prev!, fullExplanation: data.fullExplanation }))
      setIsPaid(true)
      
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load explanation')
    } finally {
      setLoading(false)
    }
  }

  const handleExplain = async () => {
    if (activeTab === 'text' && !text.trim()) {
      setError('Please paste some text to explain')
      return
    }
    
    if (activeTab === 'pdf' && !file) {
      setError('Please upload a PDF file')
      return
    }
    
    if (activeTab === 'url' && !url.trim()) {
      setError('Please enter a URL')
      return
    }
    
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const formData = new FormData()
      formData.append('type', activeTab)
      
      if (activeTab === 'text') {
        formData.append('text', text)
      } else if (activeTab === 'pdf' && file) {
        formData.append('file', file)
      } else if (activeTab === 'url') {
        formData.append('url', url)
      }
      
      const response = await fetch('/.netlify/functions/explainContent', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Explanation failed')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during explanation')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    if (!result?.sessionId) {
      setError('Session expired. Please try explaining again.')
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

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>ExplainThis AI</h1>
        <p className="subtitle">
          Paste any text, upload a PDF or drop a link – get a simple explanation in plain language.
        </p>
        <ul className="benefits">
          <li>Perfect for complex documents</li>
          <li>Short, clear summaries</li>
          <li>Bullet-point key takeaways</li>
        </ul>
      </div>

      {/* Input Section */}
      <div className="card input-section">
        <h2>What do you want explained?</h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Paste Text
          </button>
          <button 
            className={`tab ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            Upload PDF
          </button>
          <button 
            className={`tab ${activeTab === 'url' ? 'active' : ''}`}
            onClick={() => setActiveTab('url')}
          >
            URL
          </button>
        </div>

        {activeTab === 'text' && (
          <div className="form-group">
            <label htmlFor="text">Text to Explain</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste any complex text, article, legal document, technical paper, etc."
            />
          </div>
        )}

        {activeTab === 'pdf' && (
          <div className="form-group">
            <label htmlFor="file">PDF File</label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <p className="helper-text">Maximum file size: 10 MB</p>
          </div>
        )}

        {activeTab === 'url' && (
          <div className="form-group">
            <label htmlFor="url">URL to Explain</label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/article"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid var(--border-color)', 
                borderRadius: '0.5rem',
                fontSize: '1rem'
              }}
            />
            <p className="helper-text">Enter the URL of an article, blog post, or webpage</p>
          </div>
        )}

        <button 
          className="btn btn-primary"
          onClick={handleExplain}
          disabled={loading}
        >
          {loading ? 'Explaining...' : 'Explain this'}
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
          <p>Analyzing and explaining with AI...</p>
        </div>
      )}

      {/* Preview Section */}
      {result && !isPaid && (
        <div className="card preview-section">
          <h2>Free Preview</h2>
          <div className="preview-content">
            <div dangerouslySetInnerHTML={{ __html: result.preview }} />
          </div>
        </div>
      )}

      {/* Paywall Section */}
      {result && !isPaid && (
        <div className="paywall-section">
          <div className="paywall-box">
            <h3>Unlock Full Explanation</h3>
            <ul>
              <li>Full plain-language explanation</li>
              <li>Bullet-point breakdown</li>
              <li>Downloadable summary</li>
            </ul>
            <div className="price">$2.90</div>
            <button 
              className="btn"
              onClick={handleUnlock}
              disabled={loading}
            >
              Unlock full explanation – $2.90
            </button>
          </div>
        </div>
      )}

      {/* Full Result Section */}
      {isPaid && result?.fullExplanation && (
        <div className="card result-section">
          <h2>Full Explanation</h2>
          <div className="result-content">
            <div dangerouslySetInnerHTML={{ __html: result.fullExplanation }} />
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
