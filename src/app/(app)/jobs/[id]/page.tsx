'use client';
import { Header } from '@/components/header';
import { jobs, candidates } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { useState, useTransition } from 'react';
import { suggestCandidates } from '@/ai/flows/intelligent-candidate-suggestions';
import { useToast } from '@/hooks/use-toast';
import type { SuggestCandidatesOutput } from '@/ai/flows/intelligent-candidate-suggestions';

type Params = {
  id: string;
};

export default function JobDetailPage({ params }: { params: Params }) {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestCandidatesOutput | null>(null);
  const { toast } = useToast();

  const job = jobs.find((j) => j.id === params.id);

  if (!job) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Header title="Job Not Found" />
        <main className="flex flex-1 items-center justify-center">
          <p>The job you are looking for does not exist.</p>
        </main>
      </div>
    );
  }

  const handleSuggestCandidates = () => {
    startTransition(async () => {
      setSuggestions(null);
      try {
        const result = await suggestCandidates({
          jobDescription: `${job.title}: ${job.description}`,
          candidateProfiles: candidates.map((c) => `ID ${c.id}: ${c.profile}`),
        });
        setSuggestions(result);
      } catch (error) {
        console.error('Failed to get suggestions:', error);
        toast({
          title: 'Suggestion Failed',
          description: 'Could not get candidate suggestions. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const getCandidateById = (idWithPrefix: string) => {
    const id = idWithPrefix.replace('ID ', '').trim();
    return candidates.find(c => c.id === id);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title={job.title} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{job.title}</CardTitle>
            <div className="flex gap-2 pt-2">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{job.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Intelligent Applicant Sourcing</CardTitle>
                <CardDescription>
                  Use AI to find the best candidates for this role.
                </CardDescription>
              </div>
              <Button onClick={handleSuggestCandidates} disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Suggest Candidates
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {!suggestions && !isPending && (
              <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                <Lightbulb className="mx-auto h-12 w-12" />
                <p className="mt-4">Click "Suggest Candidates" to get AI-powered recommendations.</p>
              </div>
            )}
             {isPending && (
              <div className="text-center text-muted-foreground p-8">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4">Analyzing candidates...</p>
              </div>
            )}
            {suggestions && (
              <div className="grid gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
                  <p className="text-muted-foreground bg-muted p-4 rounded-lg">{suggestions.reasoning}</p>
                </div>
                 <div>
                  <h3 className="font-semibold text-lg mb-4">Top Matches</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {suggestions.suggestedCandidates.map((candidateId, index) => {
                    const candidate = getCandidateById(candidateId);
                    if (!candidate) return null;
                    return (
                       <Card key={candidate.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4">
                           <Avatar className="h-12 w-12">
                            <AvatarImage src={candidate.avatarUrl} data-ai-hint="person face" />
                            <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{candidate.name}</CardTitle>
                            <CardDescription>Match #{index + 1}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground line-clamp-4">
                            {candidate.profile}
                          </p>
                        </CardContent>
                        <div className="p-4 pt-0">
                          <Button className="w-full">View Profile</Button>
                        </div>
                      </Card>
                    )
                  })}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
