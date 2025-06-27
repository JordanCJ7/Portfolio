"use client";

import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedElement from '@/components/animated-element';
import Image from 'next/image';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Calendar,
  ExternalLink,
  CheckCircle,
  Clock,
  Bot,
  Users
} from 'lucide-react';
import CertificationCard from '@/components/ui/certification-card';
import React, { useState, useEffect } from 'react';

const certifications = [
  {
    name: "Microsoft Azure Fundamentals AZ-900",
    status: "scheduled",
    description: "Scheduled Next Month - Fully Prepared",
    provider: "Microsoft",
    date: "July 2025",
    imageUrl: "/certs/Microsoft Certified Azure Fundamentals AZ 900 Badge.png",
    credentialUrl: "",
    aspect: "rect" as const,
    icon: <Award className="h-4 w-4" />,
    color: "bg-blue-500/10 text-blue-500",
    showLinkIcon: false // Do not display the link icon
  },
  {
    name: "Postman API Fundamentals Student Expert",
    status: "completed",
    description: "API design, testing, and documentation",
    provider: "Postman",
    date: "2025",
    imageUrl: "/certs/Postman API Fundamentals Student Expert.png",
    credentialUrl: "https://api.badgr.io/public/assertions/bTETPxnZT7u-hDzCuaUN4A",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "Microsoft Azure Fundamentals: Describe cloud concepts",
    status: "completed",
    description: "Cloud computing fundamentals",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Microsoft Azure Fundamentals Describe cloud concepts.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/VJU5HKNM?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <Clock className="h-4 w-4" />,
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    name: "Collaborate with others with Markdown and GitHub Pages",
    status: "completed",
    description: "Version control and documentation",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Collaborate with others with Markdown and GitHub Pages.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/8ZQFQ57W?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-500/10 text-green-500"
  },
  {
    name: "Microsoft Azure Fundamentals: Describe Azure architecture and services",
    status: "completed",
    description: "AI development and integration challenges",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Microsoft Azure Fundamentals Describe Azure architecture and services.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/W2DJ87GN?sharingId=BA5B855C8870666",
    aspect: "square" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    name: "AI Skills Fest Challenge",
    status: "completed",
    description: "AI development and integration challenges",
    provider: "Various",
    date: "2025",
    imageUrl: "/certs/ai-skills-fest.png",
    credentialUrl: "https://aiskillsfest.com/certificates/your-certificate-id",
    aspect: "square" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    name: "AI Skills Fest Challenge",
    status: "completed",
    description: "AI development and integration challenges",
    provider: "Various",
    date: "2025",
    imageUrl: "/certs/ai-skills-fest.png",
    credentialUrl: "https://aiskillsfest.com/certificates/your-certificate-id",
    aspect: "square" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-purple-500/10 text-purple-500"
  }
];

const readinessSkills = [
  "Expert proficiency in GitHub Copilot and AI development tools",
  "AI-enhanced productivity in coding and debugging workflows",
  "Proven team leadership across multiple university projects",
  "Experience with project management tools and methodologies",
  "Track record of on-time project delivery with AI-enhanced efficiency",
  "Strong mentoring and problem-solving capabilities",
  "Excellent team coordination and communication skills",
  "Ready to lead or contribute effectively in professional settings and AI-forward development environments"
];

