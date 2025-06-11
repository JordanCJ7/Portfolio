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
    title: 'NobleTrust Insurance Website',
    description: 'A fully responsive static website for NobleTrust Insurance, showcasing insurance services with a modern, user-friendly interface and smooth page transitions.',
    imageUrl: 'https://picsum.photos/seed/nobletrust/600/338', // You can replace this with the actual image URL or company logo
    tags: ['HTML5', 'CSS3', 'Sass', 'JavaScript', 'Node.js'],
    categories: ['Web Development', 'Corporate Website'],
    projectUrl: 'https://jordancj7.github.io/NobleTrust/',  // Actual deployed site URL
    repoUrl: 'https://github.com/JordanCJ7/NobleTrust',  // Actual GitHub repo
    year: 2025,
    client: 'NobleTrust Insurance',
    role: 'Lead Frontend Developer'
  },
  {
    id: '2',
    title: 'AI Content Generator',
    description: 'A SaaS application leveraging AI to generate marketing copy and blog posts for businesses.',
    imageUrl: 'https://picsum.photos/seed/project2/600/338',
    tags: ['Next.js', 'Python', 'FastAPI', 'OpenAI API', 'Prisma'],
    categories: ['Web Development', 'AI/ML'],
    projectUrl: '#',
    year: 2024,
    client: 'Creative AI Co.',
    role: 'Full Stack Developer'
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'A cross-platform mobile app for tracking workouts, setting goals, and connecting with friends.',
    imageUrl: 'https://picsum.photos/seed/project3/600/338',
    tags: ['React Native', 'Firebase', 'GraphQL', 'TypeScript'],
    categories: ['Mobile App', 'Fitness'],
    repoUrl: '#',
    year: 2022,
    client: 'FitLife Apps',
    role: 'Mobile Developer'
  },
  {
    id: '4',
    title: 'Data Visualization Dashboard',
    description: 'An interactive dashboard for visualizing complex datasets, helping businesses make informed decisions.',
    imageUrl: 'https://picsum.photos/seed/project4/600/338',
    tags: ['D3.js', 'React', 'Redux', 'Express.js'],
    categories: ['Web Development', 'Data Science'],
    projectUrl: '#',
    year: 2023,
    client: 'Insightful Data Corp',
    role: 'Frontend Developer'
  },
];

const allCategories: Category[] = [
  { id: 'all', name: 'All Categories' },
  { id: 'Web Development', name: 'Web Development' },
  { id: 'Mobile App', name: 'Mobile App' },
  { id: 'AI/ML', name: 'AI/ML' },
  { id: 'E-commerce', name: 'E-commerce' },
  { id: 'Data Science', name: 'Data Science' },
  { id: 'Fitness', name: 'Fitness' },
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
