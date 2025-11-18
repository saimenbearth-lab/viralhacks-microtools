# 🚀 Quick Start Guide - Deploy in 30 Minutes

## ✅ What's Already Done

- ✅ Complete monorepo with 5 AI-powered tools
- ✅ Full Stripe integration with products created
- ✅ Google Gemini AI integration
- ✅ SEO optimized with meta tags and JSON-LD
- ✅ Pushed to GitHub: https://github.com/saimenbearth-lab/viralhacks-microtools
- ✅ Netlify configuration files ready
- ✅ All documentation complete

---

## 🎯 Your Mission: Deploy All 5 Tools

**Time required:** 30 minutes (6 minutes per tool)

**What you'll do:**
1. Import each tool from GitHub to Netlify (5 separate sites)
2. Set environment variables for each
3. Configure Stripe webhooks
4. Test and launch!

---

## 📝 Step-by-Step Instructions

### For Each Tool (Repeat 5 Times)

#### 1. Import to Netlify (2 minutes)

1. Go to https://app.netlify.com/
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select: **saimenbearth-lab/viralhacks-microtools**
5. Configure:
   - **Base directory**: `[tool-name]` (see table below)
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `[tool-name]/dist`
6. Click **"Deploy site"**

#### 2. Set Environment Variables (2 minutes)

Go to **Site settings** → **Environment variables** and add:

**For Contract Checker, Image Upscaler, Script Generator, ExplainThis:**
```env
GEMINI_API_KEY = AIzaSyCtEBp2VjXfTyBOFJG1PxAboDDbStEeiOA
STRIPE_SECRET_KEY = [your_stripe_secret_key]
STRIPE_WEBHOOK_SECRET = (leave empty)
STRIPE_PRICE_ID = [see table below]
```

**For PDF2Word (no Gemini needed):**
```env
STRIPE_SECRET_KEY = [your_stripe_secret_key]
STRIPE_WEBHOOK_SECRET = (leave empty)
STRIPE_PRICE_ID = price_1SUlHeH9DqkBzHZud0UkTOqN
```

Then: **Deploys** → **"Trigger deploy"**

#### 3. Configure Webhook (2 minutes)

1. Copy Netlify site URL
2. Go to https://dashboard.stripe.com/webhooks
3. Click **"Add endpoint"**
4. **Endpoint URL**: `[your-site-url]/.netlify/functions/stripeWebhook`
5. **Events**: Select `checkout.session.completed`
6. Copy **Signing secret** (starts with `whsec_...`)
7. Back to Netlify → Update `STRIPE_WEBHOOK_SECRET`
8. **Trigger deploy** again

---

## 📊 Tool Configuration Reference

| # | Tool Name | Base Directory | Price ID | Price |
|---|-----------|----------------|----------|-------|
| 1 | Contract Checker | `contract-checker` | `price_1SUlHDH9DqkBzHZuIM3nJXpq` | $4.90 |
| 2 | Image Upscaler | `image-upscaler` | `price_1SUlHRH9DqkBzHZudOf7BTbM` | $3.90 |
| 3 | PDF2Word | `pdf2word` | `price_1SUlHeH9DqkBzHZud0UkTOqN` | $2.90 |
| 4 | Script Generator | `script-generator` | `price_1SUlHrH9DqkBzHZuofHY6ik0` | $3.90 |
| 5 | ExplainThis | `explain` | `price_1SUlI4H9DqkBzHZuFmmPdJcc` | $2.90 |

---

## ✅ Deployment Checklist

Track your progress:

- [ ] **Tool 1: Contract Checker** - Deployed, variables set, webhook configured
- [ ] **Tool 2: Image Upscaler** - Deployed, variables set, webhook configured
- [ ] **Tool 3: PDF2Word** - Deployed, variables set, webhook configured
- [ ] **Tool 4: Script Generator** - Deployed, variables set, webhook configured
- [ ] **Tool 5: ExplainThis** - Deployed, variables set, webhook configured

---

## 🧪 Testing

For each tool, test with **Stripe test card**:
- Card: `4242 4242 4242 4242`
- Expiry: `12/25`
- CVC: `123`

Verify:
1. Free preview works
2. Payment processes
3. Full content unlocks

---

## 📚 Documentation

- **NETLIFY_DEPLOYMENT.md** - Detailed deployment guide
- **STRIPE_SETUP.md** - All Stripe products and payment links
- **SEO_OPTIMIZATION_SUMMARY.md** - SEO features
- **PROJECT_SUMMARY.md** - Complete project overview

---

## 💰 Revenue Potential

**Total per customer:** $17.50

| Customers | Monthly Revenue |
|-----------|-----------------|
| 100 | $1,750 |
| 500 | $8,750 |
| 1,000 | $17,500 |
| 5,000 | $87,500 |

---

## 🎉 Ready to Launch!

After deploying all 5 tools:
1. ✅ All tools are live
2. ✅ Payments are working
3. ✅ Start marketing!

**Good luck!** 🚀💰
