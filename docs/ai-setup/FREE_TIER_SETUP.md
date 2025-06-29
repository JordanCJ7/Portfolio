# ✅ FREE TIER API KEY SETUP GUIDE

## Step 1: Get Your FREE Google AI API Key

### Option A: Google AI Studio (Recommended - Always Free)
1. **Go to Google AI Studio**: https://aistudio.google.com/
2. **Sign in** with your Google account
3. **Click "Get API key"** in the left sidebar
4. **Click "Create API key"**
5. **Select "Create API key in new project"** (or use existing)
6. **Copy your API key** - starts with `AIza...`

### Option B: Google Cloud Console (More Complex)
1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Enable Generative AI API
4. Create credentials > API Key
5. Copy the API key

## Step 2: Create Environment File

Create `.env.local` in your project root:

```bash
# Google AI API Key (FREE TIER)
GOOGLE_GENAI_API_KEY=AIza_your_actual_key_here

# Rate Limits (Conservative for Free Tier)
GEMINI_RPM_LIMIT=5        # Start conservative
GEMINI_RPD_LIMIT=20       # Can increase later

# Optional: Track usage
NODE_ENV=development
```

## Step 3: Verify Free Tier Status

### ✅ Signs You're on Free Tier:
- API key starts with `AIza...`
- No credit card required
- Created through AI Studio
- Usage shows "Free tier" in console

### ❌ Signs You're on Paid Tier:
- API key from Cloud Console with billing enabled
- Credit card attached to project
- Usage shows charges

## Step 4: Test Your Setup

Run this to test your API key:
```bash
npm run dev
```

Then visit: http://localhost:9002/ai-assistant

## Step 5: Monitor Usage (Stay Free)

### Google AI Studio Dashboard:
- Visit https://aistudio.google.com/
- Check usage in left sidebar
- Monitor requests per day

### Your Current Limits:
- **5 requests per minute** ✅ Very safe
- **20 requests per day** ✅ Very safe
- **Well within free tier** ✅

## 🚨 Important Notes

### Free Tier Confirmation:
- ✅ **Gemini 2.0 Flash**: "Free of charge" for input/output
- ✅ **No credit card needed**
- ✅ **No automatic upgrade**
- ✅ **Perfect for portfolios**

### If You See Costs:
1. Check you're using AI Studio (not Cloud Console)
2. Verify no billing account attached
3. Switch to free tier project
4. Contact support if needed

## 🎯 Next Steps

1. **Create `.env.local`** with your API key
2. **Test the AI assistant**
3. **Monitor usage** (should show $0.00)
4. **Increase limits** if needed (still free)

Your personal AI assistant will cost **$0.00** with proper free tier setup!
