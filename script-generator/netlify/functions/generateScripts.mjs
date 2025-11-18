import { GoogleGenerativeAI } from '@google/generative-ai'
import crypto from 'crypto'

// In-memory storage for session data
const sessions = new Map()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { topic, tone, platform } = JSON.parse(event.body)

    if (!topic || !topic.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Topic is required' })
      }
    }

    // Generate scripts using Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const systemPrompt = `You are a short-form video script expert for TikTok, Reels and YouTube Shorts. You create viral hooks, engaging storytelling, strong CTAs and modern language. You never generate hateful, explicit or illegal content.

Generate 10 complete scripts for short-form videos. Each script must have:
- Hook line (attention-grabbing first sentence)
- Short body (3-5 shots/scenes described briefly)
- CTA (call to action)
- Suggested hashtags (5-8 relevant hashtags)

Format your response as JSON with this structure:
{
  "scripts": [
    {
      "number": 1,
      "hook": "Hook line here",
      "body": "Shot 1: ...\nShot 2: ...\nShot 3: ...",
      "cta": "CTA here",
      "hashtags": "#hashtag1 #hashtag2 #hashtag3"
    }
  ]
}`

    const userPrompt = `Topic/Niche: ${topic}
Tone: ${tone}
Platform: ${platform}

Generate 10 viral-ready scripts for this topic.`

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: userPrompt }
    ])

    const responseText = result.response.text()
    
    // Extract JSON from response
    let scriptsData
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        scriptsData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to parse AI response' })
      }
    }

    if (!scriptsData.scripts || scriptsData.scripts.length < 10) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'AI did not generate enough scripts' })
      }
    }

    // Split into preview (2 scripts) and full (10 scripts)
    const preview = scriptsData.scripts.slice(0, 2)
    const fullScripts = scriptsData.scripts

    // Create session ID and store data
    const sessionId = crypto.randomUUID()
    sessions.set(sessionId, {
      fullScripts,
      timestamp: Date.now()
    })

    // Clean up old sessions (older than 1 hour)
    const oneHourAgo = Date.now() - 3600000
    for (const [id, data] of sessions.entries()) {
      if (data.timestamp < oneHourAgo) {
        sessions.delete(id)
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preview,
        sessionId
      })
    }

  } catch (error) {
    console.error('Generation error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to generate scripts',
        details: error.message 
      })
    }
  }
}

// Export sessions for other functions to access
export { sessions }
