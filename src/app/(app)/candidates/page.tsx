'use client';
import { Header } from '@/components/header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { candidates as initialCandidates, hiringStages } from '@/lib/data';
import type { Candidate } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const STAGE_COLORS: { [key: string]: string } = {
  Applied: 'border-blue-500',
  Screening: 'border-purple-500',
  'Technical Interview': 'border-yellow-500',
  Offer: 'border-orange-500',
  Hired: 'border-green-500',
  Rejected: 'border-red-500',
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);

  const moveCandidate = (candidateId: string, direction: 'left' | 'right') => {
    setCandidates((prevCandidates) =>
      prevCandidates.map((c) => {
        if (c.id === candidateId) {
          const currentStageIndex = hiringStages.indexOf(c.stage);
          let newStageIndex = currentStageIndex;
          if (direction === 'left' && currentStageIndex > 0) {
            newStageIndex = currentStageIndex - 1;
          } else if (direction === 'right' && currentStageIndex < hiringStages.length - 1) {
            newStageIndex = currentStageIndex + 1;
          }
          return { ...c, stage: hiringStages[newStageIndex] };
        }
        return c;
      })
    );
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Header title="Candidates" />
      <main className="flex-1 overflow-x-auto p-4">
        <div className="grid h-full grid-flow-col auto-cols-[300px] gap-4">
          {hiringStages.map((stage, stageIndex) => (
            <div key={stage} className="flex flex-col">
              <h2 className="mb-2 font-semibold">{stage}</h2>
              <div
                className={`flex-1 overflow-y-auto rounded-lg bg-muted/50 p-2 space-y-3 border-t-4 ${STAGE_COLORS[stage]}`}
              >
                {candidates
                  .filter((c) => c.stage === stage)
                  .map((candidate) => (
                    <Card key={candidate.id} className="bg-card">
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={candidate.avatarUrl} data-ai-hint="person face" />
                              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{candidate.name}</CardTitle>
                              <CardDescription className="text-xs">{candidate.email}</CardDescription>
                            </div>
                          </div>
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                         <p className="text-sm text-muted-foreground line-clamp-3">
                           {candidate.profile}
                         </p>
                      </CardContent>
                      <CardFooter className="p-2 pt-0 flex justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveCandidate(candidate.id, 'left')}
                          disabled={stageIndex === 0}
                        >
                          <MoveLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => moveCandidate(candidate.id, 'right')}
                          disabled={stageIndex === hiringStages.length - 1}
                        >
                          <MoveRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
