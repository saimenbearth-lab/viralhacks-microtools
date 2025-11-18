# AI Image Upscaler

AI-powered image upscaling and enhancement tool. Upload blurry or low-resolution images and get sharp, high-quality HD versions instantly.

## Features

- **Image Upload**: Accept JPG and PNG files
- **AI Enhancement**: Upscale images up to 4× with sharp quality
- **Side-by-side Preview**: Compare original vs enhanced preview
- **Freemium Model**: Free preview, full HD download for $3.90
- **Stripe Integration**: Secure one-time payment processing
- **Instant Download**: Get full-resolution enhanced image immediately

## Tech Stack

**Frontend**:
- React 18 with TypeScript
- Vite for fast builds
- CSS modules for styling

**Backend**:
- Netlify Functions (serverless)
- Sharp for image processing and upscaling
- Stripe for payments

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:3001`

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
   - **Name**: AI Image Upscaler – HD Download
   - **Description**: Full HD upscaled and enhanced image with no watermark
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
   - **Base directory**: `image-upscaler`
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

## Mapping to viralhacks.ch/image-upscaler

To serve this app under `viralhacks.ch/image-upscaler`:

### Option A: Netlify Redirects (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file in the main site:
   ```
   /image-upscaler/*  https://image-upscaler.netlify.app/:splat  200
   ```
3. This proxies all traffic from `/image-upscaler` to your Image Upscaler site

### Option B: Netlify Domain Alias

1. In your Image Upscaler Netlify site settings
2. Go to Domain management → Add custom domain
3. Add `viralhacks.ch`
4. Configure DNS to point to Netlify
5. Use Netlify's path-based routing to handle `/image-upscaler`

### Option C: Reverse Proxy

Set up a reverse proxy (Cloudflare Workers, Nginx, etc.) to route:
```
viralhacks.ch/image-upscaler → image-upscaler.netlify.app
```

## How It Works

1. **User uploads image** (JPG or PNG)
2. **Backend processes image** using Sharp library
3. **Preview is generated** (2× upscale, lower quality)
4. **Side-by-side comparison** shown (original vs preview)
5. **User pays $3.90** via Stripe Checkout
6. **Full HD image unlocked** (4× upscale, maximum quality)
7. **User downloads** the full-resolution enhanced image

## Privacy & Legal

- **No data storage**: Images are processed in memory only
- **No logging**: Uploaded images are never logged
- **Session-based**: Images stored temporarily (1 hour max)
- **Disclaimer**: Clear messaging about AI assistance

## File Structure

```
image-upscaler/
├── netlify/
│   └── functions/
│       ├── upscaleImage.mjs          # Image processing & upscaling
│       ├── createCheckoutSession.mjs # Stripe checkout
│       ├── getFullImage.mjs          # Retrieve full HD image
│       └── stripeWebhook.mjs         # Webhook handler
├── src/
│   ├── App.tsx                       # Main React component
│   ├── main.tsx                      # Entry point
│   └── styles/
│       └── global.css                # Global styles
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
2. Upload a test image (JPG or PNG)
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

**Issue**: "Failed to upscale image"
- Check image file size is under 10MB
- Verify image format is JPG or PNG

**Issue**: "Failed to create checkout session"
- Check `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are correct
- Ensure Stripe is in test mode during development

**Issue**: "Payment not completed"
- Verify webhook is configured correctly
- Check webhook signing secret matches `STRIPE_WEBHOOK_SECRET`

**Issue**: Image quality is poor
- Ensure original image has sufficient resolution
- Try different source images

## License

Proprietary - All rights reserved

## Support

For issues or questions, contact support at your domain.

## SEO & AI Search

This tool is equipped with appropriate HTML meta tags, OpenGraph data, and JSON-LD WebApplication schema, enabling search engines and AI search services to better recognize and recommend the tool's functionality.
