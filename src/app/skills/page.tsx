"use client";

import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import AnimatedElement from '@/components/animated-element';
import { 
  Code2, 
  Users, 
  Target, 
  GitBranch, 
  Palette,
  BarChart3,
  Bot
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
    title: 'AI-Driven Development',
    icon: <Bot className="h-6 w-6" />,
    skills: [
      { name: 'GitHub Copilot', level: 88, description: 'Advanced AI-assisted coding and productivity enhancement' },
      { name: 'AI Code Generation', level: 82, description: 'Leveraging AI tools for efficient development workflows' },
      { name: 'Machine Learning Integration', level: 70, description: 'Implementing AI features in applications' },
      { name: 'AI-Enhanced Debugging', level: 75, description: 'Using AI tools for code optimization and error detection' },
      { name: 'Prompt Engineering', level: 80, description: 'Effective AI tool interaction and optimization' },
      { name: 'AI Development Workflows', level: 85, description: 'Integrating AI tools into development processes' }
    ]
  },
  {
    title: 'Product Management & Strategy',
    icon: <Target className="h-6 w-6" />,
    skills: [
      { name: 'Product Strategy', level: 72, description: 'Applied in leading university project teams' },
      { name: 'User Research', level: 75, description: 'Led user interview sessions and analysis' },
      { name: 'Data Analysis', level: 70, description: 'KPI tracking and team performance metrics' },
      { name: 'Agile/Scrum', level: 70, description: 'Led sprint planning and team coordination' },
      { name: 'Stakeholder Management', level: 80, description: 'Managed client communication and expectations' },
      { name: 'Requirements Gathering', level: 75, description: 'Led requirement sessions with teams and clients' },
      { name: 'Product Roadmapping', level: 72, description: 'Planned feature delivery timelines' },
      { name: 'Team Organization', level: 85, description: 'Utilized PM tools for efficient project delivery' }
    ]
  },
  {
    title: 'Development & Engineering',
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      { name: 'JavaScript/TypeScript', level: 85, description: 'Advanced proficiency with modern frameworks and ES6+' },
      { name: 'React/Next.js', level: 82, description: 'Building complex responsive web applications' },
      { name: 'Node.js/Express', level: 80, description: 'Backend development, APIs, and microservices' },
      { name: 'C# / .NET', level: 65, description: 'Fundamentals with advanced logic implementation' },
      { name: 'Kotlin', level: 60, description: 'Mobile app development fundamentals' },
      { name: 'Python', level: 75, description: 'Backend development and scripting' },
      { name: 'PHP', level: 60, description: 'Web applications and basic CMS' },
      { name: 'MongoDB/MySQL', level: 75, description: 'Database design and queries' }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: <GitBranch className="h-6 w-6" />,
    skills: [
      { name: 'API Design & Testing', level: 82, description: 'RESTful APIs and Postman expertise' },
      { name: 'Git/GitHub', level: 85, description: 'Version control and team collaboration' },
      { name: 'Microsoft Azure', level: 80, description: 'AZ-900 certified level, cloud deployment and services' },
      { name: 'Docker & Containerization', level: 75, description: 'Microservices deployment for food delivery system' },
      { name: 'Microservices Architecture', level: 72, description: 'Designed and implemented complex food delivery platform' },
      { name: 'CI/CD Pipelines', level: 58, description: 'Learning automated deployment workflows' }
    ]
  },
  {
    title: 'UX & Design Strategy',
    icon: <Palette className="h-6 w-6" />,
    skills: [
      { name: 'User Experience Design', level: 68, description: 'Basic user journey and wireframing' },
      { name: 'Accessibility (WCAG)', level: 70, description: 'Understanding inclusive design' },
      { name: 'A/B Testing', level: 60, description: 'Basic conversion optimization' },
      { name: 'Design Systems', level: 58, description: 'Component consistency concepts' },
      { name: 'Responsive Design', level: 78, description: 'Mobile-first development approach' }
    ]
  },
  {
    title: 'Data & Analytics',
    icon: <BarChart3 className="h-6 w-6" />,
    skills: [
      { name: 'Analytics Implementation', level: 62, description: 'Basic user behavior tracking' },
      { name: 'KPI Definition', level: 65, description: 'Understanding success metrics' },
      { name: 'User Feedback Analysis', level: 70, description: 'Processing user insights' },
      { name: 'Performance Monitoring', level: 60, description: 'Basic application metrics' },
      { name: 'Conversion Optimization', level: 58, description: 'Learning funnel analysis' }
    ]
  },
  {
    title: 'Leadership & Team Management',
    icon: <Users className="h-6 w-6" />,
    skills: [
      { name: 'Team Leadership', level: 82, description: 'Led multiple university project teams successfully' },
      { name: 'Project Management', level: 80, description: 'Used PM tools for on-time delivery' },
      { name: 'Technical Communication', level: 85, description: 'Clear documentation and team guidance' },
      { name: 'Problem-Solving Leadership', level: 78, description: 'Guided teammates through challenging situations' },
      { name: 'Cross-functional Collaboration', level: 80, description: 'Coordinated diverse team members effectively' },
      { name: 'Mentoring & Guidance', level: 75, description: 'Supported team members through difficulties' }
    ]
  }
];

export default function SkillsPage() {
  return (
    <SectionWrapper
      title="Skills & Expertise"
      subtitle="Advanced technical and leadership skills with a focus on AI-driven development. Specialized in leveraging AI tools like GitHub Copilot to enhance productivity, code quality, and development efficiency."
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
    </SectionWrapper>
  );
}
