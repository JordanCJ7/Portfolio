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
# Janitha CJ - Comprehensive Personal Portfolio Knowledge Base

## Personal Information
- Name: Janitha Gamage (Full: Janitha Suranjana Lakshan Gamage)
- Location: Colombo, Sri Lanka
- Current Role: Software Engineering Undergraduate & Emerging Developer/Product Strategist
- Education: BSc (Hons) in Information Technology – Software Engineering at SLIIT
- Expected Graduation: 2026
- GitHub: https://github.com/JordanCJ7
- LinkedIn: https://www.linkedin.com/in/janithagamage/
- Twitter: https://x.com/JanithaGamage01
- Email: janithagamage2001@example.com
- Phone: +94 743 288 572

## Current Availability & Career Goals
- **Status**: Actively seeking internship opportunities
- **Available For**: Software Development, Product Management, Technical Product Roles
- **Preferred Roles**: Full-Stack Developer, Product Strategist, AI-Enhanced Developer
- **Remote Work**: Open to remote opportunities worldwide
- **Specialization**: AI-driven development workflows and modern web technologies
- **Career Objective**: Contributing to innovative projects while learning from experienced professionals

## Education Background

### University Education
- **Institution**: Sri Lanka Institute of Information Technology (SLIIT)
- **Degree**: BSc (Hons) in Information Technology – Software Engineering
- **Status**: Current student (Expected graduation: 2026)
- **Specialization**: AI-driven development, full-stack technologies, and product management methodologies
- **Focus Areas**: Modern web development, AI integration, cloud computing, microservices architecture

### High School Education
- **Institution**: Richmond College, Galle
- **Stream**: Advanced Level - Biological Science Stream
- **Subjects**: Biology, Physics, Chemistry, General English
- **Test Scores**: GIT: A, GIQ: 86.66, General English: A
- **Graduation**: 2020

## Core Skills & Technologies (with proficiency levels)

### AI-Driven Development (Advanced)
- **GitHub Copilot**: 88% - Advanced AI-assisted coding and productivity enhancement
- **AI Code Generation**: 82% - Leveraging AI tools for efficient development workflows
- **Machine Learning Integration**: 70% - Implementing AI features in applications
- **AI-Enhanced Debugging**: 75% - Using AI tools for code optimization and error detection
- **Prompt Engineering**: 80% - Effective AI tool interaction and optimization
- **AI Development Workflows**: 85% - Integrating AI tools into development processes

### Frontend Development (Expert)
- **JavaScript/TypeScript**: 85% - Advanced proficiency with modern frameworks and ES6+
- **React/Next.js**: 82% - Building complex responsive web applications
- **HTML5/CSS3**: 85% - Modern web standards and responsive design
- **Material-UI**: 80% - Component library expertise
- **Radix UI**: 78% - Advanced component system knowledge
- **Bootstrap**: 82% - Responsive framework proficiency
- **Tailwind CSS**: 85% - Utility-first CSS framework

### Backend Development (Advanced)
- **Node.js/Express**: 80% - Backend development, APIs, and microservices
- **PHP**: 60% - Web applications and basic CMS
- **C# / .NET**: 65% - Fundamentals with advanced logic implementation (.NET 9.0)
- **Python**: 75% - Backend development and scripting
- **API Design & Testing**: 82% - RESTful APIs and Postman expertise

### Databases (Advanced)
- **MongoDB**: 75% - NoSQL database design and queries
- **MySQL**: 75% - Relational database design and optimization
- **Firebase**: 70% - Real-time database and cloud services

### Cloud & DevOps (Advanced)
- **Microsoft Azure**: 80% - AZ-900 certified level, cloud deployment and services
- **Docker & Containerization**: 75% - Microservices deployment for complex systems
- **Git/GitHub**: 85% - Version control and team collaboration
- **Microservices Architecture**: 72% - Designed and implemented complex delivery platforms
- **CI/CD Pipelines**: 58% - Learning automated deployment workflows
- **Web Hosting**: 78% - Production deployment and management

