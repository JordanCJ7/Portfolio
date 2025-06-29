# EmailJS Setup Guide - Free Tier Implementation

This guide walks you through setting up EmailJS for the contact form while staying within the free tier limits.

## 📧 EmailJS Free Tier Limits
- **200 emails per month** - Free
- **2 email templates** - Free  
- **1 email service** - Free
- Rate limiting implemented: 10 emails/day, 200/month

## 🚀 Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or use **Custom SMTP**
4. Follow the setup instructions for your chosen service
5. **Save your Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}} - Portfolio Contact from {{from_name}}

Hello Janitha,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
Reply to: {{reply_to}}
```

4. **Save your Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcDEF123`)

### Step 5: Configure Environment Variables
Create or update your `.env` file:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Test the Integration
1. Restart your development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit the form
4. Check your email for the message

## 🛡️ Rate Limiting Features

The implementation includes smart rate limiting to protect your free tier:

- **Daily Limit**: 10 emails per day
- **Monthly Limit**: 200 emails per month  
- **Local Storage**: Tracks usage client-side
- **Graceful Handling**: Shows clear error messages when limits are reached
- **Usage Counter**: Displays remaining quota after successful sends

## 🔧 Template Variables Available

Your EmailJS template can use these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email  
- `{{subject}}` - Message subject
- `{{message}}` - Message content
- `{{to_name}}` - Your name (Janitha Gamage)
- `{{reply_to}}` - Sender's email for replies

## 📊 Monitoring Usage

- Usage is tracked in browser's localStorage
- Counters reset automatically (daily/monthly)
- Form shows helpful error messages when limits reached
- Check browser console for detailed EmailJS logs

## 🚨 Troubleshooting

### Form shows "Configuration Error"
- Check that all environment variables are set
- Restart development server after adding env vars
- Verify EmailJS service/template IDs are correct

### "Failed to Send Message"  
- Check EmailJS dashboard for service status
- Verify email service credentials are still valid
- Check browser console for detailed error messages
- Ensure Gmail/Outlook hasn't revoked app permissions

### Rate Limit Messages
- Wait for daily/monthly reset
- Or temporarily increase limits in the code
- Consider upgrading to EmailJS paid plan if needed

## 💡 Best Practices

1. **Email Service**: Use Gmail with App Passwords for reliability
2. **Template Testing**: Test templates in EmailJS dashboard first
3. **Error Handling**: Monitor browser console during testing  
4. **Backup Plan**: Always provide direct email as fallback
5. **Security**: Never expose service credentials in client code

## 🔄 Migration to Paid Plan

If you exceed free tier limits:
- **Personal Plan**: $15/month for 1,000 emails
- Increase daily/monthly limits in the code
- No code changes needed, just environment config

## ✅ Verification Checklist

- [ ] EmailJS account created and verified
- [ ] Email service configured and tested
- [ ] Email template created with correct variables
- [ ] Environment variables added to `.env`
- [ ] Development server restarted
- [ ] Contact form tested successfully  
- [ ] Email received in your inbox
- [ ] Rate limiting working correctly
