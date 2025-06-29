# AI Usage Monitoring

## Set up Google Cloud Console
1. Go to Google Cloud Console
2. Navigate to your Gemini API project
3. Check "APIs & Services" > "Quotas" 
4. Monitor usage in "Billing" section

## Environment Variables to Add
Create a `.env.local` file with:

```bash
# Rate Limiting (adjust as needed)
GEMINI_RPM_LIMIT=5        # Requests per minute
GEMINI_RPD_LIMIT=20       # Requests per day

# Google AI API Key
GOOGLE_GENAI_API_KEY=your_api_key_here

# Optional: Budget alerts
MONTHLY_BUDGET_LIMIT=10   # Stop at $10/month
```

## Current Protection Level: MAXIMUM
- Your current limits are very conservative
- Risk of unexpected charges: VERY LOW
- Suitable for: Personal portfolio with moderate traffic

## Cost Estimates
- Current setup: $0.50-$2/month
- With 10x traffic: $5-$20/month
- Enterprise level: $50-$100/month

## 🆓 ZERO COST OPTIONS - CONFIRMED!

### ✅ Google Gemini 2.0 Flash (Your Current Model)
**COMPLETELY FREE TIER:**
- ✅ **Input/Output**: Free of charge
- ✅ **Context caching**: Free of charge  
- ✅ **Image generation**: Free of charge
- ✅ **Google Search grounding**: Free up to 500 requests/day
- ✅ **Live API**: Free of charge
- ✅ **Storage**: Free up to 1M tokens per hour

**Rate Limits (FREE TIER):**
You're using way LESS than the free limits!
- Your limit: 5 requests/minute ✅ 
- Your limit: 20 requests/day ✅
- Google's free tier is MUCH higher than this

### ✅ Alternative Free Options

**Option 1: Increase Your Free Usage**
- You can safely increase to 50+ requests/day
- Still 100% FREE with Gemini 2.0 Flash

**Option 2: Ollama (Local & Free Forever)**
- Run AI models on your computer
- Zero API costs, works offline
- Models: Llama 3.2, Phi-3, Gemma

**Option 3: Static Q&A (Zero Infrastructure Cost)**
- Pre-written answers to common questions
- Simple search functionality
- No AI calls needed

## Current Setup Analysis
Your rate limiter is set to:
- 5 RPM (well within FREE limits)
- 20 RPD (well within FREE limits)

**You should be in the FREE tier!**

## 💡 RECOMMENDATION: Stay 100% FREE

**Your current setup is PERFECT for zero cost:**

1. **✅ Gemini 2.0 Flash** - Completely free
2. **✅ Conservative rate limits** - Well within free tier  
3. **✅ Personal portfolio use** - Exactly what free tier is for
4. **✅ No credit card required** - True free tier

## 🔧 Optional: Increase Free Usage

Want more requests while staying free? Update your rate limiter:

```typescript
// In rate-limiter.ts - still 100% FREE
const RPM_LIMIT = parseInt(process.env.GEMINI_RPM_LIMIT || '15', 10); // Up from 5
const RPD_LIMIT = parseInt(process.env.GEMINI_RPD_LIMIT || '100', 10); // Up from 20
```

## 🚀 Zero-Cost Alternatives

If you want to eliminate even API dependencies:

### Option A: Ollama (Recommended for Privacy)
```bash
# Install Ollama
winget install Ollama.Ollama

# Download a model
ollama pull llama3.2:1b

# Use locally - no internet needed
```

### Option B: Static Knowledge Base
Replace AI calls with pre-written responses:
```typescript
const KNOWLEDGE_BASE = {
  "projects": "Janitha has built 12+ projects including...",
  "skills": "Janitha specializes in React, Next.js, TypeScript...",
  "experience": "Janitha has 3+ years of experience..."
};
```
