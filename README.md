import React from 'react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const questions = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Explain the concept of hoisting in JavaScript.",
  },
  {
    id: 2,
    title: "React Lifecycle",
    description: "Describe the main lifecycle methods in a React class component.",
  },
  {
    id: 3,
    title: "CSS Flexbox",
    description: "How does the 'flex-grow' property work in a flexbox layout?",
  },
  {
    id: 4,
    title: "API Design",
    description: "What are the key principles of RESTful API design?",
  },
  {
    id: 5,
    title: "Database Optimization",
    description: "Explain the concept of database indexing and its importance.",
  },
];

export default function Component() {
  const [currentQuestion, setCurrentQuestion] = React.useState(1);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <BookIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Final Exam</h1>
        </div>
        <Button size="sm" variant="outline">
          Submit Exam
        </Button>
      </header>
      <div className="flex-1 flex flex-col p-6">
        <div className="mb-8 bg-muted/40 p-6 rounded-lg shadow-md">
          <nav className="flex justify-center gap-4">
            {questions.map((question) => (
              <QuestionNavItem 
                key={question.id}
                number={question.id}
                icon={getQuestionIcon(question.id)}
                isActive={currentQuestion === question.id}
                onClick={() => setCurrentQuestion(question.id)}
              />
            ))}
          </nav>
        </div>
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{questions[currentQuestion - 1].title}</CardTitle>
              <CardDescription>{questions[currentQuestion - 1].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-center h-[300px] bg-muted rounded-md">
                  <Button variant="outline" size="lg">
                    <VideoIcon className="h-6 w-6 mr-2" />
                    Turn on webcam
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="answer" className="text-sm font-medium">
                    Your answer
                  </Label>
                  <Textarea id="answer" placeholder="Type your answer here..." rows={5} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function QuestionNavItem({ number, icon: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-3 rounded-md transition-all duration-200 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-lg scale-110'
          : 'hover:bg-muted hover:text-primary'
      }`}
    >
      <Icon className={`h-6 w-6 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
      <span className={`text-sm font-medium ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
        Question {number}
      </span>
    </button>
  )
}

function getQuestionIcon(questionNumber) {
  const icons = [Clock1Icon, Link2Icon, Disc3Icon, CodeIcon, TypeIcon];
  return icons[(questionNumber - 1) % icons.length];
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function Clock1Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 14.5 8" />
    </svg>
  )
}


function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}


function Disc3Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
    </svg>
  )
}


function Link2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 17H7A5 5 0 0 1 7 7h2" />
      <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  )
}


function TypeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" x2="15" y1="20" y2="20" />
      <line x1="12" x2="12" y1="4" y2="20" />
    </svg>
  )
}


function VideoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}