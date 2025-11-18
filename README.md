# ViralHacks Microtools Monorepo

A production-ready collection of 5 AI-powered microtools designed for conversion-optimized revenue generation. Each tool is a standalone Single Page Application (SPA) built with React, Netlify Functions, Google Gemini AI, and Stripe Checkout integration.

## 🚀 Tools Overview

All tools are designed to be deployed on **viralhacks.ch** under specific subpaths:

### 1. AI Contract Checker
- **Path**: `/contract-check`
- **Price**: $4.90
- **Purpose**: Upload contracts (PDF/text) and get AI-highlighted risks, unclear clauses, and one-sided terms
- **Folder**: `/contract-checker`

### 2. AI Image Upscaler
- **Path**: `/image-upscaler`
- **Price**: $3.90
- **Purpose**: Turn blurry images into sharp, high-resolution photos with AI enhancement
- **Folder**: `/image-upscaler`

### 3. PDF2Word Ultra Converter
- **Path**: `/pdf2word`
- **Price**: $2.90
- **Purpose**: Convert any PDF into an editable Word document with preserved layout
- **Folder**: `/pdf2word`

### 4. Social Script Generator
- **Path**: `/script-generator`
- **Price**: $3.90
- **Purpose**: Generate viral-ready TikTok/Reels/YouTube Shorts scripts with hooks, CTAs, and hashtags
- **Folder**: `/script-generator`

### 5. ExplainThis AI Explainer
- **Path**: `/explain`
- **Price**: $2.90
- **Purpose**: Paste text, upload PDF, or input URL to get simple, clear explanations in plain language
- **Folder**: `/explain`

## 🛠 Tech Stack

**Frontend**:
- React 18 with TypeScript
- Vite for fast builds and HMR
- Modern CSS (CSS modules)

**Backend**:
- Netlify Functions (Node.js)
- Google Gemini AI API for text generation
- Stripe Checkout for one-time payments

**Key Libraries**:
- `pdf-parse` for PDF text extraction
- `docx` for Word document generation
- `pdfkit` for PDF generation
- `@google/generative-ai` for Gemini integration
- `stripe` for payment processing

## 📦 Monorepo Structure

```
viralhacks-microtools/
├── contract-checker/          # AI Contract Checker
├── image-upscaler/           # AI Image Upscaler
├── pdf2word/                 # PDF2Word Ultra Converter
├── script-generator/         # Social Script Generator
├── explain/                  # ExplainThis AI Explainer
├── shared-docs/              # Shared documentation and notes
└── README.md                 # This file
```

Each tool folder contains:
- `package.json` - Dependencies and scripts
- `vite.config.js` - Vite configuration
- `index.html` - Entry HTML file
- `/src/` - React application source code
- `/netlify/functions/` - Serverless backend functions
- `.env.example` - Environment variable template
- `README.md` - Tool-specific documentation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Netlify account
- Google Gemini API key ([Get one here](https://ai.google.dev/))
- Stripe account ([Sign up here](https://stripe.com))

### Installation & Development

Each tool is independent. Navigate to any tool folder and run:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Each tool requires the following environment variables (see individual `.env.example` files):

```env
GEMINI_API_KEY=your_gemini_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
STRIPE_PRICE_ID=your_tool_specific_price_id_here
```

## 🌐 Deployment Guide

### Step 1: Deploy Each Tool to Netlify

For each tool:

1. **Create a new Netlify site**:
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository or drag & drop the tool folder
   - Set the **Base directory** to the tool folder (e.g., `contract-checker`)
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Set environment variables**:
   - Go to Site settings → Environment variables
   - Add all required variables from `.env.example`

3. **Configure Netlify Functions**:
   - Functions are automatically detected in `/netlify/functions/`
   - No additional configuration needed

### Step 2: Set Up Stripe Products

For each tool, create a Stripe product:

1. Go to Stripe Dashboard → Products
2. Click "Add product"
3. Enter product details:
   - **Contract Checker**: "AI Contract Checker – Full Report" - $4.90
   - **Image Upscaler**: "AI Image Upscaler – HD Download" - $3.90
   - **PDF2Word**: "PDF2Word Ultra – DOCX Export" - $2.90
   - **Script Generator**: "Social Script Generator – Full Pack" - $3.90
   - **ExplainThis**: "ExplainThis AI – Full Explanation" - $2.90
4. Set pricing to "One-time payment"
5. Copy the **Price ID** and add it to `STRIPE_PRICE_ID` environment variable

### Step 3: Configure Stripe Webhooks

For each tool:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-netlify-site.netlify.app/.netlify/functions/stripeWebhook`
4. Select events: `checkout.session.completed`
5. Copy the **Signing secret** and add it to `STRIPE_WEBHOOK_SECRET`

### Step 4: Map to viralhacks.ch Subpaths

Each tool should be accessible under `viralhacks.ch/{path}`. There are two approaches:

#### Option A: Netlify Domain Aliases (Recommended)

1. In each Netlify site settings → Domain management
2. Add custom domain: `viralhacks.ch`
3. Use Netlify's `_redirects` file to route specific paths to specific sites

Create a main site with this `_redirects` file:
```
/contract-check/*  https://contract-checker.netlify.app/:splat  200
/image-upscaler/*  https://image-upscaler.netlify.app/:splat  200
/pdf2word/*        https://pdf2word.netlify.app/:splat  200
/script-generator/* https://script-generator.netlify.app/:splat  200
/explain/*         https://explain.netlify.app/:splat  200
```

#### Option B: Reverse Proxy

Set up a reverse proxy (e.g., Cloudflare Workers, Nginx) to route:
- `viralhacks.ch/contract-check` → Contract Checker Netlify site
- `viralhacks.ch/image-upscaler` → Image Upscaler Netlify site
- etc.

See individual tool READMEs for more detailed deployment instructions.

## 🔒 Privacy & Legal

All tools follow these principles:

- **No data storage**: User content is processed in memory only and never stored
- **No logging**: Full user content is not logged
- **AI assistance disclaimer**: All tools clearly state they do not provide legal, financial, or medical advice
- **GDPR compliant**: No personal data retention

## 📄 License

Proprietary - All rights reserved

## 🆘 Support

For issues or questions, refer to individual tool READMEs or contact support.

---

**Built for immediate revenue generation. Deploy once, earn forever.** 🚀
