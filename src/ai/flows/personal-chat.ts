'use server';

/**
 * @fileOverview Personal AI chatbot that answers questions about Janitha's portfolio, projects, and experience.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { rateLimiterService } from '@/services/rate-limiter';

const PersonalChatInputSchema = z.object({
  message: z.string().describe('The user\'s question or message about Janitha'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string()
  })).optional().describe('Previous conversation context'),
});
export type PersonalChatInput = z.infer<typeof PersonalChatInputSchema>;

const PersonalChatOutputSchema = z.object({
  response: z.string().describe('AI assistant response about Janitha\'s background, projects, or skills'),
  isRelevant: z.boolean().describe('Whether the question was relevant to Janitha\'s portfolio'),
});
export type PersonalChatOutput = z.infer<typeof PersonalChatOutputSchema>;

// Knowledge base about Janitha
const JANITHA_KNOWLEDGE_BASE = `
# Janitha CJ - Personal Portfolio Knowledge Base

## Personal Information
- Name: Janitha CJ
- Location: Sri Lanka
- Current Role: Full Stack Developer & Product Strategist
- Education: SLIIT (Sri Lanka Institute of Information Technology)
- GitHub: https://github.com/JordanCJ7

## Core Skills & Technologies
- Frontend: React.js, Next.js, TypeScript, HTML5, CSS3, Material-UI, Radix UI, Bootstrap
- Backend: Node.js, Express.js, PHP, C#, .NET 9.0
- Mobile: Kotlin, Android Development
- Desktop: WPF, Tkinter, Python
- Databases: MongoDB, MySQL, Firebase
- DevOps: Docker, Git, Deployment, Web Hosting
- AI/ML: Genkit, Firebase Studio, GitHub Copilot
- Testing: Jest, React Testing Library
- Languages: JavaScript, TypeScript, Python, C#, PHP, Kotlin

## Major Projects

### 1. Flashboard Wiki (2025)
- Role: Full Stack Developer & Product Strategist
- Client: Flashboard
- Tech: Next.js, TypeScript, Radix UI, Firebase Studio, Genkit
- Impact: 2M+ active users, 40% reduction in support tickets, 65% increase in self-service resolution
- Description: Dynamic knowledge base platform with real-time collaboration

### 2. FoodieFly - Food Delivery System (2025)
- Role: System Architect & Team Lead (University Project)
- Client: SLIIT Academic Project
- Tech: MERN Stack, Docker, JWT, Microservices
- Impact: 99.9% uptime, 85% user satisfaction, delivered 2 weeks ahead of schedule
- Description: Cloud-native food ordering system with microservices architecture

### 3. NobleTrust - Insurance Website (2025)
- Role: Frontend Developer & UX Strategist
- Client: NobleTrust Insurance
- Tech: HTML5, CSS3, Sass, JavaScript
- Impact: 45% increase in inquiry conversions, 100% WCAG compliance, 95+ Lighthouse score
- Description: User-centric insurance website with conversion optimization

### 4. Dry Drop - Laundry Service Web App (2025)
- Role: Full Stack Developer & Product Strategist
- Client: Self-employed
- Tech: PHP, MySQL, HTML5, CSS3, Bootstrap 5, Chart.js
- Impact: Zero-config deployment, real-time analytics dashboard
- Description: Production-ready laundry management system

### 5. Tic-Tac-Toe Game - WPF Desktop App (2025)
- Role: Sole Developer & UI/UX Designer
- Client: Self-employed
- Tech: C#, WPF, .NET 9.0, MVVM
- Features: Multiple board sizes, AI difficulty levels, real-time stats
- Description: Modern desktop game with advanced AI and polished UI

### 6. EarthScope - Country Explorer (2025)
- Role: Frontend Developer
- Client: SLIIT Academic Project
- Tech: React.js, Material UI, REST Countries API, Jest
- Features: Country search, filtering, responsive design
- Description: Modern web app for exploring countries worldwide

### 7. Salon Pabalu Management System (2024)
- Role: Full Stack Developer & Team Lead (University Project)
- Client: Salon Pabalu
- Tech: MERN Stack, Role-based access control
- Impact: Improved operational efficiency, enhanced customer satisfaction
- Description: Comprehensive salon management system

### 8. GIF Generator - Python Desktop App (2025)
- Role: Full Stack Developer
- Client: Self-employed
- Tech: Python, Tkinter, Pillow
- Features: Real-time thumbnails, customizable settings, no dependencies
- Description: Interactive desktop app for creating animated GIFs

## Achievements & Certifications
- Microsoft Azure Fundamentals (AZ-900)
- AI Skills Fest Challenges (Multiple)
- Postman API Fundamentals Student Expert
- GitHub and Markdown collaboration certified

## Work Philosophy
- Focus on user-centric design and conversion optimization
- Strong believer in clean, maintainable code
- Experience with both individual projects and team leadership
- Emphasis on real-world deployment and production-ready solutions
- Data-driven approach with measurable impact metrics

## Interests
- Full-stack development
- Product strategy and management
- AI/ML integration
- Desktop and mobile application development
- System architecture and microservices
- User experience optimization
`;

export async function personalChat(input: PersonalChatInput): Promise<PersonalChatOutput> {
  // Check rate limit before calling the flow
  const rateLimitCheck = await rateLimiterService.checkRateLimit(); 
  if (!rateLimitCheck.allowed) {
    throw new Error(rateLimitCheck.message);
  }
  return personalChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalChatPrompt',
  input: {schema: PersonalChatInputSchema},
  output: {schema: PersonalChatOutputSchema},
  prompt: `You are Janitha CJ's personal AI assistant. Your role is to answer questions about Janitha's background, projects, skills, and experience based on the knowledge base provided.

KNOWLEDGE BASE:
${JANITHA_KNOWLEDGE_BASE}

INSTRUCTIONS:
- Only answer questions related to Janitha CJ, his projects, skills, experience, or career
- Be conversational, friendly, and professional
- Use specific details from the knowledge base when possible
- If asked about unrelated topics, politely redirect to Janitha-related questions
- Include relevant metrics and achievements when discussing projects
- Be enthusiastic about Janitha's work and accomplishments
- If you don't have specific information, say so honestly but offer related information you do have

CONVERSATION HISTORY:
{{#each conversationHistory}}
{{role}}: {{content}}
{{/each}}

USER MESSAGE: {{{message}}}

Respond as Janitha's knowledgeable AI assistant.`,
});

const personalChatFlow = ai.defineFlow(
  {
    name: 'personalChatFlow',
    inputSchema: PersonalChatInputSchema,
    outputSchema: PersonalChatOutputSchema,
  },
  async input => {
    const result = await prompt(input);
    return result.output!;
  }
);
