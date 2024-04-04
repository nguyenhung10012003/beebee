import ThemeToggle from '@/components/layout/themeChange';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobileSidebar';
import { UserNav } from './userNav';
import Link from 'next/link';
import { useAuth } from '@/hooks/AuthContext';
import Image from 'next/image';

export default function Header() {
  const { user } = useAuth();
  return (
    <div
      className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={'/'}
          >
            <Image src={'/logo.svg'} alt={''} width={40} height={40} />
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav user={user} />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}