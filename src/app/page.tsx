import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SectionWrapper from '@/components/section-wrapper';
import AnimatedElement from '@/components/animated-element';
import { ArrowRight, Download, Briefcase, Award, Code, Cloud, Target, Bot } from 'lucide-react';

export default function HomePage() {
  return (
    <SectionWrapper className="!py-0 md:!py-0 lg:!py-0 min-h-[calc(100vh-10rem)] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <AnimatedElement className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-foreground leading-tight pb-3">
            Hello, I&apos;m Janitha Gamage
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 text-muted-foreground font-normal">
              Emerging Developer & Product Strategist
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
            A passionate Software Engineering Undergraduate and emerging Developer & Product Strategist seeking internship opportunities. Specializing in <strong>AI-driven development, JavaScript/TypeScript, React, Node.js</strong>, and <strong>cloud technologies (Azure)</strong>, I leverage AI tools like GitHub Copilot to enhance development efficiency and code quality. I've successfully led multiple university project teams using microservices architecture and modern AI-assisted development practices, while managing products serving 2M+ users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="/projects">
                <Briefcase className="mr-2 h-5 w-5" />
                View My Work
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-accent/30 transition-shadow">
              <Link href="/skills">
                <Target className="mr-2 h-5 w-5" />
                Skills & Expertise
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-accent/30 transition-shadow">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
           <Button asChild variant="link" size="lg" className="text-primary hover:text-primary/80 p-0 h-auto mt-2">
              <a href="/resume.pdf" download="Janitha_Gamage_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume (PDF)
              </a>
            </Button>
            
            {/* Skills Preview */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Bot className="h-3 w-3" />
                  AI-Driven Development
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Cloud className="h-3 w-3" />
                  Azure & Docker
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Award className="h-3 w-3" />
                  AZ-900 Ready
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1 py-1 px-3">
                  <Award className="h-3 w-3" />
                  Postman Student Expert
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground text-center md:text-left">
                <strong>Currently Available for Internships</strong> • Full-Stack Development • Product/Project Management
              </p>
            </div>
        </AnimatedElement>

        <AnimatedElement animationClass="animate-fade-in" delay="delay-200" className="relative group">
          <div className="aspect-square rounded-full overflow-hidden shadow-2xl mx-auto max-w-md md:max-w-full border-4 border-primary/30 group-hover:border-primary/70 transition-all duration-300">
            <Image
              src="https://picsum.photos/600/600"
              alt="Janitha Gamage - Profile Picture"
              width={600}
              height={600}
              priority
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
              data-ai-hint="professional portrait"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse group-hover:animate-none"></div>
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 transform rotate-45"></div>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}
