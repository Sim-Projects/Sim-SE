import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";

export const Heading = ({ children }: {
    children: React.ReactNode
}) => (
  <h2 className="text-1xl font-bold">{children}</h2>
);

export const Paragraph = ({ children }: {
    children: React.ReactNode
}) => (
  <p className="text-base leading-relaxed">{children}</p>
);

export const Simulation = ({ children }: {
    children: React.ReactNode
}) => (
  <div className="p-4 border rounded-lg bg-gray-100">{children}</div>
);

export const Quiz = ({ question, choices, correctAnswer, explanations }: {
  question: string;
  choices: string[];
  correctAnswer: string;
  explanations: string[];
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>();
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerClick = (choice: string) => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="space-y-4">
      <p className="text-1xl font-semibold">{question}</p>
      <div className="space-y-2">
        {choices.map((choice, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerClick(choice)}
            className={`w-full ${
              showExplanation && choice === correctAnswer
                ? "bg-green-500"
                : showExplanation && choice === selectedAnswer
                ? "bg-red-500"
                : ""
            }`}
            disabled={showExplanation}
          >
            {choice}
          </Button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-2 p-2 border rounded-lg bg-gray-100">
          {isCorrect ? "Correct!" : "Incorrect."}
          <p>{explanations[0]}</p>
        </div>
      )}
    </div>
  );
};

export const CodeBlock = ({ children }: {
    children: React.ReactNode
}) => (
  <pre className="p-4 bg-gray-800 text-white rounded-md">{children}</pre>
);

export const ImageBlock = ({ src, alt }: {
    src: string;
    alt: string;
}) => <Image src={src} alt={alt} width={300} height={300} />;
