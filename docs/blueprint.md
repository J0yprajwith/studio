# **App Name**: TalentStream

## Core Features:

- Dexie.js Integration: Integrate Dexie.js for local IndexedDB persistence to manage jobs, candidates, assessments, responses, timelines, and metadata.
- Mock API with MSW: Use MSW (Mock Service Worker) to simulate API endpoints for fetching and updating job and candidate data and assessments. Mimic network latency and error rates for realistic behavior.
- Job Board: Implement a jobs board with CRUD operations, pagination, filtering (by title, status, tags), and drag-and-drop reordering. Persist job data to the local database.
- Candidate Management: Develop a virtualized list for managing candidates, candidate profiles, a timeline of stage changes, and a Kanban board for tracking candidates through hiring stages (applied, screen, tech, offer, hired/rejected).
- Assessment Builder: Create an assessment builder with a drag-and-drop interface for adding and reordering questions, live preview, and conditional logic. Store the state and questions in the local database.
- Intelligent Applicant Sourcing: Use AI to analyze job descriptions and candidate profiles to automatically suggest the most relevant candidates. This tool can use keywords and skills to make its selections.
- Automated Data Import: Implement AI powered tool to import job listings from job sites, and to read, understand, and then map key attributes of job listings to our app schema.

## Style Guidelines:

- Primary color: A cool light-blue (#ADD8E6) to convey trust and stability in a professional environment.
- Background color: A very light grey (#F0F0F0) to maintain a clean and professional look, providing contrast without harshness.
- Accent color: A pale orange (#FFB347) to highlight interactive elements and CTAs, providing warmth and energy.
- Body and headline font: 'Inter', a sans-serif font with a modern, neutral, objective look.
- Use clear and professional icons to represent different actions and statuses.
- Maintain a clean and structured layout with consistent spacing and alignment.
- Use subtle animations for transitions and feedback to enhance the user experience without being distracting.