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
    title: 'Flashboard Knowledge Base',
    description: 'Led product strategy and development for a comprehensive knowledge base serving 2M+ mobile keyboard users. Improved user onboarding and reduced support tickets by 40% through data-driven content strategy.',
    imageUrl: 'https://picsum.photos/seed/flashboard/600/338',
    tags: ['Next.js', 'TypeScript', 'Product Strategy', 'User Research', 'Content Strategy'],
    categories: ['Product Management', 'Web Development'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2024,
    client: 'Flashboard Mobile',
    role: 'Product Developer & Strategist',
    metrics: {
      users: '2M+ active users',
      improvement: '40% reduction in support tickets',
      engagement: '65% increase in self-service resolution'
    }
  },
  {
    id: '2', 
    title: 'FoodieFly - Food Delivery Platform',
    description: 'Architected and delivered a cloud-native microservices platform with focus on user experience optimization. Conducted user research to improve order completion rates and delivery efficiency.',
    imageUrl: 'https://picsum.photos/seed/foodiefly/600/338',
    tags: ['Microservices', 'Cloud Architecture', 'User Experience', 'Agile', 'Stakeholder Management'],
    categories: ['Product Management', 'System Design'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2025,
    client: 'SLIIT Academic Project',
    role: 'Technical Product Manager',
    metrics: {
      performance: '99.9% uptime achieved',
      userExperience: '85% user satisfaction score',
      delivery: 'Delivered 2 weeks ahead of schedule'
    }
  },
  {
    id: '3',
    title: 'Salon Pabalu Management System',
    description: 'Led cross-functional team to design and develop a comprehensive salon management solution. Managed stakeholder requirements, conducted user interviews, and implemented data-driven features that increased operational efficiency.',
    imageUrl: 'https://picsum.photos/seed/salon/600/338',
    tags: ['MERN Stack', 'Requirements Gathering', 'User Interviews', 'Process Optimization'],
    categories: ['Product Management', 'Web Development'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2024,
    client: 'Salon Pabalu',
    role: 'Product Owner & Developer',
    metrics: {
      efficiency: '30% improvement in booking efficiency',
      revenue: '25% increase in customer retention',
      automation: 'Automated 80% of manual processes'
    }
  },
  {
    id: '4',
    title: 'NobleTrust Insurance Website',
    description: 'Developed user-centric insurance website with focus on conversion optimization and accessibility. Conducted A/B testing on key user flows and improved customer inquiry rates through strategic UX improvements.',
    imageUrl: 'https://picsum.photos/seed/nobletrust/600/338',
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
    imageUrl: 'https://picsum.photos/seed/analytics/600/338',
    tags: ['React', 'D3.js', 'Product Analytics', 'User Research', 'KPI Tracking', 'Data Visualization'],
    categories: ['Product Management', 'Data Science', 'Web Development'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2024,
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
    imageUrl: 'https://picsum.photos/seed/onboarding/600/338',
    tags: ['User Research', 'A/B Testing', 'Mobile UX', 'Product Strategy', 'Cross-functional Leadership'],
    categories: ['Product Management', 'UX Strategy', 'Mobile App'],
    projectUrl: '#',
    repoUrl: '#',
    year: 2024,
    client: 'FinTech Startup',
    role: 'Product Manager',
    metrics: {
      retention: '65% improvement in Day-1 retention',
      completion: '78% onboarding completion rate',
      satisfaction: '4.6/5 user satisfaction score'
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
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
