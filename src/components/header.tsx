'use client';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Home, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type React from 'react';

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

export function Header({ title, children }: HeaderProps) {
  const { isMobile } = useSidebar();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className={cn(isMobile ? 'flex' : 'hidden')} />

      <h1 className="text-xl font-semibold">{title}</h1>

      <div className="ml-auto flex items-center gap-4">
        {children}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/10/100/100" alt="User" data-ai-hint="person face" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Hiring Manager</p>
                <p className="text-xs leading-none text-muted-foreground">
                  manager@talentstream.io
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Home className="mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
