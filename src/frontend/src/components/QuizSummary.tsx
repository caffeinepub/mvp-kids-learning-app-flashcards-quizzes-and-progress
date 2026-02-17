import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star } from 'lucide-react';

interface QuizSummaryProps {
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
}

export default function QuizSummary({ totalQuestions, correctAnswers, onRestart }: QuizSummaryProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  let message = '';
  let emoji = '';
  if (percentage === 100) {
    message = 'Perfect! You got them all right!';
    emoji = '🌟';
  } else if (percentage >= 80) {
    message = 'Excellent work! Keep it up!';
    emoji = '🎉';
  } else if (percentage >= 60) {
    message = 'Good job! Practice makes perfect!';
    emoji = '👍';
  } else {
    message = 'Keep trying! You can do it!';
    emoji = '💪';
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-4 border-warm-300 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-warm-400 to-warm-500 rounded-full flex items-center justify-center shadow-lg mb-4">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-4xl font-bold text-warm-800 font-display">
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="text-center space-y-4">
            <p className="text-6xl">{emoji}</p>
            <p className="text-2xl font-bold text-warm-800">{message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-warm-50 rounded-2xl p-6 text-center border-2 border-warm-300">
              <Star className="w-8 h-8 text-warm-600 mx-auto mb-2" />
              <p className="text-sm text-warm-600 font-medium">Your Score</p>
              <p className="text-4xl font-bold text-warm-800">{percentage}%</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-6 text-center border-2 border-warm-300">
              <Trophy className="w-8 h-8 text-warm-600 mx-auto mb-2" />
              <p className="text-sm text-warm-600 font-medium">Correct Answers</p>
              <p className="text-4xl font-bold text-warm-800">
                {correctAnswers}/{totalQuestions}
              </p>
            </div>
          </div>

          <Button
            onClick={onRestart}
            size="lg"
            className="w-full rounded-full font-semibold text-xl py-6 h-auto shadow-lg"
          >
            Back to Topics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
