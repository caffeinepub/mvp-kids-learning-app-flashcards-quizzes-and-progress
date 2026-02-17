import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Brain, TrendingUp } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: 'learn' | 'quiz' | 'progress') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="/assets/generated/home-hero.dim_1600x900.png"
          alt="Kids Learning"
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-warm-900/80 to-transparent flex items-end">
          <div className="p-6 md:p-8 text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 font-display">
              Let's Learn Together!
            </h2>
            <p className="text-lg md:text-xl text-warm-100">
              Explore letters, numbers, colors, and shapes in a fun way!
            </p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="border-4 border-warm-300 shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <img
              src="/assets/generated/mascot.dim_768x768.png"
              alt="Friendly mascot"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-md flex-shrink-0"
            />
            <div>
              <h3 className="text-2xl font-bold text-warm-800 mb-2 font-display">
                Welcome, Young Learner!
              </h3>
              <p className="text-warm-700 text-lg leading-relaxed">
                Choose what you want to do today. You can practice with flashcards, take a fun quiz,
                or check your progress. Let's make learning an adventure!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card
          className="border-4 border-warm-300 hover:border-warm-400 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
          onClick={() => onNavigate('learn')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-warm-400 to-warm-500 rounded-3xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-warm-800 font-display">Learn</h3>
            <p className="text-warm-700 text-base">
              Practice with flashcards and discover new things!
            </p>
            <Button size="lg" className="w-full rounded-full font-semibold text-lg h-14">
              Start Learning
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-4 border-warm-300 hover:border-warm-400 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
          onClick={() => onNavigate('quiz')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-warm-500 to-warm-600 rounded-3xl flex items-center justify-center shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-warm-800 font-display">Quiz</h3>
            <p className="text-warm-700 text-base">
              Test your knowledge with fun questions!
            </p>
            <Button size="lg" className="w-full rounded-full font-semibold text-lg h-14">
              Take a Quiz
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-4 border-warm-300 hover:border-warm-400 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
          onClick={() => onNavigate('progress')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-warm-600 to-warm-700 rounded-3xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-warm-800 font-display">Progress</h3>
            <p className="text-warm-700 text-base">
              See how much you've learned so far!
            </p>
            <Button size="lg" className="w-full rounded-full font-semibold text-lg h-14">
              View Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
