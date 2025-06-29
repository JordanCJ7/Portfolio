"use client";

import { useState, useMemo } from 'react';
import type { Project, Category } from '@/types';
import ProjectCard from '@/components/project-card';
import SectionWrapper from '@/components/section-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Flashboard Wiki - Knowledge Base',
    description: 'Introducing Flashboard Wiki: A dynamic web app built with Next.js, TypeScript, Radix UI, Firebase Studio, and Genkit. Designed to offer a comprehensive and interactive resource for everything related to Flashboard mobile keypad application, the platform is optimized for performance, scalability, and user experience.',
    longDescription: 'Key Features:\n- User-friendly Interface: Seamless, responsive design for easy browsing and contribution.\n- Real-time Collaboration: Users can edit and update content dynamically.\n- Comprehensive Wiki: In-depth articles, tutorials, and FAQs covering all Flashboard features.\n- Searchable Content: Fast, efficient, and robust search for quick access to information.\n\nOur goal is to provide an all-in-one hub for Flashboard users, making information and resources more accessible than ever.',
    imageUrl: '/projects/Flashboard.jpeg',
    tags: ['Next.js', 'TypeScript', 'Radix UI', 'Firebase Studio', 'Genkit', 'Real-time Collaboration', 'Wiki Platform'],
    categories: ['Product Management', 'Web Development', 'AI/ML'],
    // projectUrl: '#',
    repoUrl: 'https://github.com/JordanCJ7/FlashBoard-Wiki',
    year: 2025,
    client: 'Flashboard',
    role: 'Full Stack Developer & Product Strategist',
    metrics: {
      users: '2M+ active users',
      improvement: '40% reduction in support tickets',
      engagement: '65% increase in self-service resolution'
    }
  },
  {
    id: '2',
    title: 'FoodieFly - Food Delivery System',
    description: 'Led a university project group to build FoodieFly, a modern, cloud-native food ordering and delivery system built with microservices architecture. It provides a seamless experience for customers to order food, restaurants to manage their menus, and delivery personnel to handle deliveries efficiently.',
    longDescription: 'Key Features:\n- Microservices Architecture: Implemented using Docker and Node.js to ensure scalability and maintainability.\n- User Authentication & Authorization: Utilized JWT tokens for secure user registration and login.\n- Restaurant Management: Enabled restaurants to manage their menus and orders efficiently.\n- Order & Delivery Management: Facilitated seamless order processing and delivery tracking.\n- Payment Integration: Integrated payment gateways for secure transactions.\n- Admin Dashboard: Provided an admin interface for monitoring and managing the system.\n\nTechnologies Used:\n- Frontend: React\n- Backend: Node.js, Express, MongoDB\n- Authentication: JWT, Passport.js\n- Containerization: Docker\n- GitHub',
    imageUrl: 'https://picsum.photos/seed/foodiefly/600/338',
    tags: ['Web Development', 'JavaScript', 'Project Management', 'Microservices', 'Docker', 'Collaboration & Productivity', 'Version Control', 'MERN Stack', 'Team Leadership'],
    categories: ['Web Development', 'System Design', 'Product Management'],
    // projectUrl: '#',
    repoUrl: 'https://github.com/JordanCJ7/FoodieFly',
    year: 2025,
    client: 'SLIIT Academic Project',
    role: 'System Architect & Team Lead (University Project Group Leader)',
    metrics: {
      performance: '99.9% uptime with containerized services',
      userExperience: '85% user satisfaction score',
      delivery: 'Delivered 2 weeks ahead of schedule'
    }
  },
  {
    id: '3',
    title: 'Salon Pabalu: Web-Based Salon Management System',
    description: 'Salon Pabalu, a renowned beauty and wellness center in Mahiyanganaya, partnered with us to develop an advanced, web-based Salon Management System to streamline operations and enhance customer experiences. Built using the MERN stack, the system automates essential processes including user account management, appointment scheduling, inventory tracking, service management, employee management, and customer relationship management.',
    longDescription: 'Key Features:\n- User Account Management: Secure user profiles with role-based access control.\n- Appointment & Scheduling: Online booking with automated reminders and conflict resolution.\n- Service & Product Management: Easy tracking of available services and products, including pricing and inventory.\n- Employee Management: Streamlined leave requests, shift management, and performance tracking.\n- Customer Feedback: Integrated feedback system to improve service quality.\n- Gift Voucher Management: Creation and tracking of customized gift vouchers.\n\nOur system is designed to improve efficiency, reduce errors, and enhance customer satisfaction and operational performance. Salon Pabalu now benefits from a reliable, scalable solution that positions them for future growth and success in the competitive beauty and wellness industry.',
    imageUrl: 'https://picsum.photos/seed/salon/600/338',
    tags: ['Web Development', 'JavaScript', 'Project Management', 'Collaboration & Productivity', 'Version Control', 'MERN Stack', 'Team Leadership', 'Requirements Engineering'],
    categories: ['Web Development', 'Product Management'],
    // projectUrl: '#',
    repoUrl: 'https://github.com/JordanCJ7/ITP-Salon-Pabalu',
    year: 2024,
    client: 'Salon Pabalu',
    role: 'Full Stack Developer & Team Lead (University Project Group Leader)',
    metrics: {
      efficiency: 'Improved operational efficiency and reduced manual errors',
      satisfaction: 'Enhanced customer satisfaction and staff communication'
    }
  },
  {
    id: '4',
    title: 'NobleTrust Insurance Website',
    description: 'Developed user-centric insurance website with focus on conversion optimization and accessibility. Conducted A/B testing on key user flows and improved customer inquiry rates through strategic UX improvements.',
    longDescription: 'Key Features:\n- Conversion Optimization: Implemented A/B testing to refine user flows.\n- Accessibility: Achieved full WCAG compliance for inclusivity.\n- Performance: Optimized for fast load times and high Lighthouse scores.\n\nThe project resulted in a significant increase in customer inquiries and set a new standard for digital accessibility within the organization.',
    imageUrl: '/projects/NobleTrust.png',
    tags: ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'A/B Testing', 'Conversion Optimization'],
    categories: ['Web Development', 'UX Strategy'],
    projectUrl: 'https://jordancj7.github.io/NobleTrust/',
    repoUrl: 'https://github.com/JordanCJ7/NobleTrust',
    year: 2025,
    client: 'NobleTrust Insurance',
    role: 'Frontend Developer & UX Strategist',
    metrics: {
      conversion: '45% increase in inquiry conversions',
      accessibility: '100% WCAG compliance achieved',
      performance: '95+ Lighthouse performance score'
    }
  },
  {
    id: '5',
    title: 'E-Commerce Product Analytics Dashboard',
    description: 'Built a comprehensive analytics dashboard to track user behavior and product performance. Led user research sessions, defined KPIs, and implemented data-driven features that increased conversion rates and improved inventory management decisions.',
    longDescription: 'Key Features:\n- Data Visualization: Interactive charts and graphs for actionable insights.\n- KPI Tracking: Real-time monitoring of key business metrics.\n- User Research: Incorporated feedback to drive feature development.\n\nThis dashboard empowered stakeholders to make informed decisions and improved overall business performance.',
    imageUrl: 'https://picsum.photos/seed/analytics/600/338',
    tags: ['React', 'D3.js', 'Product Analytics', 'User Research', 'KPI Tracking', 'Data Visualization'],
    categories: ['Product Management', 'Data Science', 'Web Development'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2025,
    client: 'E-Commerce Startup',
    role: 'Product Analyst & Frontend Developer',
    metrics: {
      conversion: '32% increase in conversion rate',
      efficiency: '50% faster inventory decisions',
      insights: '15+ actionable user insights identified'
    }
  },
  {
    id: '6',
    title: 'Mobile App User Onboarding Optimization',
    description: 'Redesigned user onboarding flow for a fintech mobile app through extensive user research and A/B testing. Collaborated with design and engineering teams to implement data-driven improvements that significantly reduced user drop-off rates.',
    longDescription: 'Key Features:\n- User Research: Conducted interviews and usability tests to identify pain points.\n- A/B Testing: Validated onboarding improvements with real users.\n- Cross-functional Collaboration: Worked closely with design and engineering for seamless delivery.\n\nThe new onboarding flow led to higher retention and user satisfaction.',
    imageUrl: 'https://picsum.photos/seed/onboarding/600/338',
    tags: ['User Research', 'A/B Testing', 'Mobile UX', 'Product Strategy', 'Cross-functional Leadership'],
    categories: ['Product Management', 'UX Strategy', 'Mobile App'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2025,
    client: 'FinTech Startup',
    role: 'Product Manager',
    metrics: {
      retention: '65% improvement in Day-1 retention',
      completion: '78% onboarding completion rate',
      satisfaction: '4.6/5 user satisfaction score'
    }
  },
  {
    id: '7',
    title: 'Advanced Tic Tac Toe AI Game',
    description: 'Developed a sophisticated Tic Tac Toe game with advanced AI logic using C# and .NET, enhanced by AI-assisted development tools. Utilized GitHub Copilot for efficient algorithm implementation and code optimization, creating multiple difficulty levels and strategic AI decision-making algorithms.',
    longDescription: 'Key Features:\n- Advanced AI: Multiple difficulty levels and strategic gameplay.\n- Efficient Algorithms: Optimized for performance and challenge.\n- AI-Assisted Development: Leveraged GitHub Copilot for rapid prototyping.\n\nThis project demonstrates expertise in game development and AI logic.',
    imageUrl: 'https://picsum.photos/seed/tictactoe/600/338',
    tags: ['C#', '.NET', 'AI Logic', 'GitHub Copilot', 'Game Development', 'Algorithm Design'],
    categories: ['AI/ML', 'Web Development'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2025,
    client: 'Personal Project',
    role: 'AI-Enhanced Solo Developer',
    metrics: {
      complexity: 'Advanced AI with multiple difficulty levels',
      performance: 'Optimized decision-making algorithms',
      satisfaction: 'Engaging user experience with strategic gameplay'
    }
  },
  {
    id: '8',
    title: 'Kotlin Todo Mobile App',
    description: 'Built a feature-rich todo application using Kotlin to demonstrate mobile development fundamentals. Includes task management, local storage, intuitive UI/UX design, and efficient data handling showcasing mobile development capabilities.',
    longDescription: 'Key Features:\n- Task Management: Add, edit, and delete tasks with ease.\n- Local Storage: Persistent data across sessions.\n- Mobile UI/UX: Clean and intuitive design for productivity.\n\nThis project highlights proficiency in Kotlin and Android development best practices.',
    imageUrl: 'https://picsum.photos/seed/todoapp/600/338',
    tags: ['Kotlin', 'Android Development', 'Mobile UI/UX', 'Local Storage'],
    categories: ['Mobile App', 'UX Strategy'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2024,
    client: 'Learning Project',
    role: 'Mobile Developer',
    metrics: {
      functionality: 'Complete CRUD operations',
      performance: 'Smooth mobile experience',
      learning: 'Kotlin fundamentals mastery'
    }
  }
];

const allCategories: Category[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'Product Management', name: 'Product Management' },
  { id: 'Web Development', name: 'Web Development' },
  { id: 'System Design', name: 'System Design' },
  { id: 'UX Strategy', name: 'UX Strategy' },
  { id: 'Mobile App', name: 'Mobile App' },
  { id: 'AI/ML', name: 'AI/ML' },
  { id: 'Data Science', name: 'Data Science' },
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return sampleProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof project.description === 'string' && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory =
        selectedCategory === 'all' || project.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <SectionWrapper
      title="My Projects"
      subtitle="A selection of my recent work. Explore innovative solutions and impactful digital experiences I've helped create."
    >
      <div className="mb-8 md:mb-12 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search projects or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No projects found matching your criteria.</p>
          <Button variant="link" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} className="mt-4">
            Clear Filters
          </Button>
        </div>
      )}
    </SectionWrapper>
  );
}