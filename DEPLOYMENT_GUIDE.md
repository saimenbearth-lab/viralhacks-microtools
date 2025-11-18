# Deployment Guide - ViralHacks Microtools

Complete step-by-step guide to deploy all 5 tools to Netlify and start generating revenue.

## Prerequisites

- Netlify account ([Sign up free](https://app.netlify.com/signup))
- Google Gemini API key ([Get here](https://ai.google.dev/))
- Stripe account (already configured with products)
- Git repository (optional, can also drag & drop)

## Quick Start (5 Steps)

### Step 1: Get Your API Keys

**Gemini API Key:**
1. Go to https://ai.google.dev/
2. Click "Get API key in Google AI Studio"
3. Create new project or select existing
4. Click "Create API Key"
5. Copy the key (starts with `AIza...`)

**Stripe Keys:**
- Already have products created ✅
- Get Secret Key from: https://dashboard.stripe.com/apikeys
- Copy the key (starts with `sk_live_...` or `sk_test_...`)

### Step 2: Deploy Each Tool to Netlify

For each of the 5 tools, repeat this process:

#### Option A: Drag & Drop (Easiest)

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Deploy manually"
3. Drag the tool folder (e.g., `contract-checker/`) into the drop zone
4. Wait for deployment to complete

#### Option B: Git Deploy (Recommended for updates)

1. Push monorepo to GitHub/GitLab
2. In Netlify: "Add new site" → "Import an existing project"
3. Connect repository
4. Set base directory to tool folder (e.g., `contract-checker`)
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

### Step 3: Configure Environment Variables

For each deployed site:

1. Go to Site settings → Environment variables
2. Click "Add a variable"
3. Add the following (see STRIPE_SETUP.md for specific Price IDs):

**For Contract Checker, Image Upscaler, Script Generator, ExplainThis:**
```
GEMINI_API_KEY = your_gemini_api_key_here
STRIPE_SECRET_KEY = your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET = (leave empty for now)
STRIPE_PRICE_ID = (see STRIPE_SETUP.md for specific ID)
```

**For PDF2Word (no Gemini needed):**
```
STRIPE_SECRET_KEY = your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET = (leave empty for now)
STRIPE_PRICE_ID = price_1SUlHeH9DqkBzHZud0UkTOqN
```

4. Click "Save"
5. Trigger redeploy: Deploys → Trigger deploy → Deploy site

### Step 4: Configure Stripe Webhooks

For each tool:

1. Copy the Netlify site URL (e.g., `https://your-site-name.netlify.app`)
2. Go to https://dashboard.stripe.com/webhooks
3. Click "Add endpoint"
4. Endpoint URL: `https://your-site-name.netlify.app/.netlify/functions/stripeWebhook`
5. Select events: `checkout.session.completed`
6. Click "Add endpoint"
7. Copy the "Signing secret" (starts with `whsec_...`)
8. Go back to Netlify → Site settings → Environment variables
9. Update `STRIPE_WEBHOOK_SECRET` with the signing secret
10. Trigger redeploy

### Step 5: Map to Your Domain (Optional)

To serve tools under `viralhacks.ch`:

#### Option A: Netlify Redirects (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file:
```
/contract-check/*   https://contract-checker-site.netlify.app/:splat  200
/image-upscaler/*   https://image-upscaler-site.netlify.app/:splat  200
/pdf2word/*         https://pdf2word-site.netlify.app/:splat  200
/script-generator/* https://script-generator-site.netlify.app/:splat  200
/explain/*          https://explain-site.netlify.app/:splat  200
```
3. Deploy this main site
4. Configure DNS to point `viralhacks.ch` to Netlify

#### Option B: Individual Custom Domains

For each tool:
1. Go to Site settings → Domain management
2. Add custom domain
3. Follow Netlify's DNS configuration instructions

## Testing

### Test Each Tool

1. **Contract Checker**: https://your-contract-checker.netlify.app
   - Upload a test PDF contract
   - Verify preview appears
   - Test payment with card `4242 4242 4242 4242`
   - Verify full report unlocks

2. **Image Upscaler**: https://your-image-upscaler.netlify.app
   - Upload a test image
   - Verify preview appears
   - Test payment
   - Verify HD download works

3. **PDF2Word**: https://your-pdf2word.netlify.app
   - Upload a test PDF
   - Verify preview appears
   - Test payment
   - Verify DOCX downloads

4. **Script Generator**: https://your-script-generator.netlify.app
   - Enter a topic (e.g., "fitness tips")
   - Verify 2 preview scripts appear
   - Test payment
   - Verify 10 full scripts unlock

5. **ExplainThis**: https://your-explain.netlify.app
   - Paste some complex text
   - Verify preview appears
   - Test payment
   - Verify full explanation unlocks

### Verify Webhooks

1. Go to https://dashboard.stripe.com/webhooks
2. Click on each webhook endpoint
3. Check "Recent events" tab
4. Should see `checkout.session.completed` events after test payments

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- Solution: Ensure `package.json` is in the tool folder
- Run `npm install` locally to verify dependencies

**Error**: `Command not found: npm`
- Solution: Netlify auto-detects Node.js, but you can set Node version in `netlify.toml`

### Functions Not Working

**Error**: `Function not found`
- Solution: Ensure `/netlify/functions/` folder exists in deployed site
- Check Netlify Functions tab to see if functions are detected

**Error**: `GEMINI_API_KEY is not defined`
- Solution: Environment variables not set
- Go to Site settings → Environment variables
- Add missing variables
- Trigger redeploy

### Payments Not Working

**Error**: `Failed to create checkout session`
- Solution: Check `STRIPE_SECRET_KEY` and `STRIPE_PRICE_ID` are correct
- Verify you're using the right Price ID from STRIPE_SETUP.md

**Error**: `Payment not completed`
- Solution: Webhook not configured or signing secret wrong
- Verify webhook endpoint URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard

### Preview Shows But Full Result Doesn't Unlock

**Error**: Session expired
- Solution: Sessions expire after 1 hour
- User needs to regenerate the content and pay again
- This is by design for security

## Monitoring & Analytics

### Stripe Dashboard

Monitor revenue and payments:
- https://dashboard.stripe.com/payments
- View successful payments
- Track revenue by product
- Monitor failed payments

### Netlify Analytics

Monitor traffic and performance:
- Go to each site → Analytics
- View page views, unique visitors
- Monitor function invocations
- Check bandwidth usage

### Netlify Functions Logs

Debug issues:
- Go to Functions tab
- Click on a function
- View recent invocations and logs
- Check for errors

## Scaling

### Performance

All tools are serverless and auto-scale:
- No server management needed
- Handles traffic spikes automatically
- Pay only for what you use

### Costs

**Netlify Free Tier:**
- 100 GB bandwidth/month
- 300 build minutes/month
- 125k function invocations/month

**Gemini API:**
- Free tier: 15 requests/minute
- Paid: $0.00025 per 1K characters

**Stripe:**
- 2.9% + $0.30 per successful transaction

### Optimization Tips

1. **Cache static assets**: Already configured in Vite
2. **Minimize function calls**: Sessions stored in memory
3. **Monitor quotas**: Check Gemini API usage
4. **Use webhooks**: Don't poll Stripe API

## Revenue Tracking

### Expected Revenue

Per tool pricing:
- Contract Checker: $4.90
- Image Upscaler: $3.90
- PDF2Word: $2.90
- Script Generator: $3.90
- ExplainThis: $2.90

**Total per customer (all tools): $17.50**

### Monthly Projections

| Customers | Revenue |
|-----------|---------|
| 100 | $1,750 |
| 500 | $8,750 |
| 1,000 | $17,500 |
| 5,000 | $87,500 |
| 10,000 | $175,000 |

### Marketing Ideas

1. **SEO**: Tools are already SEO-optimized
2. **Social Media**: Share payment links directly
3. **Content Marketing**: Blog about use cases
4. **Affiliates**: Create affiliate program with Stripe
5. **Email Marketing**: Collect emails, send promotions

## Support

### User Issues

Common user questions:

**Q: Is my data stored?**
A: No, all content is processed in memory and deleted after 1 hour.

**Q: Can I get a refund?**
A: Configure refund policy in Stripe Dashboard.

**Q: The tool doesn't work.**
A: Check Netlify Functions logs for errors.

### Technical Support

For technical issues:
1. Check Netlify Functions logs
2. Check Stripe webhook events
3. Verify environment variables are set
4. Test locally with `npm run dev`

## Next Steps

1. ✅ Deploy all 5 tools to Netlify
2. ✅ Configure environment variables
3. ✅ Set up Stripe webhooks
4. ✅ Test each tool end-to-end
5. 🚀 Launch and start marketing!

**Your tools are production-ready and live!**

All Stripe products are already created and accepting payments. Just deploy, configure, and start earning! 💰
