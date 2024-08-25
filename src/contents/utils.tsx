import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { CheckCheck, X, CircleHelp } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Fira_Code } from "next/font/google";

const firacode = Fira_Code({ subsets: ["latin"] });

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
      <Card>
        <CardHeader>
          <CardTitle className="text-1xl font-bold">
            <CircleHelp className="h-8 w-4 inline-block" /> Quiz Time!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-1xl font-semibold">{question}</p>
          <div className="space-y-2 py-2">
            <ol className="list-decimal list-inside space-y-1">
              {choices.map((choice, index) => (
                <li>
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(choice)}
                    className={`${showExplanation && choice === correctAnswer
                      ? "bg-green-800"
                      : showExplanation && choice === selectedAnswer
                        ? "bg-red-500"
                        : ""
                      }`}
                    disabled={showExplanation}
                  >
                    {choice}
                  </Button>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
        <CardFooter>
          {showExplanation && (
            <Alert>
              {isCorrect ?
                <>
                  <CheckCheck className="h-4 w-4" />
                  <AlertTitle>Way to go!</AlertTitle>
                </> :
                <>
                  <X className="h-4 w-4" />
                  <AlertTitle>Oops!</AlertTitle>
                </>
              }
              <AlertDescription>
                {explanations[0]}
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export const CodeBlock = ({ children }: {
  children: React.ReactNode
}) => (
  <div className={"p-4 bg-gray-800 text-white rounded-md text-wrap"+firacode.className}>
    {children}
  </div>
);

export const ImageBlock = ({ src, alt }: {
  src: string;
  alt: string;
}) => <Image src={src} alt={alt} width={300} height={300} />;
