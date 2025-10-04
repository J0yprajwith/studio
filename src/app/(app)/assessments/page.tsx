import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const mockAssessments = [
  { id: '1', title: 'Frontend Skills Challenge', description: 'Test for React, TypeScript, and CSS skills.', questions: 5 },
  { id: '2', title: 'Product Vision Exercise', description: 'Assesses product sense and strategic thinking.', questions: 3 },
  { id: '3', title: 'Backend System Design', description: 'A test for designing scalable backend systems.', questions: 2 },
];

export default function AssessmentsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Assessments" />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your Assessments</h1>
            <p className="text-muted-foreground">
              Create, view, and manage candidate assessments.
            </p>
          </div>
          <Button asChild>
            <Link href="/assessments/builder">
              <PlusCircle className="mr-2" />
              New Assessment
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockAssessments.map((assessment) => (
            <Card key={assessment.id}>
              <CardHeader>
                <CardTitle>{assessment.title}</CardTitle>
                <CardDescription>{assessment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {assessment.questions} questions
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Edit</Button>
              </CardFooter>
            </Card>
          ))}
            <Card className="flex flex-col items-center justify-center border-2 border-dashed">
                <CardHeader className="text-center">
                    <CardTitle>Create New Assessment</CardTitle>
                    <CardDescription>Build a custom assessment for your candidates.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild>
                     <Link href="/assessments/builder">
                        <PlusCircle className="mr-2" />
                        Start Building
                     </Link>
                  </Button>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
