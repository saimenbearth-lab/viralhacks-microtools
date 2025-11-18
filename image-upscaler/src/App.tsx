import { useState, useEffect } from 'react'
import './styles/global.css'

interface UpscaleResult {
  previewUrl: string
  sessionId?: string
  fullImageUrl?: string
}

function App() {
  const [file, setFile] = useState<File | null>(null)
  const [previewSrc, setPreviewSrc] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<UpscaleResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    document.title = 'AI Image Upscaler – HD Enhancement Online (Free Preview)'
    
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
      const response = await fetch('/.netlify/functions/getFullImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      if (!response.ok) throw new Error('Failed to retrieve full image')
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      setResult(prev => ({ ...prev!, fullImageUrl: url }))
      setIsPaid(true)
      
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image')
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
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewSrc(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpscale = async () => {
    if (!file) {
      setError('Please upload an image file')
      return
    }
    
    setLoading(true)
    setError('')
    setResult(null)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/.netlify/functions/upscaleImage', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upscaling failed')
      }
      
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      
      // Get session ID from response headers
      const sessionId = response.headers.get('X-Session-ID')
      
      setResult({
        previewUrl: url,
        sessionId: sessionId || undefined
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during upscaling')
    } finally {
      setLoading(false)
    }
  }

  const handleUnlock = async () => {
    if (!result?.sessionId) {
      setError('Session expired. Please upload and process the image again.')
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

  const handleDownload = () => {
    if (!result?.fullImageUrl) return
    
    const a = document.createElement('a')
    a.href = result.fullImageUrl
    a.download = 'upscaled-image.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <h1>AI Image Upscaler</h1>
        <p className="subtitle">
          Turn blurry images into sharp, high-resolution photos in seconds.
        </p>
        <ul className="benefits">
          <li>Instant preview</li>
          <li>High-quality upscale up to 4×</li>
          <li>Perfect for social media and print</li>
        </ul>
      </div>

      {/* Input Section */}
      <div className="card input-section">
        <h2>Upload Image</h2>
        
        <div className="form-group">
          <label htmlFor="file">Image File</label>
          <input
            id="file"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <p className="helper-text">Supported formats: JPG, PNG. Maximum file size: 10 MB</p>
        </div>

        {previewSrc && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <img 
              src={previewSrc} 
              alt="Original" 
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '0.5rem' }}
            />
          </div>
        )}

        <button 
          className="btn btn-primary"
          onClick={handleUpscale}
          disabled={loading || !file}
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Processing...' : 'Upload image'}
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
          <p>Enhancing your image with AI...</p>
        </div>
      )}

      {/* Preview Section */}
      {result && !isPaid && (
        <div className="card preview-section">
          <h2>Free Preview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Original</h3>
              <img 
                src={previewSrc} 
                alt="Original" 
                style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Enhanced Preview</h3>
              <img 
                src={result.previewUrl} 
                alt="Enhanced Preview" 
                style={{ width: '100%', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>
          <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Preview is reduced resolution. Unlock full HD version below.
          </p>
        </div>
      )}

      {/* Paywall Section */}
      {result && !isPaid && (
        <div className="paywall-section">
          <div className="paywall-box">
            <h3>Unlock Full HD Download</h3>
            <ul>
              <li>Full-resolution enhanced image</li>
              <li>No watermark</li>
              <li>Instant download</li>
            </ul>
            <div className="price">$3.90</div>
            <button 
              className="btn"
              onClick={handleUnlock}
              disabled={loading}
            >
              Unlock HD download – $3.90
            </button>
          </div>
        </div>
      )}

      {/* Full Result Section */}
      {isPaid && result?.fullImageUrl && (
        <div className="card result-section">
          <h2>Full HD Enhanced Image</h2>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <img 
              src={result.fullImageUrl} 
              alt="Full HD Enhanced" 
              style={{ maxWidth: '100%', borderRadius: '0.5rem', border: '1px solid var(--border-color)' }}
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={handleDownload}
            style={{ marginTop: '1.5rem' }}
          >
            Download HD Image
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
