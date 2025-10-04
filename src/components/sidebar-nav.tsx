'use client';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  BarChart3,
  Briefcase,
  ClipboardCheck,
  Users,
  Settings,
  LifeBuoy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BriefcaseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-primary"
    >
      <path d="M12 12h.01" />
      <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M22 13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4Z" />
    </svg>
  );

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <BriefcaseIcon />
          <h2 className="text-lg font-semibold tracking-tight">TalentStream</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/dashboard')}
                tooltip={{ children: 'Dashboard' }}
              >
                <Link href="/dashboard">
                  <BarChart3 />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/jobs')}
                tooltip={{ children: 'Job Listings' }}
              >
                <Link href="/jobs">
                  <Briefcase />
                  <span>Job Listings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/candidates')}
                tooltip={{ children: 'Candidates' }}
              >
                <Link href="/candidates">
                  <Users />
                  <span>Candidates</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive('/assessments')}
                tooltip={{ children: 'Assessments' }}
              >
                <Link href="/assessments">
                  <ClipboardCheck />
                  <span>Assessments</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Settings' }}>
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Help' }}>
                <LifeBuoy />
                <span>Help</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
