'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState, useTransition } from 'react';
import { automatedJobListingImport } from '@/ai/flows/automated-job-listing-import';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

type JobImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJobImported: (job: any) => void;
};

export function JobImportDialog({ open, onOpenChange, onJobImported }: JobImportDialogProps) {
  const [jobListingText, setJobListingText] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [parsedJob, setParsedJob] = useState<any>(null);

  const handleImport = () => {
    startTransition(async () => {
      if (!jobListingText.trim()) {
        toast({
          title: 'Error',
          description: 'Job listing text cannot be empty.',
          variant: 'destructive',
        });
        return;
      }
      try {
        const result = await automatedJobListingImport({ jobListingText });
        setParsedJob(result);
      } catch (error) {
        console.error('Failed to import job listing:', error);
        toast({
          title: 'Import Failed',
          description: 'Could not parse the job listing. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleCreateJob = () => {
    onJobImported(parsedJob);
    handleClose();
  }

  const handleClose = () => {
    setJobListingText('');
    setParsedJob(null);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Automated Job Listing Import</DialogTitle>
          <DialogDescription>
            Paste the full text of a job listing from any site, and our AI will extract the details.
          </DialogDescription>
        </DialogHeader>

        {!parsedJob ? (
           <div className="grid gap-4 py-4">
            <Textarea
              id="job-listing-text"
              placeholder="Paste job listing text here..."
              className="min-h-[200px]"
              value={jobListingText}
              onChange={(e) => setJobListingText(e.target.value)}
              disabled={isPending}
            />
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Title</Label>
              <Input id="title" value={parsedJob.title} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">Company</Label>
              <Input id="company" value={parsedJob.company} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">Location</Label>
              <Input id="location" value={parsedJob.location} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Description</Label>
              <Textarea id="description" value={parsedJob.description} className="col-span-3 min-h-[100px]" />
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="requirements" className="text-right pt-2">Requirements</Label>
              <Textarea id="requirements" value={parsedJob.requirements} className="col-span-3" />
            </div>
          </div>
        )}

        <DialogFooter>
          {!parsedJob ? (
            <Button onClick={handleImport} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Parse Listing
          </Button>
          ): (
            <Button onClick={handleCreateJob}>Create Job</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