### Mobile & Desktop Development
- **Kotlin**: 60% - Android development fundamentals
- **WPF**: 70% - Windows desktop applications with MVVM
- **Tkinter**: 72% - Python GUI development
- **Android Development**: 65% - Mobile app development basics

### Product Management & Strategy (Intermediate-Advanced)
- **Product Strategy**: 72% - Applied in leading university project teams
- **User Research**: 75% - Led user interview sessions and analysis
- **Data Analysis**: 70% - KPI tracking and team performance metrics
- **Agile/Scrum**: 70% - Led sprint planning and team coordination
- **Stakeholder Management**: 80% - Managed client communication and expectations
- **Requirements Gathering**: 75% - Led requirement sessions with teams and clients
- **Product Roadmapping**: 72% - Planned feature delivery timelines
- **Team Organization**: 85% - Utilized PM tools for efficient project delivery

### Leadership & Team Management (Expert)
- **Team Leadership**: 82% - Led multiple university project teams successfully
- **Project Management**: 80% - Used PM tools for on-time delivery
- **Technical Communication**: 85% - Clear documentation and team guidance
- **Problem-Solving Leadership**: 78% - Guided teammates through challenging situations
- **Cross-functional Collaboration**: 80% - Coordinated diverse team members effectively
- **Mentoring & Guidance**: 75% - Supported team members through difficulties

### UX & Design Strategy
- **User Experience Design**: 68% - Basic user journey and wireframing
- **Accessibility (WCAG)**: 70% - Understanding inclusive design principles
- **A/B Testing**: 60% - Basic conversion optimization
- **Design Systems**: 58% - Component consistency concepts
- **Responsive Design**: 78% - Mobile-first development approach

### Testing & Quality Assurance
- **Jest**: 75% - JavaScript testing framework
- **React Testing Library**: 70% - Component testing
- **API Testing**: 80% - Postman and automated testing

## Major Projects (Detailed)

### 1. Flashboard Wiki - Knowledge Base Platform (2025)
- **Role**: Full Stack Developer & Product Strategist
- **Client**: Flashboard (Mobile Keypad Application)
- **Team**: Led development team
- **Technologies**: Next.js, TypeScript, Radix UI, Firebase Studio, Genkit
- **Architecture**: Dynamic web app with real-time collaboration features
- **Key Features**:
  - User-friendly interface with seamless, responsive design
  - Real-time collaboration for dynamic content editing
  - Comprehensive wiki with in-depth articles, tutorials, and FAQs
  - Searchable content with fast, efficient, and robust search functionality
- **Impact**: 
  - 2M+ active users
  - 40% reduction in support tickets
  - 65% increase in self-service resolution
- **Technical Achievements**: Successfully scaled to handle millions of users while maintaining performance
- **Repository**: https://github.com/JordanCJ7/FlashBoard-Wiki

### 2. FoodieFly - Food Delivery System (2025)
- **Role**: System Architect & Team Lead (University Project)
- **Client**: SLIIT Academic Project
- **Team Size**: Led a group of 8+ students
- **Technologies**: MERN Stack (MongoDB, Express.js, React, Node.js), Docker, JWT, Microservices
- **Architecture**: Cloud-native food ordering system with microservices architecture
- **Key Features**:
  - Microservices architecture implemented using Docker and Node.js
  - User authentication & authorization with JWT tokens
  - Restaurant management system for menu and order management
  - Order & delivery management with real-time tracking
  - Payment integration with secure transaction processing
  - Admin dashboard for system monitoring and management
- **Impact**: 
  - 99.9% uptime with containerized services
  - 85% user satisfaction score
  - Delivered 2 weeks ahead of schedule
- **Leadership Highlights**: Successfully coordinated team members, managed project timeline, and delivered complex system architecture
- **Repository**: https://github.com/JordanCJ7/FoodieFly

### 3. NobleTrust - Insurance Website (2025)
- **Role**: Frontend Developer & UX Strategist
- **Client**: NobleTrust Insurance
- **Technologies**: HTML5, CSS3, Sass, JavaScript
- **Focus**: User-centric design with conversion optimization and accessibility
- **Key Features**:
  - Conversion optimization through A/B testing on key user flows
  - Full WCAG compliance for accessibility
  - Performance optimization for fast load times and high Lighthouse scores
