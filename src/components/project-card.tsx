import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github } from 'lucide-react';
import AnimatedElement from './animated-element';

interface ProjectCardProps {
  project: Project;
  index: number; 
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const delayClass = `delay-${index * 100}`; // Stagger animation

  return (
    <AnimatedElement animationClass="animate-fade-in-up" delay={delayClass}>
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card">
        <CardHeader className="p-0 relative">
          <div className="aspect-video overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={338} // 16:9 aspect ratio
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
              data-ai-hint="technology project"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl lg:text-2xl font-semibold mb-2 text-foreground">
            {project.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex space-x-2">
            {project.projectUrl && (
              <Button asChild variant="default" size="sm" className="shadow-md hover:shadow-primary/40">
                <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant="outline" size="sm" className="shadow-sm">
                <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Source
                </Link>
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{project.year}</p>
        </CardFooter>
      </Card>
    </AnimatedElement>
  );
}
