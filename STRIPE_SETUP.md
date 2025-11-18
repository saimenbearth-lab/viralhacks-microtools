# Stripe Products & Payment Links

All 5 products have been created in your Stripe account with payment links ready to use.

## Products Created

### 1. AI Contract Checker – Full Report
- **Price**: $4.90 USD
- **Product ID**: `prod_TRea8bJkdsbwxk`
- **Price ID**: `price_1SUlHDH9DqkBzHZuIM3nJXpq`
- **Payment Link**: https://buy.stripe.com/bJedR99ko6UU96t7Ku4Ni09
- **Description**: Full AI-powered contract analysis with risk detection, clause highlighting, and downloadable PDF summary

### 2. AI Image Upscaler – HD Download
- **Price**: $3.90 USD
- **Product ID**: `prod_TReas7sMaRec3u`
- **Price ID**: `price_1SUlHRH9DqkBzHZudOf7BTbM`
- **Payment Link**: https://buy.stripe.com/14A3cv9ko6UU5Uh9SC4Ni0a
- **Description**: Full HD upscaled and enhanced image with no watermark

### 3. PDF2Word Ultra – DOCX Export
- **Price**: $2.90 USD
- **Product ID**: `prod_TReaiJl91QXGWl`
- **Price ID**: `price_1SUlHeH9DqkBzHZud0UkTOqN`
- **Payment Link**: https://buy.stripe.com/bJeeVd8gkbba6Yl1m64Ni0b
- **Description**: Convert PDF to editable Word document with preserved layout

### 4. Social Script Generator – Full Pack
- **Price**: $3.90 USD
- **Product ID**: `prod_TReaGJIGnzM6mF`
- **Price ID**: `price_1SUlHrH9DqkBzHZuofHY6ik0`
- **Payment Link**: https://buy.stripe.com/cNieVdcwAenm2I58Oy4Ni0c
- **Description**: 10 viral-ready TikTok/Reels/Shorts scripts with hooks, CTAs, and hashtags

### 5. ExplainThis AI – Full Explanation
- **Price**: $2.90 USD
- **Product ID**: `prod_TReb3XPhMx7I0l`
- **Price ID**: `price_1SUlI4H9DqkBzHZuFmmPdJcc`
- **Payment Link**: https://buy.stripe.com/14A8wP4041AA0zXc0K4Ni0d
- **Description**: Full plain-language explanation with bullet-point breakdown and downloadable summary

## Next Steps for Netlify Deployment

For each tool, you need to set these environment variables in Netlify:

### Contract Checker
```env
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=price_1SUlHDH9DqkBzHZuIM3nJXpq
```

### Image Upscaler
```env
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=price_1SUlHRH9DqkBzHZudOf7BTbM
```

### PDF2Word
```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=price_1SUlHeH9DqkBzHZud0UkTOqN
```

### Script Generator
```env
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=price_1SUlHrH9DqkBzHZuofHY6ik0
```

### ExplainThis
```env
GEMINI_API_KEY=your_gemini_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PRICE_ID=price_1SUlI4H9DqkBzHZuFmmPdJcc
```

## Webhook Configuration

After deploying each tool to Netlify, configure the webhook in Stripe:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-netlify-site.netlify.app/.netlify/functions/stripeWebhook`
4. Select event: `checkout.session.completed`
5. Copy the signing secret and add to `STRIPE_WEBHOOK_SECRET`

## Testing Payment Links

You can test each payment link immediately:

- Use Stripe test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

## Revenue Potential

Total revenue per customer using all 5 tools: **$17.50**

Monthly revenue projections:
- 100 customers: $1,750
- 500 customers: $8,750
- 1,000 customers: $17,500
- 5,000 customers: $87,500

**All products are live and ready to accept payments!** 🚀