- **Impact**: 
  - 45% increase in inquiry conversions
  - 100% WCAG compliance achieved
  - 95+ Lighthouse performance score
- **UX Strategy**: Conducted user research and implemented data-driven design improvements
- **Live Demo**: https://jordancj7.github.io/NobleTrust/
- **Repository**: https://github.com/JordanCJ7/NobleTrust

### 4. Dry Drop - Laundry Service Web App (2025)
- **Role**: Full Stack Developer & Product Strategist
- **Client**: Self-employed
- **Technologies**: PHP, MySQL, HTML5, CSS3, Bootstrap 5, Chart.js
- **Architecture**: Production-ready laundry management system
- **Key Features**:
  - Mobile-first, responsive layout with Bootstrap 5
  - Clean service catalog with pricing and scheduling
  - Admin & Customer dashboards with real-time status updates
  - Smart environment detection for seamless deployment
  - Rating & feedback system for service quality insights
  - Secure user authentication with role-based access
  - Reports with visual analytics using Chart.js
- **Impact**: 
  - Zero-config deployment capability
  - Real-time analytics dashboard
  - Auto-creates DB tables and manages foreign keys
  - Real-time status updates and feedback system
- **Business Features**: Payment methods (Cash + Online), order placement, pickup scheduling
- **Live Demo**: https://drydrop.infinityfreeapp.com/
- **Repository**: https://github.com/JordanCJ7/Dry-Drop

### 5. Tic-Tac-Toe Game - WPF Desktop App (2025)
- **Role**: Sole Developer & UI/UX Designer
- **Client**: Self-employed
- **Technologies**: C#, WPF, .NET 9.0, MVVM architecture
- **Key Features**:
  - Player vs Player and Player vs AI modes
  - Multiple board sizes: 3x3, 4x4, 5x5, 6x6
  - Customizable win conditions per grid size
  - Classic and Timed game modes with real-time move timers
  - Three AI difficulty levels: Easy, Medium, Hard
  - Responsive WPF UI with post-game statistics
- **Technical Achievements**: 
  - Modern WPF UI with real-time stats
  - Advanced AI logic with multiple difficulty levels
  - Extensible architecture for future features
- **Planned Features**: Multiplayer, leaderboards, themes
- **Repository**: https://github.com/JordanCJ7/Tic-Tac-Toe-Game-PC

### 6. EarthScope - Country Explorer Web App (2025)
- **Role**: Frontend Developer
- **Client**: SLIIT Academic Project
- **Technologies**: React.js, Material UI, REST Countries API, Jest, React Testing Library
- **Key Features**:
  - Browse and search countries by name
  - Filter countries by region or language
  - Detailed country information display (flag, population, region, capital, languages)
  - Responsive design for all devices
  - Robust testing implementation
- **Impact**: 
  - Responsive design for all devices
  - Comprehensive testing coverage
  - Efficient API integration
- **Live Demo**: https://earth-scope.vercel.app/
- **Repository**: https://github.com/JordanCJ7/EarthScope

### 7. Salon Pabalu Management System (2024)
- **Role**: Full Stack Developer & Team Lead (University Project)
- **Client**: Salon Pabalu (Beauty and wellness center in Mahiyanganaya)
- **Team**: Led university project team
- **Technologies**: MERN Stack, Role-based access control
- **Key Features**:
  - User account management with secure profiles and role-based access
  - Appointment & scheduling with online booking and automated reminders
  - Service & product management with pricing and inventory tracking
  - Employee management with leave requests and shift management
  - Customer feedback system for service quality improvement
  - Gift voucher management and tracking
- **Impact**: 
  - Improved operational efficiency
  - Enhanced customer satisfaction
  - Reduced manual errors
  - Better staff communication
- **Repository**: https://github.com/JordanCJ7/ITP-Salon-Pabalu

### 8. GIF Generator - Python Desktop App (2025)
- **Role**: Full Stack Developer
- **Client**: Self-employed
- **Technologies**: Python, Tkinter, Pillow (no external dependencies)
- **Key Features**:
  - Scrollable image preview grid with hover effects and remove buttons
  - Real-time thumbnail previews with queue numbering
  - Fully customizable frame duration and output resolution
  - Clean, modern GUI styling with color themes
  - Smooth incremental image selection with live updates
  - Input validation and error handling for all fields
