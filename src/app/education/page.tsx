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
  CheckCircle,
  Clock,
  Bot,
  Users
} from 'lucide-react';
import CertificationCard from '@/components/ui/certification-card';
import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
import { performanceMonitor, measureAsync } from '@/lib/performance';

// Lazy load ChatWidget for better initial page performance
const ChatWidget = lazy(() => import('@/components/chat-widget'));

// Memoized certification data to prevent unnecessary re-calculations
const certifications = [
  {
    name: "Microsoft Azure Fundamentals AZ-900",
    status: "scheduled",
    description: "Scheduled for July 2025 – Comprehensive preparation in Azure cloud concepts, services, and security.",
    provider: "Microsoft",
    date: "July 2025",
    imageUrl: "/certs/Microsoft Certified Azure Fundamentals AZ 900 Badge.png",
    credentialUrl: "",
    aspect: "rect" as const,
    icon: <Award className="h-4 w-4" />,
    color: "bg-blue-500/10 text-blue-500",
    showLinkIcon: false
  },
  {
    name: "Postman API Fundamentals Student Expert",
    status: "completed",
    description: "Demonstrated skills in API design, testing, documentation, and collaboration using Postman.",
    provider: "Postman",
    date: "2025",
    imageUrl: "/certs/Postman API Fundamentals Student Expert.png",
    credentialUrl: "https://api.badgr.io/public/assertions/bTETPxnZT7u-hDzCuaUN4A",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "Collaborate with others with Markdown and GitHub Pages",
    status: "completed",
    description: "Mastered collaborative workflows, documentation, and publishing using Markdown and GitHub Pages.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Collaborate with others with Markdown and GitHub Pages.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/8ZQFQ57W?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-500/10 text-green-500"
  },
  {
    name: "AI Skills Fest Challenge: Architecture Recipes for AI-Powered Applications",
    status: "completed",
    description: "Demonstrated skills in designing AI-powered applications and architectural best practices.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/AI Skills Fest Challenge Architecture Recipes for AI-Powered Applications.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/UR2RTT53?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "AI Skills Fest Challenge: Create agentic AI solutions with Azure AI Foundry",
    status: "completed",
    description: "Demonstrated skills in creating agentic AI solutions using Azure AI Foundry.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/AI Skills Fest Challenge Create agentic AI solutions with Azure AI Foundry.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/9YZY4KDU?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "AI Skills Fest Challenge: Treasure Hunt for AI Skills",
    status: "completed",
    description: "Demonstrated skills in AI skills through a challenge-based learning experience.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/AI Skills Fest Challenge Treasure Hunt for AI Skills.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/FM4MGRYX?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    name: "MS Azure Fundamentals: Describe cloud concepts",
    status: "completed",
    description: "Gained foundational knowledge of cloud computing principles and Azure services.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Microsoft Azure Fundamentals Describe cloud concepts.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/VJU5HKNM?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <Clock className="h-4 w-4" />,
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    name: "MS Azure Fundamentals: Describe Azure architecture and services",
    status: "completed",
    description: "Acquired understanding of Azure architecture, core services, and cloud solutions.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Microsoft Azure Fundamentals Describe Azure architecture and services.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/W2DJ87GN?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-500/10 text-green-500"
  },
  {
    name: "MS Azure Fundamentals: Describe Azure management and governance",
    status: "completed",
    description: "Explored Azure management, governance, and best practices for cloud administration.",
    provider: "Microsoft Learn",
    date: "2025",
    imageUrl: "/certs/Microsoft Azure Fundamentals Describe Azure management and governance.png",
    credentialUrl: "https://learn.microsoft.com/api/achievements/share/en-us/JanithaSuranjanaLakshanGamage/XQSLW9DY?sharingId=BA5B855C8870666",
    aspect: "rect" as const,
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-500/10 text-green-500"
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
  // Enhanced carousel logic with performance optimizations
  const CARDS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize computed values
  const totalPages = useMemo(() => Math.ceil(certifications.length / CARDS_PER_PAGE), []);
  
  // Memoize paginated certifications
  const paginatedCertifications = useMemo(() => {
    return Array.from({ length: totalPages }).map((_, pageIdx) => {
      const pageStartIdx = pageIdx * CARDS_PER_PAGE;
      return certifications.slice(pageStartIdx, pageStartIdx + CARDS_PER_PAGE);
    });
  }, [totalPages]);

  // Optimized carousel navigation with performance monitoring
  const handlePageChange = useCallback(async (newPage: number) => {
    await measureAsync(async () => {
      setCurrentPage(newPage);
    }, `Certification carousel page change to ${newPage}`);
  }, []);

  // Enhanced auto-play with intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    const certificationSection = document.querySelector('[data-certification-carousel]');
    if (certificationSection) {
      observer.observe(certificationSection);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play timer with optimizations
  useEffect(() => {
    if (totalPages <= 1 || !isAutoPlaying || !isVisible) return;
    
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [totalPages, isAutoPlaying, isVisible]);

  // Pause auto-play on user interaction
  const handleUserInteraction = useCallback(() => {
    setIsAutoPlaying(false);
    // Resume after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  // Performance monitoring on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
                <div className="border-l-4 border-primary/30 pl-4 pb-4 md:pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start w-full md:w-auto">
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-primary/20 p-0 relative mx-auto sm:mx-0">
                          <Image
                            src="/logos/sliit-logo.png"
                            alt="SLIIT Logo"
                            width={384}
                            height={384}
                            className="w-full h-full object-contain"
                            priority
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
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">
                          BSc (Hons) in Information Technology – Software Engineering
                        </h3>
                        <p className="text-muted-foreground font-medium text-sm sm:text-base">
                          Sri Lanka Institute of Information Technology (SLIIT)
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Specializing in AI-driven development, full-stack technologies, and product management methodologies
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 items-end md:items-end text-right w-full md:w-auto justify-end md:justify-end mt-2 md:mt-0">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
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
                <div className="border-l-4 border-accent/30 pl-4 pb-4 md:pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4 items-start w-full md:w-auto">
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 border-accent/20 p-0 relative mx-auto sm:mx-0">
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
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">
                          Richmond College, Galle
                        </h3>
                        <p className="text-muted-foreground font-medium text-sm sm:text-base">
                          Advanced Level Education - Biological Science Stream
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          Focus on Biological Science, Physics, and Chemistry
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 items-end md:items-end text-right w-full md:w-auto justify-end md:justify-end mt-2 md:mt-0">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit text-xs sm:text-sm">
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

        {/* Enhanced Certifications Section */}
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
              <div 
                className="relative overflow-hidden"
                data-certification-carousel
                onMouseEnter={handleUserInteraction}
                onTouchStart={handleUserInteraction}
              >
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
                    width: `${totalPages * 100}%`
                  }}
                >
                  {paginatedCertifications.map((pageCerts, pageIdx) => (
                    <div 
                      key={pageIdx}
                      className="flex-shrink-0"
                      style={{ width: `${100 / totalPages}%` }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {pageCerts.map((cert, certIndex) => (
                          <div
                            key={`${pageIdx}-${certIndex}-${cert.name}`}
                            className="transform transition-all duration-300 hover:scale-105"
                          >
                            <CertificationCard {...cert} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
                      onClick={() => handlePageChange(idx)}
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
                  <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                    <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">AI & Development</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Staying current with AI tools and development practices
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                    <Award className="h-8 w-8 text-accent mx-auto mb-2" />
                    <h4 className="font-semibold text-sm">Cloud Technologies</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Advancing Azure and cloud architecture knowledge
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
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
      
      {/* Lazy-loaded Chat Widget */}
      <Suspense fallback={<div className="h-20 animate-pulse bg-muted/20 rounded-lg" />}>
        <ChatWidget />
      </Suspense>
    </SectionWrapper>
  );
}
