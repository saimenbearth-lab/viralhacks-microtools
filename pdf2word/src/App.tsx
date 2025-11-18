import { useState, useEffect } from 'react'
import './styles/global.css'

interface ConversionResult {
  preview: string
  sessionId?: string
}

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    document.title = 'PDF to Word Converter – Instant DOCX Export (Free Preview)'
    
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
      const response = await fetch('/.netlify/functions/getFullDocument', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to retrieve document')
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      // Trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = 'converted-document.docx'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setIsPaid(true)
      
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download document')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError('')
      setResult(null)
      setIsPaid(false)
    }
  }

  const handleConvert = async () => {
    if (!file) {
      setError('Please upload a PDF file')
      return
    }
    
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/.netlify/functions/convertPDF', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Conversion failed')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during conversion')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    if (!result?.sessionId) {
      setError('Session expired. Please convert the PDF again.')
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
        <h1>PDF to Word Ultra Converter</h1>
        <p className="subtitle">
          Convert any PDF into an editable Word document in seconds.
        </p>
        <ul className="benefits">
          <li>Keep paragraphs and headings</li>
          <li>No software install needed</li>
          <li>Perfect for contracts, forms and reports</li>
        </ul>
      </div>

      {/* Input Section */}
      <div className="card input-section">
        <h2>Upload PDF</h2>
        
        <div className="form-group">
          <label htmlFor="file">PDF File</label>
          <input
            id="file"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <p className="helper-text">Maximum file size: 10 MB</p>
        </div>

        {file && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-gray)', borderRadius: '0.5rem' }}>
            <p><strong>Selected file:</strong> {file.name}</p>
            <p><strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}

        <button 
          className="btn btn-primary"
          onClick={handleConvert}
          disabled={loading || !file}
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Converting...' : 'Upload PDF'}
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
          <p>Converting your PDF to Word...</p>
        </div>
      )}

      {/* Preview Section */}
      {result && !isPaid && (
        <div className="card preview-section">
          <h2>Free Preview</h2>
          <div className="preview-content">
            <div dangerouslySetInnerHTML={{ __html: result.preview }} />
            <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              This is a preview of the first page. Unlock the full DOCX document below.
            </p>
          </div>
        </div>
      )}

      {/* Paywall Section */}
      {result && !isPaid && (
        <div className="paywall-section">
          <div className="paywall-box">
            <h3>Unlock Full Word Document</h3>
            <ul>
              <li>Complete DOCX export</li>
              <li>Editable in Word, Google Docs, etc.</li>
              <li>No watermark</li>
            </ul>
            <div className="price">$2.90</div>
            <button 
              className="btn"
              onClick={handleUnlock}
              disabled={loading}
            >
              Unlock DOCX download – $2.90
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {isPaid && (
        <div className="card">
          <div className="success">
            <h3 style={{ marginBottom: '0.5rem' }}>Download Complete!</h3>
            <p>Your Word document has been downloaded. You can now edit it in Microsoft Word, Google Docs, or any compatible word processor.</p>
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
