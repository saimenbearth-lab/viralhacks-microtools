# ExplainThis AI

Universal AI explainer that converts complex content into simple, clear explanations. Supports text, PDFs, and URLs.

## Features

- **Multiple Input Types**: Text, PDF upload, or URL
- **AI-Powered Explanations**: Uses Google Gemini for intelligent content analysis
- **Plain Language**: Converts complex content into easy-to-understand summaries
- **Freemium Model**: Preview for free, full explanation for $2.90
- **Structured Output**: Summary, main points, implications, and key takeaways
- **Stripe Integration**: Secure one-time payment processing

## Tech Stack

**Frontend**:
- React 18 with TypeScript
- Vite for fast builds
- CSS modules for styling

**Backend**:
- Netlify Functions (serverless)
- Google Gemini AI API for content explanation
- pdf-parse for PDF text extraction
- node-fetch for URL content retrieval
- Stripe for payments

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3004`

## Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Environment Variables

Create a `.env` file in the root directory (or set in Netlify dashboard):

```env
GEMINI_API_KEY=your_gemini_api_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PRICE_ID=price_your_price_id_here
```

### Getting API Keys

1. **Gemini API Key**: 
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create a new API key
   - Copy and paste into `GEMINI_API_KEY`

2. **Stripe Keys**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/)
   - Navigate to Developers → API keys
   - Copy the Secret key to `STRIPE_SECRET_KEY`

## Stripe Setup

### 1. Create Product

1. Go to Stripe Dashboard → Products
2. Click "Add product"
3. Product details:
   - **Name**: ExplainThis AI – Full Explanation
   - **Description**: Full plain-language explanation with bullet-point breakdown and downloadable summary
   - **Pricing**: One-time payment of **$2.90 USD**
4. Click "Save product"
5. Copy the **Price ID** (starts with `price_`) and paste into `STRIPE_PRICE_ID` environment variable

### 2. Configure Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-site.netlify.app/.netlify/functions/stripeWebhook`
4. Select events to listen to:
   - `checkout.session.completed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`) and paste into `STRIPE_WEBHOOK_SECRET`

## Netlify Deployment

### Step 1: Create Netlify Site

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository or drag & drop this folder
4. Build settings:
   - **Base directory**: `explain`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### Step 2: Set Environment Variables

1. Go to Site settings → Environment variables
2. Add all variables from `.env.example`:
   - `GEMINI_API_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `STRIPE_PRICE_ID`

### Step 3: Configure Functions

Netlify Functions are automatically detected in the `/netlify/functions/` directory. No additional configuration needed.

### Step 4: Update Webhook URL

After deployment, update your Stripe webhook endpoint URL to:
```
https://your-actual-site.netlify.app/.netlify/functions/stripeWebhook
```

## Mapping to viralhacks.ch/explain

To serve this app under `viralhacks.ch/explain`:

### Option A: Netlify Redirects (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file in the main site:
   ```
   /explain/*  https://explain.netlify.app/:splat  200
   ```
3. This proxies all traffic from `/explain` to your ExplainThis site

### Option B: Netlify Domain Alias

1. In your ExplainThis Netlify site settings
2. Go to Domain management → Add custom domain
3. Add `viralhacks.ch`
4. Configure DNS to point to Netlify
5. Use Netlify's path-based routing to handle `/explain`

### Option C: Reverse Proxy

Set up a reverse proxy (Cloudflare Workers, Nginx, etc.) to route:
```
viralhacks.ch/explain → explain.netlify.app
```

## How It Works

1. **User provides content** (text, PDF, or URL)
2. **Backend extracts content** based on input type
3. **AI analyzes and explains** using Google Gemini
4. **Preview is shown** (first 2-3 points)
5. **User pays $2.90** via Stripe Checkout
6. **Full explanation unlocked** with complete breakdown
7. **User views/downloads** the full explanation

## Explanation Structure

Each explanation includes:

- **Short Summary**: 2-3 sentence overview
- **Main Points**: Bulleted list of key concepts
- **Implications/Context**: Optional additional context
- **Key Takeaways**: 3-5 bullet points summarizing the most important information

## Privacy & Legal

- **No data storage**: Content is processed in memory only
- **No logging**: User inputs are never logged
- **Session-based**: Explanations stored temporarily (1 hour max)
- **No advice**: Clear disclaimer that this is not legal, medical, or financial advice

## File Structure

```
explain/
├── netlify/
│   └── functions/
│       ├── explainContent.mjs         # Content extraction & explanation
│       ├── createCheckoutSession.mjs  # Stripe checkout
│       ├── getFullExplanation.mjs     # Retrieve full explanation
│       └── stripeWebhook.mjs          # Webhook handler
├── src/
│   ├── App.tsx                        # Main React component
│   ├── main.tsx                       # Entry point
│   └── styles/
│       └── global.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── .env.example
└── README.md
```

## Use Cases

- **Students**: Understand complex academic papers
- **Professionals**: Simplify technical documentation
- **Legal**: Break down contracts and legal documents
- **Research**: Summarize long articles and reports
- **General**: Explain any complex content in simple terms

## Limitations

- **URL fetching**: Some websites may block automated access
- **PDF images**: Scanned PDFs (images) won't work well
- **Content length**: Limited to first 15,000 characters for processing
- **Language**: Works best with English content

## Testing

### Local Testing

1. Start dev server: `npm run dev`
2. Try all three input types:
   - Paste complex text
   - Upload a PDF
   - Enter a URL
3. Verify preview is generated
4. For payment testing, use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Any future expiry date and CVC

### Production Testing

1. Deploy to Netlify
2. Set all environment variables
3. Test full flow including payment
4. Verify webhook is receiving events in Stripe Dashboard

## Troubleshooting

**Issue**: "Failed to explain content"
- Check `GEMINI_API_KEY` is set correctly
- Verify API key has quota available
- Ensure content is not empty

**Issue**: "Failed to fetch URL content"
- Verify URL is accessible
- Some websites block automated access
- Try using text or PDF instead

**Issue**: "PDF appears to be empty"
- Ensure PDF contains actual text (not scanned images)
- Try a different PDF file

**Issue**: "Failed to create checkout session"
- Check `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are correct
- Ensure Stripe is in test mode during development

**Issue**: "Payment not completed"
- Verify webhook is configured correctly
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact support at your domain.

## SEO & AI Search

This tool is equipped with appropriate HTML meta tags, OpenGraph data, and JSON-LD WebApplication schema, enabling search engines and AI search services to better recognize and recommend the tool's functionality.
