"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import DataShardingLesson from "@/contents/courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding";
import Image from "next/image";
import { courseStructure } from '@/contents/course_structure';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function Course({ params }: { params: { courseId: Number } }) {
  const router = useRouter();
  const courseId = params.courseId;

  const course = courseStructure.courses.find(c => c.id === Number(courseId));

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleStartChapter = (chapterId: Number) => {
    router.push(`/course/${courseId}/chapter/${chapterId}/`);
  };

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
              <BreadcrumbPage>{course.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {course.chapters.map((chapter) => (
            <Card key={chapter.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{chapter.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lessons: {chapter.lessons.length}</p>
                <p>First lesson: {chapter.lessons[0].name}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  // className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleStartChapter(chapter.id)}
                >
                  Start Chapter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

// export const getStaticParams = () => {
//   return courseStructure.courses.map(course => ({
//     params: {
//       courseId: String(course.id)
//     }
//   }))
// }
