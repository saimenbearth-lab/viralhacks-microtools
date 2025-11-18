# AI Social Script Generator

Generate viral-ready scripts for TikTok, Instagram Reels, and YouTube Shorts. Get 10 complete scripts with hooks, CTAs, and hashtags in seconds.

## Features

- **Topic-based Generation**: Enter any niche or topic
- **Multiple Tones**: Funny, Emotional, Informative, Storytelling, Street/Gen Z
- **Platform Optimization**: TikTok, Reels, or Shorts
- **Freemium Model**: 2 free preview scripts, full pack of 10 for $3.90
- **Complete Scripts**: Each includes hook, body (3-5 shots), CTA, and hashtags
- **Stripe Integration**: Secure one-time payment processing

## Tech Stack

**Frontend**:
- React 18 with TypeScript
- Vite for fast builds
- CSS modules for styling

**Backend**:
- Netlify Functions (serverless)
- Google Gemini AI API for script generation
- Stripe for payments

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3003`

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
   - **Name**: Social Script Generator – Full Pack
   - **Description**: 10 viral-ready TikTok/Reels/Shorts scripts with hooks, CTAs, and hashtags
   - **Pricing**: One-time payment of **$3.90 USD**
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
   - **Base directory**: `script-generator`
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

## Mapping to viralhacks.ch/script-generator

To serve this app under `viralhacks.ch/script-generator`:

### Option A: Netlify Redirects (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file in the main site:
   ```
   /script-generator/*  https://script-generator.netlify.app/:splat  200
   ```
3. This proxies all traffic from `/script-generator` to your Script Generator site

### Option B: Netlify Domain Alias

1. In your Script Generator Netlify site settings
2. Go to Domain management → Add custom domain
3. Add `viralhacks.ch`
4. Configure DNS to point to Netlify
5. Use Netlify's path-based routing to handle `/script-generator`

### Option C: Reverse Proxy

Set up a reverse proxy (Cloudflare Workers, Nginx, etc.) to route:
```
viralhacks.ch/script-generator → script-generator.netlify.app
```

## How It Works

1. **User enters topic** (e.g., "fitness tips")
2. **Selects tone and platform** (e.g., Funny, TikTok)
3. **AI generates 10 scripts** using Google Gemini
4. **Preview shows 2 scripts** (free)
5. **User pays $3.90** via Stripe Checkout
6. **Full pack of 10 scripts unlocked**
7. **User copies scripts** for their videos

## Script Structure

Each generated script includes:

- **Hook**: Attention-grabbing opening line
- **Body**: 3-5 shots/scenes with descriptions
- **CTA**: Strong call to action
- **Hashtags**: 5-8 relevant hashtags for discoverability

## Privacy & Legal

- **No data storage**: Topics and scripts are processed in memory only
- **No logging**: User inputs are never logged
- **Session-based**: Scripts stored temporarily (1 hour max)
- **Content policy**: AI never generates hateful, explicit, or illegal content

## File Structure

```
script-generator/
├── netlify/
│   └── functions/
│       ├── generateScripts.mjs        # AI script generation
│       ├── createCheckoutSession.mjs  # Stripe checkout
│       ├── getFullScripts.mjs         # Retrieve full scripts
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

## Testing

### Local Testing

1. Start dev server: `npm run dev`
2. Enter a test topic (e.g., "cooking hacks")
3. Select tone and platform
4. Verify 2 preview scripts are generated
5. For payment testing, use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Any future expiry date and CVC

### Production Testing

1. Deploy to Netlify
2. Set all environment variables
3. Test full flow including payment
4. Verify webhook is receiving events in Stripe Dashboard

## Troubleshooting

**Issue**: "Failed to generate scripts"
- Check `GEMINI_API_KEY` is set correctly
- Verify API key has quota available
- Ensure topic is not empty

**Issue**: "AI did not generate enough scripts"
- Try a more specific topic
- Change tone or platform
- Retry generation

**Issue**: "Failed to create checkout session"
- Check `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are correct
- Ensure Stripe is in test mode during development

**Issue**: "Payment not completed"
- Verify webhook is configured correctly
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`

## Use Cases

- **Content Creators**: Generate fresh ideas for daily posts
- **Social Media Managers**: Batch-create scripts for clients
- **Influencers**: Get viral hooks and CTAs
- **Brands**: Create on-brand short-form content
- **Agencies**: Scale content production

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact support at your domain.

## SEO & AI Search

This tool is equipped with appropriate HTML meta tags, OpenGraph data, and JSON-LD WebApplication schema, enabling search engines and AI search services to better recognize and recommend the tool's functionality.