- **Technical Achievements**: 
  - Beginner-friendly, no-dependency tool
  - Modern, scrollable, and interactive interface
  - Live previews and comprehensive error handling
- **Repository**: https://github.com/JordanCJ7/GIF-Generator

## Professional Certifications & Achievements

### Completed Certifications (2025)
1. **Postman API Fundamentals Student Expert**
   - Provider: Postman
   - Skills: API design, testing, documentation, and collaboration
   - Credential: https://api.badgr.io/public/assertions/bTETPxnZT7u-hDzCuaUN4A

2. **Collaborate with others with Markdown and GitHub Pages**
   - Provider: Microsoft Learn
   - Skills: Collaborative workflows, documentation, publishing
   - Credential: https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/8ZQFQ57W

3. **AI Skills Fest Challenges** (Multiple completed)
   - Architecture Recipes for AI-Powered Applications
   - Create agentic AI solutions with Azure AI Foundry
   - Treasure Hunt for AI Skills

4. **Microsoft Azure Fundamentals Series** (Completed modules)
   - Describe cloud concepts
   - Describe Azure architecture and services
   - Describe Azure management and governance

### Scheduled Certifications
- **Microsoft Azure Fundamentals AZ-900**: Scheduled for July 2025

## Work Philosophy & Approach
- **User-Centric Design**: Focus on conversion optimization and user experience
- **Clean Code Advocate**: Strong believer in maintainable, well-documented code
- **Team Leadership**: Proven experience leading both individual projects and team initiatives
- **Production-Ready Solutions**: Emphasis on real-world deployment and scalable architecture
- **Data-Driven Decisions**: Using measurable impact metrics to guide development choices
- **AI-Enhanced Productivity**: Leveraging modern AI tools to improve development efficiency
- **Continuous Learning**: Staying current with emerging technologies and best practices

## Professional Interests & Future Goals
- **Primary Focus**: Full-stack development with AI integration
- **Product Strategy**: Combining technical skills with product management
- **AI/ML Integration**: Building intelligent applications and workflows
- **Desktop and Mobile Development**: Cross-platform application development
- **System Architecture**: Microservices and scalable system design
- **User Experience Optimization**: Creating intuitive and accessible interfaces
- **Cloud Technologies**: Azure and containerization expertise
- **Team Leadership**: Managing and mentoring development teams

## Internship Readiness & Professional Skills
- Expert proficiency in GitHub Copilot and AI development tools
- AI-enhanced productivity in coding and debugging workflows
- Proven team leadership across multiple university projects
- Experience with project management tools and methodologies
- Track record of on-time project delivery with AI-enhanced efficiency
- Strong mentoring and problem-solving capabilities
- Excellent team coordination and communication skills
- Ready to lead or contribute effectively in professional settings and AI-forward development environments

## Technical Specializations
- **Microservices Architecture**: Designed and deployed complex food delivery systems
- **Real-time Applications**: Built collaborative platforms with live updates
- **Performance Optimization**: Achieved 95+ Lighthouse scores and high availability
- **Accessibility Compliance**: 100% WCAG compliance implementation
- **API Development**: RESTful services and third-party integrations
- **Database Design**: Both SQL and NoSQL database architecture
- **Containerization**: Docker deployment and orchestration
- **Cloud Deployment**: Azure services and scalable hosting solutions

## Project Leadership Experience
- **Team Sizes**: Successfully led teams of 8+ members
- **Project Scope**: Managed complex systems serving 2M+ users
- **Delivery Track Record**: Consistently delivered projects ahead of schedule
- **Stakeholder Management**: Handled client communication and expectation management
- **Technical Mentoring**: Guided team members through challenging technical problems
- **Process Implementation**: Established efficient development workflows and PM tools
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
  prompt: `You are Janitha CJ's personal AI assistant. Your role is to answer questions about Janitha's background, projects, skills, and experience based on the comprehensive knowledge base provided.

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
