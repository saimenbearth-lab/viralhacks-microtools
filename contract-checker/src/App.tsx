import { useState, useEffect } from 'react'
import './styles/global.css'

interface AnalysisResult {
  preview: string
  fullReport?: string
  sessionId?: string
}

function App() {
  const [activeTab, setActiveTab] = useState<'pdf' | 'text'>('pdf')
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('English')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    document.title = 'AI Contract Checker – Instant Contract Risk Review (Free Preview)'
    
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
      const response = await fetch('/.netlify/functions/getFullReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to retrieve full report')
      
      const data = await response.json()
      setResult({ preview: '', fullReport: data.fullReport })
      setIsPaid(true)
      
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report')
    } finally {
      setLoading(false)
    }
  }

  const handleAnalyze = async () => {
    if (activeTab === 'pdf' && !file) {
      setError('Please upload a PDF file')
      return
    }
    
    if (activeTab === 'text' && !text.trim()) {
      setError('Please paste contract text')
      return
    }
    
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const formData = new FormData()
      
      if (activeTab === 'pdf' && file) {
        formData.append('file', file)
      } else {
        formData.append('text', text)
      }
      
      formData.append('language', language)
      
      const response = await fetch('/.netlify/functions/analyzeContract', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Analysis failed')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    if (!result?.sessionId) {
      setError('Session expired. Please analyze the contract again.')
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

  const handleDownloadPDF = async () => {
    if (!result?.fullReport) return
    
    try {
      const response = await fetch('/.netlify/functions/generatePDF', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: result.fullReport })
      })
      
      if (!response.ok) throw new Error('Failed to generate PDF')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'contract-analysis-report.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download PDF')
    }
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>AI Contract Checker</h1>
        <p className="subtitle">
          Upload any contract and get an instant AI review of risks, unclear terms and one-sided clauses.
        </p>
        <ul className="benefits">
          <li>Spot hidden risks in seconds</li>
          <li>Plain-language explanations</li>
          <li>Download a lawyer-ready summary PDF</li>
        </ul>
      </div>

      {/* Input Section */}
      <div className="card input-section">
        <h2>Upload Contract</h2>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            Upload PDF
          </button>
          <button 
            className={`tab ${activeTab === 'text' ? 'active' : ''}`}
            onClick={() => setActiveTab('text')}
          >
            Paste Text
          </button>
        </div>

        {activeTab === 'pdf' ? (
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
        ) : (
          <div className="form-group">
            <label htmlFor="text">Contract Text</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your contract text here..."
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="language">Contract Language</label>
          <select 
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="German">German</option>
          </select>
        </div>

        <button 
          className="btn btn-primary"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Upload contract'}
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
          <p>Analyzing your contract with AI...</p>
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
            <h3>Unlock Full AI Contract Report</h3>
            <ul>
              <li>Detailed clause-by-clause risk analysis</li>
              <li>Plain-language explanations for every issue</li>
              <li>Download a lawyer-ready PDF summary</li>
            </ul>
            <div className="price">$4.90</div>
            <button 
              className="btn"
              onClick={handleUnlock}
              disabled={loading}
            >
              Unlock full report – $4.90
            </button>
          </div>
        </div>
      )}

      {/* Full Result Section */}
      {isPaid && result?.fullReport && (
        <div className="card result-section">
          <h2>Full Contract Analysis Report</h2>
          <div className="result-content">
            <div dangerouslySetInnerHTML={{ __html: result.fullReport }} />
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleDownloadPDF}
            style={{ marginTop: '1.5rem' }}
          >
            Download PDF
          </button>
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
