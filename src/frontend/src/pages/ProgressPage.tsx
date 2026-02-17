import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AuthGateNotice from '@/components/AuthGateNotice';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '@/hooks/useQueries';
import { useProgress } from '@/hooks/useProgress';
import { Trophy, BookOpen, Brain, Star } from 'lucide-react';

export default function ProgressPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile } = useGetCallerUserProfile();
  const { getTopicProgress } = useProgress();

  const topics = [
    { id: 'alphabet', name: 'Alphabet', icon: '🔤' },
    { id: 'numbers', name: 'Numbers', icon: '🔢' },
    { id: 'colors', name: 'Colors', icon: '🎨' },
    { id: 'shapes', name: 'Shapes', icon: '⬛' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-2 font-display">
          Your Learning Progress
        </h2>
        {isAuthenticated && userProfile ? (
          <p className="text-lg text-warm-700">
            Great job, <span className="font-semibold">{userProfile.name}</span>! Keep learning!
          </p>
        ) : (
          <p className="text-lg text-warm-700">See how much you've learned!</p>
        )}
      </div>

      {!isAuthenticated && <AuthGateNotice />}

      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic) => {
          const progress = getTopicProgress(topic.id);
          return (
            <Card key={topic.id} className="border-4 border-warm-300 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-4xl">{topic.icon}</span>
                  <span className="font-display">{topic.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-warm-50 rounded-xl">
                  <BookOpen className="w-6 h-6 text-warm-600" />
                  <div className="flex-1">
                    <p className="text-sm text-warm-600 font-medium">Flashcards Viewed</p>
                    <p className="text-2xl font-bold text-warm-800">{progress.flashcardsViewed}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-warm-50 rounded-xl">
                  <Brain className="w-6 h-6 text-warm-600" />
                  <div className="flex-1">
                    <p className="text-sm text-warm-600 font-medium">Quizzes Taken</p>
                    <p className="text-2xl font-bold text-warm-800">{progress.quizzesTaken}</p>
                  </div>
                </div>

                {progress.bestScore !== null && (
                  <div className="flex items-center gap-3 p-3 bg-warm-50 rounded-xl">
                    <Trophy className="w-6 h-6 text-warm-600" />
                    <div className="flex-1">
                      <p className="text-sm text-warm-600 font-medium">Best Score</p>
                      <p className="text-2xl font-bold text-warm-800">{progress.bestScore}%</p>
                    </div>
                  </div>
                )}

                {progress.mostRecentScore !== null && (
                  <div className="flex items-center gap-3 p-3 bg-warm-50 rounded-xl">
                    <Star className="w-6 h-6 text-warm-600" />
                    <div className="flex-1">
                      <p className="text-sm text-warm-600 font-medium">Latest Score</p>
                      <p className="text-2xl font-bold text-warm-800">{progress.mostRecentScore}%</p>
                    </div>
                  </div>
                )}

                {progress.quizzesTaken === 0 && (
                  <Badge variant="outline" className="w-full justify-center py-2 text-base">
                    No quizzes taken yet
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
