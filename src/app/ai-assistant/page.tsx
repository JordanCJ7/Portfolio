"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { refineDescription, type RefineDescriptionInput } from '@/ai/flows/refine-description';
import SectionWrapper from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Loader2 } from 'lucide-react';
import AnimatedElement from '@/components/animated-element';

const refineSchema = z.object({
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(2000, { message: "Description must be at most 2000 characters." }),
  tonePreferences: z.string().min(3, { message: "Tone preferences must be at least 3 characters." }).max(100, { message: "Tone preferences must be at most 100 characters." }),
});

type RefineFormValues = z.infer<typeof refineSchema>;

export default function AIAssistantPage() {
  const [refinedText, setRefinedText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RefineFormValues>({
    resolver: zodResolver(refineSchema),
    defaultValues: {
      description: '',
      tonePreferences: 'Professional and engaging',
    },
  });

  const onSubmit: SubmitHandler<RefineFormValues> = async (data) => {
    setIsLoading(true);
    setRefinedText(null);
    try {
      const result = await refineDescription(data as RefineDescriptionInput);
      setRefinedText(result.refinedDescription);
      toast({
        title: "Content Refined!",
        description: "Your text has been successfully refined by the AI assistant.",
      });
    } catch (error) {
      console.error("Error refining description:", error);
      toast({
        title: "Error",
        description: "Failed to refine content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionWrapper
      title="AI Copywriting Assistant"
      subtitle="Elevate your writing with AI. Refine descriptions, enhance clarity, and achieve the perfect tone for your content."
    >
      <AnimatedElement>
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-primary" />
              Refine Your Content
            </CardTitle>
            <CardDescription>
              Enter your text and desired tone, and let our AI assistant help you craft compelling content.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Text</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste or type your project description, bio, or any text here..."
                          rows={8}
                          {...field}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tonePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Tone</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Professional, casual, witty, formal" {...field} />
                      </FormControl>
                      <FormDescription>
                        How would you like the refined text to sound?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Refine Text
                </Button>
              </CardFooter>
            </form>
          </Form>

          {refinedText && (
            <div className="p-6 border-t">
              <h3 className="text-lg font-semibold mb-2 text-primary">Refined Version:</h3>
              <div className="p-4 bg-muted/50 rounded-md whitespace-pre-wrap text-sm">
                {refinedText}
              </div>
            </div>
          )}
        </Card>
      </AnimatedElement>
    </SectionWrapper>
  );
}
