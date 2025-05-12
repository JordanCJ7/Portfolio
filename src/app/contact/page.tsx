"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedElement from '@/components/animated-element';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be at most 500 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const { toast } = useToast();
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <SectionWrapper
      title="Get In Touch"
      subtitle="Have a project in mind, a question, or just want to say hi? Feel free to reach out. I'm always open to discussing new opportunities and collaborations."
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
                Fill out the form below and I&apos;ll respond as soon as possible.
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
                <li><a href="mailto:your.email@example.com" className="hover:text-primary transition-colors">your.email@example.com</a></li>
                <li><a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                <MapPin className="mr-3 h-5 w-5" /> My Location
              </h3>
              <p className="text-muted-foreground">
                Currently based in [Your City, Your Country].<br />
                Open to remote opportunities worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                Availability
              </h3>
              <p className="text-muted-foreground">
                I am currently available for freelance projects and full-time positions. Let&apos;s discuss how I can contribute to your team.
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </SectionWrapper>
  );
}