export default function EducationPage() {
  // Carousel logic for certifications
  const CARDS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(certifications.length / CARDS_PER_PAGE);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  return (
    <SectionWrapper
      title="Education & Certifications"
      subtitle="Academic background, professional certifications, and continuous learning journey in technology and AI-driven development."
    >
      <div className="space-y-8">
        {/* Education Section */}
        <AnimatedElement animationClass="animate-fade-in-up" delay="delay-100">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                Academic Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* University Education */}
                <div className="border-l-4 border-primary/30 pl-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-primary/20 p-0 relative">
                          <Image
                            src="/logos/sliit-logo.png"
                            alt="SLIIT Logo"
                            width={384}
                            height={384}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div style={{display: 'none'}} className="absolute inset-0 rounded flex items-center justify-center text-primary font-bold text-sm">
                            SLIIT
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Bachelor of Software Engineering
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          Sri Lanka Institute of Information Technology (SLIIT)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Specializing in AI-driven development, full-stack technologies, and product management methodologies
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {/* <Badge variant="secondary" className="text-xs">
                            Current GPA: [Your GPA]
                          </Badge> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end text-right">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Calendar className="h-3 w-3" />
                        Current
                      </Badge>
                      <Badge variant="outline" className="text-xs w-fit">
                        Expected Graduation: 2026
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* High School Education */}
                <div className="border-l-4 border-accent/30 pl-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-accent/20 p-0 relative">
                          <Image
                            src="/logos/richmond-college-logo.png"
                            alt="Richmond College Logo"
                            width={384}
                            height={384}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div style={{display: 'none'}} className="absolute inset-0 rounded flex items-center justify-center text-accent font-bold text-xs">
                            RC
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Richmond College, Galle
                        </h3>
                        <p className="text-muted-foreground font-medium">
                          Advanced Level Education - Biological Science Stream
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Focus on Biological Science, Physics, and Chemistry
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {/* <Badge variant="secondary" className="text-xs">
                            Final Grade: [Your Grade/Percentage]
                          </Badge> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end text-right">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit">
                        <Calendar className="h-3 w-3" />
                        Completed
                      </Badge>
                      <Badge variant="outline" className="text-xs w-fit">
                        Graduation Year: 2020
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Test Scores & Academic Achievements */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Test Scores & Academic Achievements
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-background rounded border">
                      <p className="text-xs text-muted-foreground">GIT</p>
                      <p className="font-semibold text-foreground">A</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded border">
                      <p className="text-xs text-muted-foreground">GIQ</p>
                      <p className="font-semibold text-foreground">86.66</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded border">
                      <p className="text-xs text-muted-foreground">General English</p>
                      <p className="font-semibold text-foreground">A</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* Certifications Section */}
        <AnimatedElement animationClass="animate-fade-in-up" delay="delay-200">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  <Award className="h-6 w-6" />
                </div>
                Professional Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
                    width: `${totalPages * 100}%`
                  }}
                >
                  {Array.from({ length: totalPages }).map((_, pageIdx) => {
                    const pageStartIdx = pageIdx * CARDS_PER_PAGE;
                    const pageCerts = certifications.slice(pageStartIdx, pageStartIdx + CARDS_PER_PAGE);
                    
                    return (
                      <div 
                        key={pageIdx}
                        className="flex-shrink-0"
                        style={{ width: `${100 / totalPages}%` }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {pageCerts.map((cert, certIndex) => (
                            <div
                              key={`${pageIdx}-${certIndex}-${cert.name}-${cert.date}-${cert.provider}`}
                              className="transform transition-all duration-300 hover:scale-105"
                            >
                              <CertificationCard {...cert} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-3 h-3 rounded-full transition-all duration-300 border border-accent/40 hover:scale-110 ${
                        idx === currentPage ? 'bg-accent shadow-lg' : 'bg-muted hover:bg-accent/50'
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                      onClick={() => setCurrentPage(idx)}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* AI-Enhanced Development & Internship Readiness */}
        <AnimatedElement animationClass="animate-fade-in-up" delay="delay-300">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                  <Users className="h-6 w-6" />
                </div>
                AI-Enhanced Development & Internship Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  {readinessSkills.slice(0, 4).map((skill, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {readinessSkills.slice(4).map((skill, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* Continuous Learning */}
        <AnimatedElement animationClass="animate-fade-in-up" delay="delay-400">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <BookOpen className="h-6 w-6" />
                </div>
                Continuous Learning & Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">AI & Development</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Staying current with AI tools and development practices
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Cloud Technologies</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Advancing Azure and cloud architecture knowledge
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Leadership Skills</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Enhancing team management and project leadership
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}
