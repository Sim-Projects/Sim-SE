"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import DataShardingLesson from "@/contents/courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding";
import Image from "next/image";
import { courseStructure } from '@/contents/course_structure';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export default function Chapter({ params }: { params: { courseId: Number, chapterId: Number } }) {
  const router = useRouter();
  const courseId = params.courseId;
  const chapterId = params.chapterId;

  // Find the course and chapter
  const course = courseStructure.courses.find(c => c.id === Number(courseId));
  const chapter = course?.chapters.find(ch => ch.id === Number(chapterId));

  if (!course || !chapter) {
    return <div>Course or chapter not found for Course ID: {courseId.toString()}, Chapter ID: {chapterId.toString()}</div>;
  }

  const handleStartLesson = (lessonId: number) => {
    router.push(`/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}/`);
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
              <BreadcrumbLink href={"/course/" + courseId}>{course.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>{chapter.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-4">{course.name} - {chapter.name}</h1>
        {chapter.lessons.length === 0 ? (
          <div>No lessons found for this chapter.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {chapter.lessons.map((lesson) => (
              <Card key={lesson.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{lesson.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Pages: {lesson.pages.length}</p>
                  {lesson.pages.length > 0 && <p>First page: {lesson.pages[0].name}</p>}
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button
                    // className="w-full bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleStartLesson(lesson.id)}
                    disabled={lesson.pages.length === 0}
                  >
                    {lesson.pages.length > 0 ? 'Start Lesson' : 'No Pages Available'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// export const getStaticParams = () => {
//   const paramsList = courseStructure.courses.map((course) => {
//     return course.chapters.map((chapter) => {
//       return {
//         courseId: String(course.id),
//         chapterId: String(chapter.id),
//       };
//     });
//   });

//   return {
//     params: paramsList.flat(),
//     fallback: false,
//   };
// };
