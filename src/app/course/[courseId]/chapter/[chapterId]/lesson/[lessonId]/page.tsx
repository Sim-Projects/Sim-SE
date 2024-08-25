"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
// import DataShardingLesson from "@/contents/courses/1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/1_Introduction_to_Data_Sharding";
import Image from "next/image";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { courseStructure } from '@/contents/course_structure';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Lesson({ params }: {
  params: {
    courseId: Number,
    chapterId: Number,
    lessonId: Number
  }
}) {
  const [pageContents, setPageContents] = useState({});
  const router = useRouter();
  const courseId = params.courseId;
  const chapterId = params.chapterId;
  const lessonId = params.lessonId;

  // Find the course, chapter, and lesson
  const course = courseStructure.courses.find(c => c.id === Number(courseId));
  const chapter = course?.chapters.find(ch => ch.id === Number(chapterId));
  const lesson = chapter?.lessons.find(l => l.id === Number(lessonId));

  if (!course || !chapter || !lesson) {
    return <div>Content not found for Course ID: {courseId.toString()}, Chapter ID: {chapterId.toString()}, Lesson ID: {lessonId.toString()}</div>;
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
              <BreadcrumbLink href={"/course/"+courseId}>{course.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={"/chapter/"+chapterId}>{chapter.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-4">{course.name} - {chapter.name} - {lesson.name}</h1>
        <LessonPages pages={lesson.pages} />
      </div>
    </main>
  );
}

interface Page {
  id: number,
  name: string,
  path: string,
  component: React.FC
}

const LessonPages = ({ pages }: {
  pages: Page[]
}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [activePages, setActivePages] = useState<Page[]>();
  const [nextActive, setNextActive] = useState(true);

  const handleNextPage = () => {
    setPageIndex((pageIndex + 1));
  };

  useEffect(() => {
    setActivePages(pages.slice(0, pageIndex));
    setNextActive(pageIndex < pages.length);
  }, [pages, pageIndex]);

  if (!activePages) {
    return <div>Pages not found.</div>;
  }

  return (
    <div>
      {activePages.map((page) => {
        // const Component = dynamic(() => import('../'+page.path),
        // const Component = dynamic(() => import('../' + page.path),
        //   {
        //     ssr: false,
        //     loading: () => <p>Loading Content...</p>,
        // });
        const Component = page.component
        return (
          <div key={page.id} className='m-4 p-4'>
            <Component />
            <Separator className="mt-8" />
          </div>
        );
      })}
      <div className="mt-2">
        <Button onClick={handleNextPage} disabled={!nextActive}>Next Page</Button>
      </div>
    </div>
  );
};

// const courseStructure = {
//   "courses": [
//     {
//       "id": 1,
//       "name": "System Design",
//       "chapters": [
//         {
//           "id": 1,
//           "name": "Data Intensive Applications",
//           "lessons": [
//             {
//               "id": 1,
//               "name": "Data Sharding",
//               "pages": [
//                 {
//                   "id": 1,
//                   "name": "Introduction to Data Sharding",
//                   "path": "1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/1_Introduction_to_Data_Sharding",
//                   "component": DataShardingLesson
//                 },
//                 {
//                   "id": 2,
//                   "name": "Sharding Techniques",
//                   "path": "1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/2_Sharding_Techniques",
//                   "component": DataShardingLesson
//                 },
//                 {
//                   "id": 3,
//                   "name": "Pros and Cons",
//                   "path": "1_System_Design/1_Data_Intensive_Applications/1_Data_Sharding/3_Pros_and_Cons",
//                   "component": DataShardingLesson
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

// export const generateStaticParams = async () => {
//   const params: { courseId: string; chapterId: string; lessonId: string }[] = [];

//   courseStructure.courses.forEach(course => {
//     course.chapters.forEach(chapter => {
//       chapter.lessons.forEach(lesson => {
//         params.push({
//           courseId: course.id.toString(),
//           chapterId: chapter.id.toString(),
//           lessonId: lesson.id.toString(),
//         });
//       });
//     });
//   });

//   return params;
// };
