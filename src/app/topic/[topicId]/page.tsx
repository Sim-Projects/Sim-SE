"use client";

import { useRouter } from 'next/navigation';
import catalog from '@/contents/catalog';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Suspense } from 'react';
import { lazyComponentToReactNode } from '@/utils/misc';

export default function topic({ params }: { params: { topicId: string } }) {
  const topicId = params.topicId;

  const topic = catalog.topics.find(c => c.id === topicId);

  if (!topic) {
    return <div>topic not found</div>;
  }

  return (
    <main className='flex flex-col justify-center'>
      <div className="space-y-4 p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{topic.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-4">{topic.title}</h1>
        <div>
          {lazyComponentToReactNode(topic.component)}
        </div>
      </div>
    </main>
  );
}
