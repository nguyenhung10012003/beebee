import { Icons } from '@/components/ui/icons';

export interface GetStartItem {
  title: string;
  description?: string;
  href?: string;
  icon: keyof typeof Icons;
}