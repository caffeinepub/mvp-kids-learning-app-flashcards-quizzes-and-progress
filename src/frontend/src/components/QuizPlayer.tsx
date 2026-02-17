import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Topic } from '@/lib/learningContent';
import { generateQuiz, QuizQuestion } from '@/lib/quizEngine';
import QuizSummary from './QuizSummary';
import { useProgress } from '@/hooks/useProgress';

interface QuizPlayerProps {
  topic: Topic;
  onBack: () => void;
}

export default function QuizPlayer({ topic, onBack }: QuizPlayerProps) {
  const [questions] = useState<QuizQuestion[]>(() => generateQuiz(topic));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { recordQuizCompletion } = useProgress();

  const currentQuestion = questions[currentIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.correctAnswer) {
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      const score = Math.round((correctCount / questions.length) * 100);
      recordQuizCompletion(topic, score);
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    onBack();
  };

  if (isComplete) {
    return (
      <QuizSummary
        totalQuestions={questions.length}
        correctAnswers={correctCount}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          size="lg"
          className="rounded-full font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <div className="text-lg text-warm-700 font-medium">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <Card className="border-4 border-warm-300 shadow-2xl">
        <CardContent className="p-8 md:p-12 space-y-8">
          <h3 className="text-3xl md:text-4xl font-bold text-warm-800 text-center font-display">
            {currentQuestion.question}
          </h3>

          <div className="grid gap-4">
            {currentQuestion.options.map((option, index) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;
              
              let buttonClass = 'border-4 border-warm-300 hover:border-warm-400';
              if (isAnswered) {
                if (isSelected && isCorrect) {
                  buttonClass = 'border-4 border-green-500 bg-green-50';
                } else if (isSelected && !isCorrect) {
                  buttonClass = 'border-4 border-red-500 bg-red-50';
                } else if (isCorrect) {
                  buttonClass = 'border-4 border-green-500 bg-green-50';
                }
              }

              return (
                <Button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  variant="outline"
                  size="lg"
                  className={`h-auto py-6 text-xl font-semibold rounded-2xl ${buttonClass}`}
                >
                  {option}
                </Button>
              );
            })}
          </div>

          {isAnswered && (
            <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <p className="text-2xl font-bold text-green-600">🎉 Correct! Great job!</p>
              ) : (
                <p className="text-2xl font-bold text-red-600">
                  Not quite! The answer is {currentQuestion.correctAnswer}
                </p>
              )}
              <Button
                onClick={handleNext}
                size="lg"
                className="rounded-full font-semibold text-xl px-8 py-6 h-auto shadow-lg"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-warm-700">
        <p className="text-lg font-medium">
          Score: {correctCount} / {currentIndex + (isAnswered ? 1 : 0)}
        </p>
      </div>
    </div>
  );
}
