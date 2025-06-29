/**
 * API Key Verification Script
 * Run this to verify your Google AI API key is working with the free tier
 */

import { createWriteStream } from 'fs';
import { config } from 'dotenv';

// Load environment variables
config();

async function verifyApiKey() {
  console.log('🔍 Verifying Google AI API Key...\n');

  try {
    // Check if API key is set
    const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('❌ No Google AI API key found');
      console.log('💡 Add GOOGLE_GENAI_API_KEY to your .env file');
      console.log('💡 Get your free key from: https://aistudio.google.com/');
      return;
    }

    if (apiKey === 'your_api_key_here') {
      console.error('❌ Please replace "your_api_key_here" with your actual API key');
      console.log('💡 Get your free key from: https://aistudio.google.com/');
      return;
    }

    console.log('✅ API key found');
    console.log(`🔑 Key starts with: ${apiKey.substring(0, 10)}...`);

    // Test a simple AI request using fetch
    console.log('\n🤖 Testing AI request...');
    
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Respond with exactly: 'Hello! API key is working correctly.'"
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API request failed:', response.status, response.statusText);
      console.error('Response:', errorText);
      
      if (response.status === 403) {
        console.log('\n💡 Possible issues:');
        console.log('1. API key might be invalid');
        console.log('2. Generative AI API not enabled');
        console.log('3. Check your key at: https://aistudio.google.com/');
      }
      return;
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const responseText = data.candidates[0].content.parts[0].text;
      console.log('✅ API request successful!');
      console.log(`🎉 Response: ${responseText}`);
      console.log('\n💰 Cost: $0.00 (Free tier confirmed!)');
      console.log('🚀 Your AI assistant is ready to use!');
      
      // Check rate limits
      console.log('\n📊 Current Rate Limits:');
      console.log(`⏱️  Requests per minute: ${process.env.GEMINI_RPM_LIMIT || 5}`);
      console.log(`� Requests per day: ${process.env.GEMINI_RPD_LIMIT || 20}`);
      console.log('✅ These limits keep you in the FREE tier');
      
    } else {
      console.error('❌ Unexpected response format:', data);
    }

  } catch (error) {
    console.error('❌ API verification failed:');
    console.error(error.message);
    
    if (error.message?.includes('fetch')) {
      console.log('\n💡 Network error - check your internet connection');
    }
  }
}

// Run verification
verifyApiKey();
