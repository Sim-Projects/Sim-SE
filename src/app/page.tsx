"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import DataShardingLesson from "@/contents/courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding";
import Image from "next/image";
import { courseStructure } from '@/contents/course_structure';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function Home() {
  const router = useRouter();

  const handleStartCourse = (courseId: Number) => {
    router.push(`/course/${courseId}`);
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
        <h1 className="text-2xl font-bold mb-4">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {courseStructure.courses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Chapters: {course.chapters.length}</p>
                <p>First chapter: {course.chapters[0].name}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  // className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleStartCourse(course.id)}
                >
                  Start Course
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
