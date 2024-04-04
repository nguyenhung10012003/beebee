import { NavItem } from '@/types/Nav';

export const navItems: NavItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'overview',
  },
  {
    title: 'Team',
    href: '/dashboard/team',
    icon: 'userGroup',
    label: 'team',
  },
  {
    title: 'Project',
    href: '/dashboard/project',
    icon: 'project',
    label: 'project',
  },
  {
    title: 'Task',
    href: '/dashboard/task',
    icon: 'task',
    label: 'task',
  },
];