"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb';
import { useState, useRef, useEffect } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import catalog from '@/contents/catalog';

interface Topic {
  id: string;
  title: string;
  description: string;
  level: string;
  tags: string[];
  component: React.ComponentType;
  thumbnail: string;
}

export default function Home() {
  const router = useRouter();
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null);
  const [isScrollable, setIsScrollable] = useState<Record<string, boolean>>({});
  const descriptionRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  const handleStartTopic = (topicId: string) => {
    router.push(`/topic/${topicId}`);
  };

  const renderStars = (level: string) => {
    const filledStars = parseInt(level, 10);
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${
              i < filledStars 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'fill-transparent text-yellow-400'
            }`} 
          />
        ))}
      </div>
    );
  };

  const handleMouseEnter = (topicId: string) => {
    setHoveredTopic(topicId);
    const element = descriptionRefs.current[topicId];
    if (element) {
      setIsScrollable(prev => ({
        ...prev,
        [topicId]: element.scrollHeight > element.clientHeight
      }));
    }
  };

  const handleMouseLeave = (topicId: string) => {
    setHoveredTopic(null);
    const element = descriptionRefs.current[topicId];
    if (element) {
      element.scrollTop = 0;
    }
  };

  return (
    <main className='flex flex-col justify-center'>
      <div className="space-y-6 p-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-bold mb-6">Topics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalog.topics.map((topic: Topic) => (
            <div key={topic.id} className="relative group h-[480px]">
              <Card 
                className={`absolute inset-0 flex flex-col transition-all duration-300 ease-in-out
                  border border-gray-200
                  ${hoveredTopic === topic.id 
                    ? 'scale-105 shadow-lg z-10 h-[580px] bg-gray-100' 
                    : 'scale-100 shadow z-0 h-[480px] bg-white'
                  }
                `}
                onMouseEnter={() => handleMouseEnter(topic.id)}
                onMouseLeave={() => handleMouseLeave(topic.id)}
              >
                <CardHeader className="p-6 pb-2">
                  <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md">
                    <Image
                      src={topic.thumbnail}
                      alt={`${topic.title} thumbnail`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <CardTitle className="text-xl text-center">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden relative px-6">
                  <p 
                    ref={(el) => {
                      descriptionRefs.current[topic.id] = el;
                    }}
                    className={`transition-all duration-300 ${
                      hoveredTopic === topic.id ? 'overflow-y-auto max-h-[220px] pr-4 pb-20' : 'line-clamp-3'
                    }`}
                  >
                    {topic.description}
                  </p>
                  {hoveredTopic === topic.id && isScrollable[topic.id] && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-100 via-gray-100/70 to-transparent pointer-events-none flex justify-center items-end">
                      <ChevronDown className="w-6 h-6 text-gray-600 animate-bounce" />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-3 mt-auto p-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Complexity:</span>
                    {renderStars(topic.level)}
                  </div>
                  <Button
                    onClick={() => handleStartTopic(topic.id)}
                    className="w-full mt-2"
                  >
                    Start
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}