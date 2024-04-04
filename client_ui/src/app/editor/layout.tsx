'use client';
import Room from '@/app/editor/Room';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function EditorLayout({ children }:
                                       { children: React.ReactNode }) {
  return (
    <Room>
      <TooltipProvider>
        <div className="bg-grey-200 w-full">
          {children}
        </div>
      </TooltipProvider>
    </Room>
  );
}