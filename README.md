# Janitha Gamage Portfolio: AI-Enhanced Next.js Portfolio

A modern, high-performance personal portfolio website showcasing AI-driven development expertise. Built with Next.js 15, TypeScript, Tailwind CSS, and featuring an intelligent AI assistant powered by Google Gemini.

## 🎯 Project Overview

This is a comprehensive personal portfolio showcasing Janitha Gamage, a Software Engineering student and emerging developer specializing in AI-enhanced development workflows. The portfolio demonstrates modern web development practices, performance optimization, and innovative AI integration.

### 🌟 Key Features

- **🤖 AI Personal Assistant** - Intelligent chatbot with comprehensive knowledge base about skills, projects, and experience
- **⚡ Performance Monitoring** - Real-time Core Web Vitals tracking and optimization
- **🔄 Smart Navigation** - Advanced prefetching strategies and loading states
- **📱 Responsive Design** - Mobile-first approach with modern animations
- **🎨 Modern UI/UX** - Dark theme with ShadCN UI components and smooth transitions
- **🚀 Optimized Performance** - Sub-2s loading times with advanced caching strategies

## 🏗️ Architecture & Tech Stack

### 🛠️ Core Technologies
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (100%)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Integration:** Google Gemini via Genkit
- **Animations:** Framer Motion + CSS animations
- **Performance:** Custom monitoring with Web Vitals
- **Database:** Firebase (for AI flows)
- **Icons:** Lucide React

### 📂 Project Structure

```
Portfolio/
├── 📁 src/
│   ├── 🤖 ai/                    # AI Integration
│   │   ├── dev.ts                  # Genkit development server
│   │   ├── genkit.ts               # AI configuration
│   │   └── flows/
│   │       ├── personal-chat.ts    # Personal AI assistant
│   │       └── refine-description.ts # Text refinement
│   │
│   ├── 📱 app/                   # Next.js App Router
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Homepage
│   │   ├── ai-assistant/           # AI chat interface
│   │   ├── contact/                # Contact form
│   │   ├── education/              # Education & certifications
│   │   ├── projects/               # Project showcase
│   │   └── skills/                 # Skills overview
│   │
│   ├── 🧩 components/            # Reusable Components
│   │   ├── ui/                     # ShadCN UI components
│   │   ├── layout/                 # Header, footer
│   │   ├── animated-element.tsx    # Scroll animations
│   │   ├── chat-widget.tsx         # AI chat widget
│   │   ├── performance-dashboard.tsx # Dev performance monitoring
│   │   └── project-card.tsx        # Project display cards
│   │
│   ├── 🎯 contexts/              # React Contexts
│   │   └── NavigationContext.tsx   # Smart navigation system
│   │
│   ├── 📊 lib/                   # Utilities & Performance
│   │   ├── performance.ts          # Performance monitoring
│   │   └── utils.ts                # Helper functions
│   │
│   └── 🛡️ services/              # API Services
│       └── rate-limiter.ts         # AI API rate limiting
│
├── 📁 public/                   # Static Assets
│   ├── 🖼️ projects/              # Project screenshots
│   ├── 🏆 certs/                 # Certification images
│   ├── 🏢 logos/                 # Institution logos
│   └── 📄 resume.pdf             # Downloadable resume
│
└── 📁 docs/                     # Documentation
    ├── 🤖 ai-setup/              # AI configuration guides
    ├── 🔍 PERFORMANCE_MONITORING.md
    ├── 🎨 LOADING_BUFFER_SYSTEM.md
    └── 📋 KNOWLEDGE_BASE_ENHANCEMENT.md
```

## 🤖 AI Personal Assistant

The portfolio features an advanced AI assistant powered by Google Gemini with a comprehensive knowledge base:

### 🧠 Knowledge Base Contents
- **Personal Information**: Education, certifications, contact details
- **Technical Skills**: 85% JavaScript/TypeScript, 82% React/Next.js, 80% Azure, etc.
- **8 Major Projects**: From 2M+ user platforms to desktop applications
- **Leadership Experience**: Led teams of 8+ members, 99.9% uptime systems
- **Professional Metrics**: Conversion improvements, performance achievements
- **Certifications**: Postman API Expert, Microsoft Learn modules, Azure AZ-900 prep

### 💬 AI Capabilities
- Answers technical questions about skills and proficiency levels
- Provides detailed project information with metrics and impact
- Shares educational background and certification progress
- Discusses leadership experience and team management
- Available via integrated chat widget on all pages

