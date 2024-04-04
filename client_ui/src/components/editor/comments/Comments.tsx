'use client';

import { ClientSideSuspense } from '@liveblocks/react';

import { CommentsOverlay } from '@/components/editor/comments/CommentsOverlay';

export const Comments = () => (
  <ClientSideSuspense fallback={null}>
    {() => <CommentsOverlay />}
  </ClientSideSuspense>
);
