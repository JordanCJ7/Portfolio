import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SectionWrapper from '@/components/section-wrapper';
import AnimatedElement from '@/components/animated-element';
import { ArrowRight, Download, Briefcase } from 'lucide-react';

export default function HomePage() {
  return (
    <SectionWrapper className="!py-0 md:!py-0 lg:!py-0 min-h-[calc(100vh-10rem)] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <AnimatedElement className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-foreground">
            Hello, I&apos;m Your Name
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
            A passionate and creative Full Stack Developer with expertise in building modern, responsive, and user-friendly web applications. I thrive on transforming complex ideas into elegant digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
              <Link href="/projects">
                <Briefcase className="mr-2 h-5 w-5" />
                View My Work
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-sm hover:shadow-accent/30 transition-shadow">
              <Link href="/contact">
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
           <Button variant="link" size="lg" className="text-primary hover:text-primary/80 p-0 h-auto mt-2">
              <Download className="mr-2 h-4 w-4" />
              Download Resume (PDF)
            </Button>
        </AnimatedElement>

        <AnimatedElement animationClass="animate-fade-in" delay="delay-200" className="relative group">
          <div className="aspect-square rounded-full overflow-hidden shadow-2xl mx-auto max-w-md md:max-w-full border-4 border-primary/30 group-hover:border-primary/70 transition-all duration-300">
            <Image
              src="https://picsum.photos/600/600"
              alt="Your Name - Profile Picture"
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
