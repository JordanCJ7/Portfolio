# Janitha Gamage Portfolio: Modern Next.js Portfolio with AI

Janitha Gamage Portfolio is a sleek, modern, and AI-enhanced personal portfolio website template. Built with Next.js 15 (App Router), Tailwind CSS, ShadCN UI, and Genkit for AI-powered copywriting assistance. It's designed to help developers and creatives showcase their work, skills, and personality in a professional and engaging way.

## Project Overview

This project provides a ready-to-use portfolio website with several key sections:

*   **Homepage:** A captivating hero section to introduce yourself.
*   **Projects Page:** A filterable and searchable gallery to showcase your work.
*   **AI Copywriting Assistant:** A tool leveraging Genkit and Google's Gemini model to help refine project descriptions or other text.
*   **Contact Page:** A form for visitors to get in touch.

The application emphasizes modern web development practices, including server components, responsive design, and a focus on user experience with subtle animations and a clean dark-mode aesthetic.

## Workspace Tree

Here's a simplified overview of the project's structure:

```
.
├── .env                # Environment variables (GOOGLE_API_KEY, rate limits)
├── .vscode/            # VSCode specific settings
├── components.json     # ShadCN UI configuration
├── next.config.ts      # Next.js configuration
├── package.json        # Project dependencies and scripts
├── public/             # Static assets (e.g., images - though none are committed here)
├── src/
│   ├── ai/
│   │   ├── dev.ts            # Genkit development server entry point
│   │   ├── flows/
│   │   │   └── refine-description.ts # Genkit flow for AI copywriting
│   │   └── genkit.ts         # Genkit global configuration
│   ├── app/                # Next.js App Router (pages and layouts)
│   │   ├── (pages)/        # Route groups for pages
│   │   │   ├── ai-assistant/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   └── page.tsx      # Homepage
│   │   ├── globals.css     # Global styles and ShadCN theme variables
│   │   └── layout.tsx      # Root layout
│   ├── components/
│   │   ├── layout/         # Header, Footer components
│   │   ├── ui/             # ShadCN UI components (Button, Card, Input, etc.)
│   │   ├── animated-element.tsx # Component for scroll-triggered animations
│   │   ├── project-card.tsx   # Card component for displaying projects
│   │   └── section-wrapper.tsx # Wrapper for consistent section styling
│   ├── hooks/
│   │   ├── use-mobile.tsx    # Hook to detect mobile view
│   │   └── use-toast.ts      # Hook for toast notifications
│   ├── lib/
│   │   └── utils.ts        # Utility functions (e.g., cn for Tailwind class merging)
│   ├── services/
│   │   └── rate-limiter.ts # Service for API rate limiting
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Technologies Used

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** ShadCN UI
*   **AI Integration:** Genkit with Google AI (Gemini model)
*   **Form Handling:** React Hook Form
*   **Schema Validation:** Zod
*   **Icons:** Lucide React
*   **Linting/Formatting:** ESLint, Prettier (implied via Next.js standards)
*   **Package Manager:** npm

## Features

*   **Modern UI/UX:** Clean, responsive design with a default dark theme.
*   **Homepage:** Engaging hero section with calls to action.
*   **Project Showcase:**
    *   Grid display of projects.
    *   Search functionality by title, description, or tags.
    *   Filtering by project category.
    *   Individual project cards with image, title, description, tags, and links.
*   **AI Copywriting Assistant:**
    *   Uses Genkit to connect to Google's Gemini model.
    *   Refines user-provided text based on desired tone.
    *   Implemented rate limiting (RPM & RPD) to manage API usage within free tier limits.
    *   Toast notifications for success and error states (including rate limit messages).
*   **Contact Page:**
    *   Functional contact form (currently simulates submission).
    *   Displays contact information and availability status.
*   **Reusable Components:** Leverages ShadCN UI for a consistent and professional look.
*   **Animations:** Subtle scroll-triggered animations for enhanced user experience.
*   **Optimized Images:** Uses `next/image` for image optimization.
*   **Server Components & Actions:** Built with modern Next.js patterns.
*   **Environment Variable Management:** For API keys and configurable settings.
*   **Clear Navigation:** Header with links and mobile-friendly sheet menu.
*   **Footer:** Social media links and copyright information.

## Setup and Installation

Follow these steps to get the project up and running on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/your-username/portfolio-pro.git # Replace with your repo URL
    cd portfolio-pro
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the root of the project by copying the example (if one exists) or creating it from scratch. Add the following variables:

    ```env
    # Required for Genkit AI features
    GOOGLE_API_KEY=your_google_ai_api_key_here

    # Optional: Rate Limiting for AI Assistant (defaults are low for testing)
    # Consult Google AI documentation for actual free tier limits (e.g., Gemini API might be 60 RPM)
    GEMINI_RPM_LIMIT=5  # Requests Per Minute
    GEMINI_RPD_LIMIT=20 # Requests Per Day
    ```
    *   You can obtain a `GOOGLE_API_KEY` from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the Genkit Development Server:**
    The AI features require a separate Genkit development server. Open a new terminal window and run:
    ```bash
    npm run genkit:dev
    ```
    Or, for automatic reloading on changes to AI flow files:
    ```bash
    npm run genkit:watch
    ```
    This server typically runs on `http://localhost:3400` by default.

5.  **Run the Next.js Development Server:**
    In another terminal window, start the Next.js application:
    ```bash
    npm run dev
    ```
    This will usually start the application on `http://localhost:9002` (as per `package.json`).

6.  **Open in Browser:**
    Open your web browser and navigate to `http://localhost:9002` (or the port specified in your terminal).

You should now have the Janitha Gamage Portfolio application running locally.

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) folder:

### 🤖 **AI Setup & Configuration**
- **[AI Cost Guide](./docs/ai-setup/AI_COST_GUIDE.md)** - Zero-cost AI usage with Google Gemini free tier
- **[Free Tier Setup](./docs/ai-setup/FREE_TIER_SETUP.md)** - Step-by-step API key configuration
- **[Ollama Analysis](./docs/ai-setup/OLLAMA_ANALYSIS.md)** - Local development with Ollama vs cloud deployment

### 🎯 **Project Documentation**
- **[Knowledge Base Enhancement](./docs/KNOWLEDGE_BASE_ENHANCEMENT.md)** - AI assistant capabilities and improvements
- **[Project Blueprint](./docs/blueprint.md)** - Original design guidelines and specifications

### 📋 **Quick Start Links**
- New to the AI features? Start with [Free Tier Setup](./docs/ai-setup/FREE_TIER_SETUP.md)
- Want to understand costs? Read the [AI Cost Guide](./docs/ai-setup/AI_COST_GUIDE.md)
- Developing locally? Check [Ollama Analysis](./docs/ai-setup/OLLAMA_ANALYSIS.md)

## Building for Production

To build the application for production:
```bash
npm run build
```
Then, to start the production server:
```bash
npm run start
```
Ensure your environment variables are correctly set up in your production environment. The Genkit flows would typically be deployed as part of your backend infrastructure (e.g., Cloud Functions, Cloud Run) for a production setup. The `genkit:dev` server is for local development.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## License

This project is open-source and available under the MIT License.
```