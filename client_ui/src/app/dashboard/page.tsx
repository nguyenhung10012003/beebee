import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/container';
import { getStartItems } from '@/utils/getStart';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';


export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Beebee dashboard page',
};

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-xxl font-extrabold">Your Work</h1>
      <section className="w-full flex flex-col mt-4 border-t-2 py-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold">Recent project</h2>
          <Link href="/dashboard/project" className="text-sm text-sky-600 hover:text-sky-500 underline">View all</Link>
        </div>
      </section>

      <section className="w-full flex flex-col mt-4 border-t-2 py-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-bold">Welcome to beebee</h2>
          <Link href="/docs" className="text-sm text-sky-600 hover:text-sky-500 underline">See all
            documentation
          </Link>
        </div>
        <Container
          className="!p-0 flex flex-wrap gap-6 items-start mt-6"
          children={getStartItems.map((item, index) => {
            const Icon = Icons[item.icon];
            return (
              <Card key={index} className="flex flex-row flex-grow p-4 w-full min-w-[300px]">
                <Icon className="h-20 w-20 text-primary p-4"></Icon>
                <div className="flex flex-col justify-center">
                  <Link href={item.href || ''} className="text-xl text-sky-600 hover:underline">{item.title}</Link>
                  <p>{item.description}</p>
                </div>
              </Card>
            );
          })}
        >
        </Container>
      </section>
    </div>
  );
}