### 🔒 Rate Limiting & Cost Management
- Smart rate limiting for Google Gemini free tier
- 5 requests/minute, 20 requests/day (configurable)
- Graceful error handling with user-friendly messages
- Zero cost operation within free tier limits

## 🚀 Performance Features

### ⚡ Performance Monitoring System
- **Real-time Core Web Vitals**: LCP, FID, CLS tracking
- **Navigation Performance**: Route change timing and optimization
- **Smart Prefetching**: Immediate, hover, and idle prefetch strategies
- **Development Dashboard**: Visual performance metrics (dev mode only)

### 🎯 Performance Metrics
- **Loading Speed**: <2s page load times
- **Lighthouse Scores**: 95+ performance score
- **Core Web Vitals**: All metrics in green zone
- **Route Changes**: <300ms navigation times

### 🔄 Smart Navigation System
- **Prefetch Strategies**: 
  - Immediate: `/`, `/projects` (critical pages)
  - Hover: `/skills`, `/education`, `/contact`
  - Idle: `/ai-assistant` (secondary features)
- **Loading States**: Smooth progress bars and overlays
- **Performance Tracking**: Automatic route timing and optimization

## 🎨 Modern UI/UX Features

### 🖌️ Design System
- **Dark Theme**: Professional dark mode with accent colors
- **ShadCN UI**: Consistent, accessible component library
- **Responsive Design**: Mobile-first with smooth breakpoints
- **Smooth Animations**: Scroll-triggered and micro-interactions

### 📱 Loading Buffer System
- **Progress Bar**: Slim top progress indicator
- **Loading Overlay**: Detailed progress for slower operations
- **Smart Timing**: Minimum loading times prevent flickering
- **Multiple Types**: Bar, spinner, and overlay options

### 🎯 User Experience
- **Accessibility**: WCAG compliant with screen reader support
- **Performance**: Optimized images, lazy loading, code splitting
- **Navigation**: Smart prefetching and instant route transitions
- **Feedback**: Toast notifications and loading states

## 📋 Portfolio Highlights

### 👨‍💻 Janitha Gamage Profile
- **Current Status**: Software Engineering student at SLIIT (Expected 2026)
- **Availability**: Actively seeking internship opportunities
- **Specialization**: AI-driven development, full-stack technologies
- **Location**: Colombo, Sri Lanka
- **Contact**: janithagamage2001@example.com, +94 743 288 572

### 🏆 Key Achievements
- **2M+ Users**: Led Flashboard Wiki platform serving millions
- **Team Leadership**: Successfully managed 8+ member development teams
- **Performance**: 99.9% uptime, 45% conversion improvements
- **AI Integration**: 88% GitHub Copilot proficiency, AI-enhanced workflows
- **Certifications**: Postman API Expert, Azure fundamentals completed

### 🛠️ Technical Expertise
- **Frontend**: React/Next.js (82%), TypeScript (85%), Tailwind CSS (85%)
- **Backend**: Node.js/Express (80%), PHP (60%), Python (75%)
- **Cloud**: Microsoft Azure (80%), Docker (75%), Microservices (72%)
- **AI Tools**: GitHub Copilot (88%), AI Code Generation (82%)
- **Databases**: MongoDB (75%), MySQL (75%)

### 📚 Featured Projects
1. **Flashboard Wiki** - Knowledge base serving 2M+ users
2. **FoodieFly** - Microservices food delivery platform
3. **NobleTrust** - Insurance website with 45% conversion increase
4. **Dry Drop** - Full-stack laundry management system
5. **EarthScope** - Country explorer web application
6. **Salon Pabalu** - Team-led business management system

## 🛠️ Setup and Installation

### 📋 Prerequisites
- Node.js 18+ and npm
- Google AI API key (free tier available)
- Git for version control

### ⚙️ Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JordanCJ7/Portfolio.git
   cd Portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create `.env` file:
   ```env
   # Required for AI assistant features
   GOOGLE_API_KEY=your_google_ai_api_key_here
   
   # Required for contact form functionality
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   
   # Optional: Rate limiting (defaults provided)
   GEMINI_RPM_LIMIT=5    # Requests per minute
   GEMINI_RPD_LIMIT=20   # Requests per day
   ```
   
   **Setup Instructions:**
   - AI Assistant: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Contact Form: Follow the [EmailJS Setup Guide](./docs/EMAILJS_SETUP.md) for free tier configuration

### 🚀 Development

