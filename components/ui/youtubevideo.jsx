import React, { useState, useEffect, useCallback } from 'react';
import { chatSession } from '@/utils/GeminiAIModal';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MockInterview() {
  const [userInput, setUserInput] = useState({ role: '', skills: '' });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [interimResult, setInterimResult] = useState('');

  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setInterimResult(interimTranscript);
        if (finalTranscript !== '') {
          setAnswers(prev => [...prev, finalTranscript]);
        }
      };

      setRecognition(recognition);
    } else {
      console.error('Speech recognition not supported');
    }
  }, []);

  const generateQuestions = async () => {
    const prompt = `Generate 5 interview questions for a ${userInput.role} position with skills in ${userInput.skills}`;
    const result = await chatSession.sendMessage(prompt);
    setQuestions(result.response.text().split('\n').filter(q => q.trim()));
  };

  const startAnswering = useCallback(() => {
    if (recognition) {
      recognition.start();
      setIsRecording(true);
    }
  }, [recognition]);

  const stopAnswering = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        provideFeedback();
      }
    }
  }, [recognition, currentQuestionIndex, questions.length]);

  const provideFeedback = async () => {
    const prompt = `Provide feedback on these interview answers for a ${userInput.role} position: ${answers.join(' ')}`;
    const result = await chatSession.sendMessage(prompt);
    setFeedback(result.response.text());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Mock Interview</h1>
      {questions.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Start Your Interview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input 
                placeholder="Role" 
                value={userInput.role} 
                onChange={(e) => setUserInput(prev => ({...prev, role: e.target.value}))}
              />
              <Input 
                placeholder="Skills" 
                value={userInput.skills} 
                onChange={(e) => setUserInput(prev => ({...prev, skills: e.target.value}))}
              />
              <Button onClick={generateQuestions}>Start Interview</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{questions[currentQuestionIndex]}</p>
            {!isRecording ? (
              <Button onClick={startAnswering}>Start Answering</Button>
            ) : (
              <Button onClick={stopAnswering} variant="destructive">Stop Answering</Button>
            )}
            {interimResult && (
              <Alert className="mt-4">
                <AlertTitle>Current answer:</AlertTitle>
                <AlertDescription>{interimResult}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}
      {feedback && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{feedback}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}