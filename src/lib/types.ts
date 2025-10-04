export type Job = {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'Interviewing' | 'Closed';
  tags: string[];
  order: number;
};

export type Candidate = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  stage: 'Applied' | 'Screening' | 'Technical Interview' | 'Offer' | 'Hired' | 'Rejected';
  profile: string;
  jobId: string;
};

export type Question = {
  id: string;
  type: 'multiple-choice' | 'text' | 'code';
  text: string;
  options?: string[];
};

export type Assessment = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
