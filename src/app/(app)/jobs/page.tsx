'use client';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, PlusCircle, Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { jobs as initialJobs } from '@/lib/data';
import type { Job } from '@/lib/types';
import { useState } from 'react';
import { JobImportDialog } from '@/components/job-import-dialog';
import { useRouter } from 'next/navigation';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [isImporting, setIsImporting] = useState(false);
  const router = useRouter();

  const handleJobImported = (importedJob: any) => {
    const newJob: Job = {
      id: `job-${Date.now()}`,
      title: importedJob.title || 'Untitled Job',
      description: importedJob.description || '',
      status: 'Open',
      tags: importedJob.requirements?.split(',').map((t: string) => t.trim()) || [],
      order: jobs.length + 1,
    };
    setJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="Job Listings">
        <Button size="sm" onClick={() => setIsImporting(true)}>
          <Download className="mr-2" />
          Import with AI
        </Button>
      </Header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Job Listings</CardTitle>
            <CardDescription>
              Manage your open positions and track their status.
            </CardDescription>
            <div className="mt-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by title, tag..."
                  className="pl-8"
                />
              </div>
              <Button>
                <PlusCircle className="mr-2" />
                New Job
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Candidates</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow
                    key={job.id}
                    className="cursor-pointer"
                    onClick={() => router.push(`/jobs/${job.id}`)}
                  >
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          job.status === 'Open'
                            ? 'secondary'
                            : job.status === 'Closed'
                            ? 'outline'
                            : 'default'
                        }
                        className={
                          job.status === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          job.status === 'Interviewing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''
                        }
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {job.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="font-normal">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <JobImportDialog
        open={isImporting}
        onOpenChange={setIsImporting}
        onJobImported={handleJobImported}
      />
    </div>
  );
}
