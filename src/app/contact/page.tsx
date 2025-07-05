"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Mail, MapPin, AlertCircle } from 'lucide-react';
import AnimatedElement from '@/components/animated-element';
import ChatWidget from '@/components/chat-widget';

// Rate limiting for free tier (200 emails/month)
const RATE_LIMIT_KEY = 'emailjs_usage';
const MAX_EMAILS_PER_MONTH = 200;
const MAX_EMAILS_PER_DAY = 10; // Conservative daily limit

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be at most 500 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// Rate limiting functions
const getRateLimitData = () => {
  if (typeof window === 'undefined') return { monthlyCount: 0, dailyCount: 0, lastReset: Date.now() };
  
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  if (!stored) {
    return { monthlyCount: 0, dailyCount: 0, lastReset: Date.now(), lastDailyReset: Date.now() };
  }
  
  return JSON.parse(stored);
};

const updateRateLimitData = (data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  }
};

const checkRateLimit = () => {
  const data = getRateLimitData();
  const now = Date.now();
  const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days
  const oneDay = 24 * 60 * 60 * 1000;
  
  // Reset monthly counter if a month has passed
  if (now - data.lastReset > oneMonth) {
    data.monthlyCount = 0;
    data.lastReset = now;
  }
  
  // Reset daily counter if a day has passed
  if (now - (data.lastDailyReset || data.lastReset) > oneDay) {
    data.dailyCount = 0;
    data.lastDailyReset = now;
  }
  
  const canSend = data.monthlyCount < MAX_EMAILS_PER_MONTH && data.dailyCount < MAX_EMAILS_PER_DAY;
  
  if (canSend) {
    data.monthlyCount++;
    data.dailyCount++;
    updateRateLimitData(data);
  }
  
  return {
    canSend,
    monthlyCount: data.monthlyCount,
    dailyCount: data.dailyCount,
    monthlyLimit: MAX_EMAILS_PER_MONTH,
    dailyLimit: MAX_EMAILS_PER_DAY
  };
};

export default function ContactPage() {
  const { toast } = useToast();
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const {formState: {isSubmitting}} = form;

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setEmailStatus('sending');

    // Check rate limits
    const rateCheck = checkRateLimit();
    if (!rateCheck.canSend) {
      toast({
        title: "Rate Limit Reached",
        description: `You've reached the daily (${rateCheck.dailyLimit}) or monthly (${rateCheck.monthlyLimit}) limit. Please try again later.`,
        variant: "destructive",
      });
      setEmailStatus('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: `Thank you ${data.name}! I'll get back to you soon. (${rateCheck.monthlyCount}/${rateCheck.monthlyLimit} monthly limit used)`,
        });
        form.reset();
        setEmailStatus('success');
      } else {
        throw new Error('Failed to save message');
      }
    } catch (error) {
      console.error('Contact API Error:', error);
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try contacting me directly via email.",
        variant: "destructive",
      });
      setEmailStatus('error');
    }
  };
  return (
    <SectionWrapper
      title="Let&apos;s Connect - Open for Internships"
      subtitle={
        <div className="max-w-xl mx-auto">
          I&apos;m actively seeking internship opportunities where I can contribute as a Developer, Product Strategist, or both. <br />
          Let&apos;s discuss how I can add value to your team while learning and growing professionally.
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatedElement>
          <Card className="shadow-xl h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-6 w-6 text-primary" />
                Send Me a Message
              </CardTitle>
              <CardDescription>
                Looking for technical development, product strategy, or both? Let me know how I can help bring your vision to life.
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Project Inquiry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project or query..."
                            rows={5}
                            {...field}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="min-w-[150px]">
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Message
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </AnimatedElement>
        <AnimatedElement delay="delay-200">
          <div className="space-y-8 p-6 md:p-8 bg-card rounded-lg shadow-xl h-full">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <Mail className="mr-3 h-5 w-5" /> Contact Information
              </h3>
              <p className="text-muted-foreground">
                Feel free to reach out via email or phone.
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="mailto:janithagamage2001@example.com" className="hover:text-primary transition-colors">janithagamage2001@example.com</a></li>
                <li><a href="tel:+94743288572" className="hover:text-primary transition-colors">+94 743 288 572</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <MapPin className="mr-3 h-5 w-5" /> My Location
              </h3>
              <p className="text-muted-foreground">
                Currently based in Colombo, Sri Lanka.<br />
                Open to remote opportunities worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                Availability
              </h3>
              <p className="text-muted-foreground">
                Currently seeking internship opportunities in software development, product management, or technical product roles. Ready to contribute to innovative projects and learn from experienced professionals.
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
      <ChatWidget />
    </SectionWrapper>
  );
}
