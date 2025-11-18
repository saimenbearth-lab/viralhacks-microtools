# Netlify Deployment Guide - GitHub Integration

## 🚀 Quick Start: Deploy All 5 Tools in 30 Minutes

Your complete monorepo is now on GitHub and ready for Netlify deployment!

**GitHub Repository:** https://github.com/saimenbearth-lab/viralhacks-microtools

---

## 📋 Prerequisites

✅ GitHub repository created and pushed  
✅ Netlify account ([Sign up free](https://app.netlify.com/signup))  
✅ Gemini API Key: `AIzaSyCtEBp2VjXfTyBOFJG1PxAboDDbStEeiOA`  
✅ Stripe account with products created  

---

## 🔧 Deploy Each Tool (6 Minutes per Tool)

You need to create **5 separate Netlify sites** - one for each tool.

### Tool 1: AI Contract Checker

#### Step 1: Import from GitHub

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select repository: **saimenbearth-lab/viralhacks-microtools**
5. Configure build settings:
   - **Site name**: `viralhacks-contract-checker` (or your choice)
   - **Branch**: `main`
   - **Base directory**: `contract-checker`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `contract-checker/dist`
6. Click **"Deploy site"**

#### Step 2: Set Environment Variables

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** and add:

```env
GEMINI_API_KEY = AIzaSyCtEBp2VjXfTyBOFJG1PxAboDDbStEeiOA
STRIPE_SECRET_KEY = your_stripe_secret_key
STRIPE_WEBHOOK_SECRET = (leave empty for now)
STRIPE_PRICE_ID = price_1SUlHDH9DqkBzHZuIM3nJXpq
```

3. Click **"Save"**
4. Go to **Deploys** → **"Trigger deploy"** → **"Deploy site"**

#### Step 3: Configure Stripe Webhook

1. Copy your Netlify site URL (e.g., `https://viralhacks-contract-checker.netlify.app`)
2. Go to https://dashboard.stripe.com/webhooks
3. Click **"Add endpoint"**
4. **Endpoint URL**: `https://viralhacks-contract-checker.netlify.app/.netlify/functions/stripeWebhook`
5. **Events to send**: Select `checkout.session.completed`
6. Click **"Add endpoint"**
7. Copy the **Signing secret** (starts with `whsec_...`)
8. Back to Netlify → **Environment variables**
9. Update `STRIPE_WEBHOOK_SECRET` with the signing secret
10. **Trigger deploy** again

✅ **Contract Checker is live!**

---

### Tool 2: AI Image Upscaler

Repeat the same process with these settings:

**Build Settings:**
- Site name: `viralhacks-image-upscaler`
- Base directory: `image-upscaler`
- Publish directory: `image-upscaler/dist`

**Environment Variables:**
```env
GEMINI_API_KEY = AIzaSyCtEBp2VjXfTyBOFJG1PxAboDDbStEeiOA
STRIPE_SECRET_KEY = your_stripe_secret_key
STRIPE_WEBHOOK_SECRET = (configure after webhook setup)
STRIPE_PRICE_ID = price_1SUlHRH9DqkBzHZudOf7BTbM
```

**Webhook URL:**
`https://viralhacks-image-upscaler.netlify.app/.netlify/functions/stripeWebhook`

---

### Tool 3: PDF2Word Ultra

**Build Settings:**
- Site name: `viralhacks-pdf2word`
- Base directory: `pdf2word`
- Publish directory: `pdf2word/dist`

**Environment Variables:**
```env
STRIPE_SECRET_KEY = your_stripe_secret_key
STRIPE_WEBHOOK_SECRET = (configure after webhook setup)
STRIPE_PRICE_ID = price_1SUlHeH9DqkBzHZud0UkTOqN
```

**Note:** PDF2Word does NOT need `GEMINI_API_KEY`

**Webhook URL:**
`https://viralhacks-pdf2word.netlify.app/.netlify/functions/stripeWebhook`

---

### Tool 4: Social Script Generator

**Build Settings:**
- Site name: `viralhacks-script-generator`
- Base directory: `script-generator`
- Publish directory: `script-generator/dist`

**Environment Variables:**
```env
GEMINI_API_KEY = AIzaSyCtEBp2VjXfTyBOFJG1PxAboDDbStEeiOA
STRIPE_SECRET_KEY = your_stripe_secret_key
STRIPE_WEBHOOK_SECRET = (configure after webhook setup)
STRIPE_PRICE_ID = price_1SUlHrH9DqkBzHZuofHY6ik0
```

**Webhook URL:**
`https://viralhacks-script-generator.netlify.app/.netlify/functions/stripeWebhook`

---

### Tool 5: ExplainThis AI

**Build Settings:**
- Site name: `viralhacks-explain`
- Base directory: `explain`
- Publish directory: `explain/dist`

**Environment Variables:**
```env
GEMINI_API_KEY = AIzaSyCtEBp2VjXfTyBOFJG1PxAboDDbStEeiOA
STRIPE_SECRET_KEY = your_stripe_secret_key
STRIPE_WEBHOOK_SECRET = (configure after webhook setup)
STRIPE_PRICE_ID = price_1SUlI4H9DqkBzHZuFmmPdJcc
```

**Webhook URL:**
`https://viralhacks-explain.netlify.app/.netlify/functions/stripeWebhook`

---

## ✅ Deployment Checklist

Use this to track your progress:

- [ ] **Tool 1: Contract Checker**
  - [ ] Netlify site created
  - [ ] Environment variables set
  - [ ] Webhook configured
  - [ ] Tested with test card

- [ ] **Tool 2: Image Upscaler**
  - [ ] Netlify site created
  - [ ] Environment variables set
  - [ ] Webhook configured
  - [ ] Tested with test card

- [ ] **Tool 3: PDF2Word**
  - [ ] Netlify site created
  - [ ] Environment variables set (no Gemini needed)
  - [ ] Webhook configured
  - [ ] Tested with test card

- [ ] **Tool 4: Script Generator**
  - [ ] Netlify site created
  - [ ] Environment variables set
  - [ ] Webhook configured
  - [ ] Tested with test card

- [ ] **Tool 5: ExplainThis**
  - [ ] Netlify site created
  - [ ] Environment variables set
  - [ ] Webhook configured
  - [ ] Tested with test card

---

## 🧪 Testing Each Tool

For each deployed tool:

1. Open the Netlify URL
2. Test the core functionality:
   - **Contract Checker**: Upload a PDF contract
   - **Image Upscaler**: Upload an image
   - **PDF2Word**: Upload a PDF
   - **Script Generator**: Enter a topic
   - **ExplainThis**: Paste some text

3. Test payment with **Stripe test card**:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: `123`
   - ZIP: `12345`

4. Verify full content unlocks after payment

---

## 🌐 Custom Domain Setup (Optional)

To serve all tools under `viralhacks.ch`:

### Option A: Netlify Subdomain Mapping

For each tool, add a custom subdomain:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Add subdomain:
   - Contract Checker: `contract.viralhacks.ch`
   - Image Upscaler: `upscale.viralhacks.ch`
   - PDF2Word: `pdf2word.viralhacks.ch`
   - Script Generator: `scripts.viralhacks.ch`
   - ExplainThis: `explain.viralhacks.ch`

4. Configure DNS with CNAME records pointing to Netlify

### Option B: Path-Based Routing (Recommended)

1. Create a main Netlify site for `viralhacks.ch`
2. Add a `_redirects` file:

```
/contract-check/*   https://viralhacks-contract-checker.netlify.app/:splat  200
/image-upscaler/*   https://viralhacks-image-upscaler.netlify.app/:splat  200
/pdf2word/*         https://viralhacks-pdf2word.netlify.app/:splat  200
/script-generator/* https://viralhacks-script-generator.netlify.app/:splat  200
/explain/*          https://viralhacks-explain.netlify.app/:splat  200
```

3. Deploy and configure DNS

---

## 📊 Monitoring & Analytics

### Netlify Dashboard

For each site, monitor:
- **Deploys**: Build status and logs
- **Functions**: Invocations and errors
- **Analytics**: Traffic and bandwidth

### Stripe Dashboard

Monitor payments:
- https://dashboard.stripe.com/payments
- Track revenue by product
- Monitor webhook events

---

## 🔄 Updating Your Tools

When you make changes:

1. Commit and push to GitHub:
```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

2. Netlify will **automatically rebuild** all sites (continuous deployment enabled)

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Module not found`
- Check `package.json` exists in tool directory
- Verify base directory is correct

**Error**: `Command not found: npm`
- Netlify auto-detects Node.js from `netlify.toml`
- Check `netlify.toml` exists in tool directory

### Functions Not Working

**Error**: `Function not found`
- Verify `/netlify/functions/` folder exists
- Check Netlify Functions tab to see detected functions

**Error**: `GEMINI_API_KEY is not defined`
- Environment variables not set
- Go to Site settings → Environment variables
- Add missing variables and trigger redeploy

### Payments Failing

**Error**: `Failed to create checkout session`
- Check `STRIPE_SECRET_KEY` is correct
- Verify `STRIPE_PRICE_ID` matches product

**Error**: `Payment completed but content not unlocked`
- Webhook not configured or signing secret wrong
- Check webhook endpoint URL is correct
- Verify `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard

---

## 💰 Revenue Tracking

### Expected Revenue Per Tool

| Tool | Price | Payment Link |
|------|-------|--------------|
| Contract Checker | $4.90 | https://buy.stripe.com/bJedR99ko6UU96t7Ku4Ni09 |
| Image Upscaler | $3.90 | https://buy.stripe.com/14A3cv9ko6UU5Uh9SC4Ni0a |
| PDF2Word | $2.90 | https://buy.stripe.com/bJeeVd8gkbba6Yl1m64Ni0b |
| Script Generator | $3.90 | https://buy.stripe.com/cNieVdcwAenm2I58Oy4Ni0c |
| ExplainThis | $2.90 | https://buy.stripe.com/14A8wP4041AA0zXc0K4Ni0d |

**Total per customer (all 5 tools): $17.50**

### Monthly Projections

| Customers | Revenue |
|-----------|---------|
| 100 | $1,750 |
| 500 | $8,750 |
| 1,000 | $17,500 |
| 5,000 | $87,500 |
| 10,000 | $175,000 |

---

## 🎯 Next Steps

1. ✅ Deploy all 5 tools to Netlify
2. ✅ Configure environment variables
3. ✅ Set up Stripe webhooks
4. ✅ Test each tool end-to-end
5. 🚀 **Start marketing and generating revenue!**

---

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com/
- **Stripe Docs**: https://docs.stripe.com/
- **Gemini API Docs**: https://ai.google.dev/docs

---

## 🎉 You're Ready to Launch!

All tools are production-ready and configured for immediate revenue generation. Just deploy, test, and start marketing!

**Good luck with your launch!** 💰🚀
