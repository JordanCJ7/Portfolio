"use client";

import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedElement from '@/components/animated-element';
import { 
  Code2, 
  Users, 
  TrendingUp, 
  Target, 
  GitBranch, 
  Database, 
  Smartphone, 
  Palette,
  BarChart3,
  Lightbulb
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Array<{
    name: string;
    level: number;
    description?: string;
  }>;
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Product Management',
    icon: <Target className="h-6 w-6" />,
    skills: [
      { name: 'Product Strategy', level: 85, description: 'Roadmap planning and vision setting' },
      { name: 'User Research', level: 80, description: 'User interviews and behavior analysis' },
      { name: 'Data Analysis', level: 75, description: 'KPI definition and metrics tracking' },
      { name: 'Agile/Scrum', level: 90, description: 'Sprint planning and team coordination' },
      { name: 'Stakeholder Management', level: 85, description: 'Cross-functional communication' },
      { name: 'Requirements Gathering', level: 88, description: 'Technical and business requirements' },
      { name: 'Product Roadmapping', level: 82, description: 'Feature prioritization and planning' },
      { name: 'Market Research', level: 78, description: 'Competitive analysis and positioning' }
    ]
  },
  {
    title: 'Development & Engineering',
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      { name: 'JavaScript/TypeScript', level: 90, description: 'Modern ES6+ and type safety' },
      { name: 'React/Next.js', level: 85, description: 'Component architecture and SSR' },
      { name: 'Node.js/Express', level: 80, description: 'API development and microservices' },
      { name: 'Python', level: 75, description: 'Backend development and automation' },
      { name: 'PHP', level: 70, description: 'Web applications and CMS development' },
      { name: 'MongoDB/MySQL', level: 78, description: 'Database design and optimization' }
    ]
  },
  {
    title: 'API & DevOps',
    icon: <GitBranch className="h-6 w-6" />,
    skills: [
      { name: 'API Design & Testing', level: 88, description: 'RESTful APIs and Postman expertise' },
      { name: 'Git/GitHub', level: 90, description: 'Version control and collaboration' },
      { name: 'Microsoft Azure', level: 75, description: 'Cloud deployment and services' },
      { name: 'CI/CD Pipelines', level: 70, description: 'Automated testing and deployment' },
      { name: 'Docker', level: 65, description: 'Containerization and orchestration' }
    ]
  },
  {
    title: 'UX & Design Strategy',
    icon: <Palette className="h-6 w-6" />,
    skills: [
      { name: 'User Experience Design', level: 80, description: 'User journey and wireframing' },
      { name: 'Accessibility (WCAG)', level: 85, description: 'Inclusive design principles' },
      { name: 'A/B Testing', level: 75, description: 'Conversion optimization' },
      { name: 'Design Systems', level: 70, description: 'Component libraries and consistency' },
      { name: 'Responsive Design', level: 88, description: 'Mobile-first development' }
    ]
  },
  {
    title: 'Data & Analytics',
    icon: <BarChart3 className="h-6 w-6" />,
    skills: [
      { name: 'Analytics Implementation', level: 75, description: 'User behavior tracking' },
      { name: 'KPI Definition', level: 80, description: 'Success metrics and OKRs' },
      { name: 'User Feedback Analysis', level: 85, description: 'Qualitative data insights' },
      { name: 'Performance Monitoring', level: 78, description: 'Application health metrics' },
      { name: 'Conversion Optimization', level: 82, description: 'Funnel analysis and improvement' }
    ]
  },
  {
    title: 'Leadership & Collaboration',
    icon: <Users className="h-6 w-6" />,
    skills: [
      { name: 'Cross-functional Leadership', level: 85, description: 'Team coordination and mentoring' },
      { name: 'Technical Communication', level: 90, description: 'Documentation and knowledge sharing' },
      { name: 'Project Management', level: 88, description: 'Timeline and resource planning' },
      { name: 'Public Speaking', level: 75, description: 'Presentations and stakeholder updates' },
      { name: 'Conflict Resolution', level: 80, description: 'Team dynamics and problem solving' }
    ]
  }
];

export default function SkillsPage() {
  return (
    <SectionWrapper
      title="Skills & Expertise"
      subtitle="A comprehensive overview of my technical and product management capabilities, developed through hands-on experience with 2M+ users and diverse project portfolios."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {skillCategories.map((category, categoryIndex) => (
          <AnimatedElement 
            key={category.title}
            animationClass="animate-fade-in-up" 
            delay={`delay-${categoryIndex * 100}`}
          >
            <Card className="h-full shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {skill.level}%
                      </Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    {skill.description && (
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedElement>
        ))}
      </div>
      
      {/* Additional certifications section */}
      <AnimatedElement animationClass="animate-fade-in" delay="delay-600" className="mt-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Lightbulb className="h-6 w-6" />
              </div>
              Certifications & Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Current Certifications</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Postman API Fundamentals Student Expert</li>
                  <li>• Microsoft Azure Fundamentals</li>
                  <li>• GitHub Collaboration with Markdown</li>
                  <li>• AI Skills Fest Challenge Completion</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Continuous Learning</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Product Management Methodologies</li>
                  <li>• Advanced React Patterns</li>
                  <li>• Cloud Architecture Design</li>
                  <li>• User Research Techniques</li>
                  <li>• Product Analytics & Growth Metrics</li>
                  <li>• Design Thinking & Customer Journey Mapping</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedElement>
    </SectionWrapper>
  );
}
