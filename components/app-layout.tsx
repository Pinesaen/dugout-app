"use client"

import { ReactNode } from 'react';
import { IOSHeader } from './ios-header';
import { IOSTabBar } from './ios-tab-bar';
import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AppLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  headerTitle?: string;
  showLogo?: boolean;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
}

export function AppLayout({
  children,
  showHeader = true,
  headerTitle,
  showLogo = false,
  leftAction,
  rightAction,
}: AppLayoutProps) {
  const pathname = usePathname();
  
  // Define which paths should have the tab bar
  const pathsWithTabBar = ['/home', '/discover', '/create', '/chat', '/profile'];
  const shouldShowTabBar = pathsWithTabBar.includes(pathname);

  // Define tab items
  const tabs = [
    {
      href: '/home',
      icon: <Home className="h-6 w-6" />,
      label: 'Home',
      isActive: pathname === '/home',
    },
    {
      href: '/discover',
      icon: <Search className="h-6 w-6" />,
      label: 'Discover',
      isActive: pathname === '/discover',
    },
    {
      href: '/create',
      icon: <PlusCircle className="h-6 w-6" />,
      label: 'Post',
      isActive: pathname === '/create',
    },
    {
      href: '/chat',
      icon: <MessageCircle className="h-6 w-6" />,
      label: 'Chat',
      isActive: pathname === '/chat',
    },
    {
      href: '/profile',
      icon: <User className="h-6 w-6" />,
      label: 'Profile',
      isActive: pathname === '/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-dugout-navy">
      {showHeader && (
        <IOSHeader
          title={headerTitle}
          showLogo={showLogo}
          leftAction={leftAction}
          rightAction={rightAction}
        />
      )}
      <main className={`${showHeader ? 'pt-[calc(3.5rem+env(safe-area-inset-top))]' : ''} ${shouldShowTabBar ? 'pb-[calc(4rem+env(safe-area-inset-bottom))]' : ''}`}>
        {children}
      </main>
      {shouldShowTabBar && <IOSTabBar tabs={tabs} />}
    </div>
  );
} 