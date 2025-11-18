# AI Contract Checker

AI-powered contract analysis tool that highlights risks, unclear clauses, and one-sided terms. Upload a PDF or paste text to get instant AI-generated insights.

## Features

- **PDF & Text Upload**: Accept contracts in PDF format or plain text
- **AI Analysis**: Powered by Google Gemini for intelligent contract review
- **Freemium Model**: Free preview with 2-3 key insights, full report for $4.90
- **Stripe Integration**: Secure one-time payment processing
- **PDF Export**: Download full analysis as a lawyer-ready PDF
- **Multi-language**: Support for English and German contracts

## Tech Stack

**Frontend**:
- React 18 with TypeScript
- Vite for fast builds
- CSS modules for styling

**Backend**:
- Netlify Functions (serverless)
- Google Gemini AI API
- Stripe for payments
- pdf-parse for PDF text extraction
- pdfkit for PDF generation

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

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
   - **Name**: AI Contract Checker – Full Report
   - **Description**: Full AI-powered contract analysis with risk detection and downloadable PDF
   - **Pricing**: One-time payment of **$4.90 USD**
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
   - **Base directory**: `contract-checker`
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

## Mapping to viralhacks.ch/contract-check

To serve this app under `viralhacks.ch/contract-check`:

### Option A: Netlify Redirects (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file in the main site:
   ```
   /contract-check/*  https://contract-checker.netlify.app/:splat  200
   ```
3. This proxies all traffic from `/contract-check` to your Contract Checker site

### Option B: Netlify Domain Alias

1. In your Contract Checker Netlify site settings
2. Go to Domain management → Add custom domain
3. Add `viralhacks.ch`
4. Configure DNS to point to Netlify
5. Use Netlify's path-based routing to handle `/contract-check`

### Option C: Reverse Proxy

Set up a reverse proxy (Cloudflare Workers, Nginx, etc.) to route:
```
viralhacks.ch/contract-check → contract-checker.netlify.app
```

## How It Works

1. **User uploads contract** (PDF or text)
2. **Backend extracts text** from PDF using pdf-parse
3. **AI analyzes contract** using Google Gemini
4. **Preview is shown** with 2-3 key insights (free)
5. **User pays $4.90** via Stripe Checkout
6. **Full report is unlocked** with detailed analysis
7. **User downloads PDF** of the complete report

## Privacy & Legal

- **No data storage**: Contracts are processed in memory only
- **No logging**: Full contract text is never logged
- **Session-based**: Analysis results stored temporarily (1 hour max)
- **Disclaimer**: Clear messaging that this is AI assistance, not legal advice

## File Structure

```
contract-checker/
├── netlify/
│   └── functions/
│       ├── analyzeContract.mjs      # Main AI analysis
│       ├── createCheckoutSession.mjs # Stripe checkout
│       ├── getFullReport.mjs        # Retrieve full report
│       ├── stripeWebhook.mjs        # Webhook handler
│       └── generatePDF.mjs          # PDF export
├── src/
│   ├── App.tsx                      # Main React component
│   ├── main.tsx                     # Entry point
│   └── styles/
│       └── global.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── .env.example
└── README.md
```

## Testing

### Local Testing

1. Start dev server: `npm run dev`
2. Upload a test contract (PDF or text)
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

**Issue**: "Failed to analyze contract"
- Check `GEMINI_API_KEY` is set correctly
- Verify API key has quota available

**Issue**: "Failed to create checkout session"
- Check `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are correct
- Ensure Stripe is in test mode during development

**Issue**: "Payment not completed"
- Verify webhook is configured correctly
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`

**Issue**: PDF extraction fails
- Ensure PDF is text-based (not scanned image)
- Check file size is under 10MB

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact support at your domain.

## SEO & AI Search

This tool is equipped with appropriate HTML meta tags, OpenGraph data, and JSON-LD WebApplication schema, enabling search engines and AI search services to better recognize and recommend the tool's functionality.
