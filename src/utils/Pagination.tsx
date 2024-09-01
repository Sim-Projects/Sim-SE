import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useRouter } from 'next/navigation'

interface SectionPaginationProps {
  children: ReactNode[];
}

const SectionPagination: React.FC<SectionPaginationProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleFinish = () => {
    router.back();
  };

  useEffect(() => {
    const newSectionRef = sectionRefs.current[currentIndex];
    if (newSectionRef) {
      newSectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setProgress((currentIndex + 1) * 100 / children.length);
  }, [currentIndex]);

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-background p-4 border-b bg-white">
        <div className="mb-2 font-semibold">
          Progress: {Math.round(progress)}%
        </div>
        <Progress value={progress} className="w-full h-2" />
      </div>
      <div>
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current[index] = el;
            }}
            className={`mt-4 transition-opacity duration-500 ${index <= currentIndex ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        {currentIndex === children.length - 1 ? (
          <Button onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Continue <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SectionPagination;