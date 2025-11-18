# PDF2Word Ultra Converter

Convert PDF files to editable Word documents (.docx) with preserved layout and structure. Fast, simple, and no software installation required.

## Features

- **PDF Upload**: Accept PDF files up to 10MB
- **Smart Conversion**: Extract text and preserve paragraphs and headings
- **Free Preview**: See first page preview before purchasing
- **Freemium Model**: Preview for free, full DOCX export for $2.90
- **Stripe Integration**: Secure one-time payment processing
- **Instant Download**: Get editable DOCX file immediately after payment

## Tech Stack

**Frontend**:
- React 18 with TypeScript
- Vite for fast builds
- CSS modules for styling

**Backend**:
- Netlify Functions (serverless)
- pdf-parse for PDF text extraction
- docx library for Word document generation
- Stripe for payments

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3002`

## Build

```bash
npm run build
```

Build output will be in the `dist/` directory.

## Environment Variables

Create a `.env` file in the root directory (or set in Netlify dashboard):

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_PRICE_ID=price_your_price_id_here
```

### Getting API Keys

**Stripe Keys**:
- Go to [Stripe Dashboard](https://dashboard.stripe.com/)
- Navigate to Developers → API keys
- Copy the Secret key to `STRIPE_SECRET_KEY`

## Stripe Setup

### 1. Create Product

1. Go to Stripe Dashboard → Products
2. Click "Add product"
3. Product details:
   - **Name**: PDF2Word Ultra – DOCX Export
   - **Description**: Convert PDF to editable Word document with preserved layout
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
   - **Base directory**: `pdf2word`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

### Step 2: Set Environment Variables

1. Go to Site settings → Environment variables
2. Add all variables from `.env.example`:
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

## Mapping to viralhacks.ch/pdf2word

To serve this app under `viralhacks.ch/pdf2word`:

### Option A: Netlify Redirects (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file in the main site:
   ```
   /pdf2word/*  https://pdf2word.netlify.app/:splat  200
   ```
3. This proxies all traffic from `/pdf2word` to your PDF2Word site

### Option B: Netlify Domain Alias

1. In your PDF2Word Netlify site settings
2. Go to Domain management → Add custom domain
3. Add `viralhacks.ch`
4. Configure DNS to point to Netlify
5. Use Netlify's path-based routing to handle `/pdf2word`

### Option C: Reverse Proxy

Set up a reverse proxy (Cloudflare Workers, Nginx, etc.) to route:
```
viralhacks.ch/pdf2word → pdf2word.netlify.app
```

## How It Works

1. **User uploads PDF** (up to 10MB)
2. **Backend extracts text** using pdf-parse
3. **Smart parsing** detects paragraphs and headings
4. **Preview is generated** (first 300-500 words)
5. **User pays $2.90** via Stripe Checkout
6. **Full DOCX created** using docx library
7. **User downloads** editable Word document

## Privacy & Legal

- **No data storage**: PDFs are processed in memory only
- **No logging**: Uploaded files are never logged
- **Session-based**: Documents stored temporarily (1 hour max)
- **Disclaimer**: Clear messaging about AI assistance

## File Structure

```
pdf2word/
├── netlify/
│   └── functions/
│       ├── convertPDF.mjs              # PDF to DOCX conversion
│       ├── createCheckoutSession.mjs   # Stripe checkout
│       ├── getFullDocument.mjs         # Retrieve full DOCX
│       └── stripeWebhook.mjs           # Webhook handler
├── src/
│   ├── App.tsx                         # Main React component
│   ├── main.tsx                        # Entry point
│   └── styles/
│       └── global.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── .env.example
└── README.md
```

## Limitations

- **Text-based PDFs only**: Scanned PDFs (images) won't convert properly
- **Layout preservation**: Basic layout is preserved, but complex formatting may be lost
- **Tables and images**: Not fully supported in current version
- **File size**: Maximum 10MB per PDF

## Testing

### Local Testing

1. Start dev server: `npm run dev`
2. Upload a test PDF (text-based)
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

**Issue**: "PDF appears to be empty"
- Ensure PDF contains actual text (not scanned images)
- Try a different PDF file

**Issue**: "Failed to convert PDF"
- Check PDF file size is under 10MB
- Verify PDF is not password-protected

**Issue**: "Failed to create checkout session"
- Check `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are correct
- Ensure Stripe is in test mode during development

**Issue**: "Payment not completed"
- Verify webhook is configured correctly
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`

**Issue**: Poor formatting in DOCX
- This tool works best with simple text-based PDFs
- Complex layouts may require manual formatting after conversion

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact support at your domain.

## SEO & AI Search

This tool is equipped with appropriate HTML meta tags, OpenGraph data, and JSON-LD WebApplication schema, enabling search engines and AI search services to better recognize and recommend the tool's functionality.
