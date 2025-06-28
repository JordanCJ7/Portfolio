import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Github, TrendingUp } from 'lucide-react';
import AnimatedElement from './animated-element';
import ExpandableText from '@/components/ui/expandable-text';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  index: number; 
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const delayClass = `delay-${index * 100}`; // Stagger animation

  return (
    <AnimatedElement animationClass="animate-fade-in-up" delay={delayClass}>
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card cursor-pointer group">
        <CardHeader className="p-0 relative">
          <div className="aspect-video overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]" onClick={() => setDialogOpen(true)}>
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={338}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
              data-ai-hint="technology project"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow">
          <CardTitle
            className="text-xl lg:text-2xl font-semibold mb-2 text-foreground group-hover:text-primary transition-all duration-300 cursor-pointer hover:translate-x-1"
            onClick={() => setDialogOpen(true)}
          >
            {project.title}
          </CardTitle>
          {project.role && (
            <p className="text-sm text-primary font-medium mb-2">{project.role}</p>
          )}
          <CardDescription className="text-muted-foreground mb-4">
            <ExpandableText
              text={project.description}
              lines={3}
              onReadMoreClick={(e) => {
                e.stopPropagation();
                setDialogOpen(true);
              }}
            />
          </CardDescription>
          
          {project.metrics && (
            <div className="mb-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center">
                <TrendingUp className="mr-1 h-3 w-3" />
                Impact & Results
              </p>
              <div className="space-y-1">
                {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                  <p key={key} className="text-xs text-foreground">
                    <span className="font-medium">•</span> {value}
                  </p>
                ))}
              </div>
            </div>
          )}
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
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="mb-2">{project.description}</div>
                {project.longDescription && (
                  <pre className="whitespace-pre-wrap text-sm mt-2">{project.longDescription}</pre>
                )}
                {project.metrics && (
                  <div className="mt-4">
                    <strong>Impact & Results:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <li key={key} className="text-xs text-foreground">{value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </AnimatedElement>
  );
}