1. **Start Genkit AI Server** (Required for AI features)
   ```bash
   npm run genkit:dev
   # or for auto-reload: npm run genkit:watch
   ```

2. **Start Next.js Development Server**
   ```bash
   npm run dev
   # Runs on http://localhost:9002
   ```

3. **Performance Monitoring**
   - Open browser developer tools
   - Performance dashboard available in dev mode (top-right corner)
   - Monitor Core Web Vitals and navigation timing

### 📊 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack
npm run genkit:dev       # Start AI/Genkit development server
npm run genkit:watch     # Auto-reload Genkit server

# Production
npm run build            # Build for production
npm run start            # Start production server
npm run build:analyze    # Analyze bundle size

# Quality & Testing
npm run lint             # ESLint code checking
npm run typecheck        # TypeScript type checking
npm run verify-api       # Verify Google AI API key

# Performance
npm run perf:audit       # Lighthouse performance audit
npm run perf:dev         # Start dev + run audit
```

## � Documentation

### 📚 Comprehensive Guides
- **[AI Setup Guide](./docs/ai-setup/FREE_TIER_SETUP.md)** - Step-by-step AI configuration
- **[AI Cost Guide](./docs/ai-setup/AI_COST_GUIDE.md)** - Zero-cost usage strategies
- **[Performance Monitoring](./docs/PERFORMANCE_MONITORING.md)** - Performance optimization
- **[Loading Buffer System](./docs/LOADING_BUFFER_SYSTEM.md)** - UX loading states
- **[Knowledge Base Enhancement](./docs/KNOWLEDGE_BASE_ENHANCEMENT.md)** - AI capabilities

### 🎯 Quick Start Links
- New to AI features? → [Free Tier Setup](./docs/ai-setup/FREE_TIER_SETUP.md)
- Want to understand costs? → [AI Cost Guide](./docs/ai-setup/AI_COST_GUIDE.md)
- Developing locally? → [Ollama Analysis](./docs/ai-setup/OLLAMA_ANALYSIS.md)
- Performance optimization? → [Performance Guide](./docs/PERFORMANCE_MONITORING.md)

## 🔧 Customization

### 🎨 Styling & Theming
- **Tailwind Config**: Modify `tailwind.config.ts`
- **Color Scheme**: Update CSS variables in `app/globals.css`
- **Components**: Customize ShadCN UI components in `components/ui/`

### 🤖 AI Assistant Customization
- **Knowledge Base**: Update `src/ai/flows/personal-chat.ts`
- **Rate Limits**: Modify environment variables
- **Chat Interface**: Customize `components/chat-widget.tsx`

### ⚡ Performance Tuning
- **Prefetch Strategy**: Adjust in `contexts/NavigationContext.tsx`
- **Loading Times**: Configure in loading buffer components
- **Monitoring**: Enable/disable performance dashboard

## 🚀 Deployment

### 🌐 Production Build

```bash
# Build optimized production bundle
npm run build

# Start production server
npm run start
```

### ☁️ Deployment Platforms
- **Vercel**: Automatic deployments with GitHub integration
- **Netlify**: JAMstack deployment with serverless functions
- **Firebase Hosting**: Google Cloud integration for AI features
- **Custom Server**: Docker containerization available

### 🔒 Environment Variables (Production)
```env
GOOGLE_API_KEY=production_api_key
GEMINI_RPM_LIMIT=60      # Adjust based on usage
GEMINI_RPD_LIMIT=1000    # Adjust based on usage
NODE_ENV=production
```

## 📈 Performance Optimization

### 🎯 Core Web Vitals Targets
- **First Contentful Paint (FCP)**: <1.8s
- **Largest Contentful Paint (LCP)**: <2.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **First Input Delay (FID)**: <100ms

### ⚡ Optimization Features
- **Image Optimization**: Next.js Image component with WebP
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: `npm run build:analyze`
- **Performance Monitoring**: Real-time metrics in development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📋 Development Guidelines
1. Follow TypeScript best practices
2. Maintain performance standards
3. Test AI features thoroughly
4. Update documentation for new features
5. Ensure accessibility compliance

## 📄 License

This project is open-source and available under the MIT License.

---

## 🎯 About This Portfolio

This portfolio represents the culmination of modern web development practices, AI integration, and performance optimization. It showcases not just projects and skills, but also demonstrates proficiency with cutting-edge technologies and development workflows.

**Built with ❤️ by Janitha Gamage** - A passionate developer ready to contribute to innovative projects and learn from experienced professionals.


