import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface SectionPaginationProps {
  children: ReactNode[];
}

const SectionPagination: React.FC<SectionPaginationProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [progress, setProgress] = React.useState(0)

  const handleNext = () => {
    if (currentIndex < children.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    const newSectionRef = sectionRefs.current[currentIndex];
    if (newSectionRef) {
      newSectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setProgress((currentIndex + 1) * 100 / children.length);
  }, [currentIndex]);

  return (
    <div>
      <div>
        <Progress value={progress} />
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
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={currentIndex === children.length - 1}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SectionPagination;