"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import DataShardingLesson from "@/contents/topics/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding";
import Image from "next/image";
import catalog from '@/contents/catalog';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function Home() {
  const router = useRouter();

  const handleStarttopic = (topicId: string) => {
    router.push(`/topic/${topicId}`);
  };

  return (
    <main className='flex flex-col justify-center'>
      <div className="space-y-4 p-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-4">Topics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {catalog.topics.map((topic) => (
            <Card key={topic.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button
                  // className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleStarttopic(topic.id)}
                >
                  Start
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
