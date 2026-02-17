import { useCallback } from 'react';
import { AllProgress, TopicProgress, createEmptyProgress } from '@/lib/progressTypes';
import { Topic } from '@/lib/learningContent';
import { useInternetIdentity } from './useInternetIdentity';
import { useSaveProgress } from './useQueries';

const STORAGE_KEY = 'kids-learning-progress';

function loadLocalProgress(): AllProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveLocalProgress(progress: AllProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error);
  }
}

export function useProgress() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const saveProgressMutation = useSaveProgress();

  const getTopicProgress = useCallback((topicId: string): TopicProgress => {
    const allProgress = loadLocalProgress();
    return allProgress[topicId] || createEmptyProgress();
  }, []);

  const updateTopicProgress = useCallback(
    (topicId: string, updates: Partial<TopicProgress>) => {
      const allProgress = loadLocalProgress();
      const current = allProgress[topicId] || createEmptyProgress();
      const updated = { ...current, ...updates };
      allProgress[topicId] = updated;
      saveLocalProgress(allProgress);

      // Sync to backend if authenticated
      if (isAuthenticated) {
        const allTopics = Object.values(allProgress);
        const totalCorrect = allTopics.reduce((sum, t) => {
          if (t.mostRecentScore !== null && t.quizzesTaken > 0) {
            return sum + Math.round((t.mostRecentScore / 100) * 10);
          }
          return sum;
        }, 0);
        const totalIncorrect = allTopics.reduce((sum, t) => {
          if (t.mostRecentScore !== null && t.quizzesTaken > 0) {
            return sum + (10 - Math.round((t.mostRecentScore / 100) * 10));
          }
          return sum;
        }, 0);
        const totalQuestions = allTopics.reduce((sum, t) => sum + t.quizzesTaken * 10, 0);

        saveProgressMutation.mutate({
          correctAnswers: BigInt(totalCorrect),
          incorrectAnswers: BigInt(totalIncorrect),
          totalQuestions: BigInt(totalQuestions),
          timeOnTask: BigInt(0),
        });
      }
    },
    [isAuthenticated, saveProgressMutation]
  );

  const recordFlashcardView = useCallback(
    (topic: Topic) => {
      const current = getTopicProgress(topic);
      updateTopicProgress(topic, {
        flashcardsViewed: current.flashcardsViewed + 1,
      });
    },
    [getTopicProgress, updateTopicProgress]
  );

  const recordQuizCompletion = useCallback(
    (topic: Topic, score: number) => {
      const current = getTopicProgress(topic);
      const newBestScore =
        current.bestScore === null ? score : Math.max(current.bestScore, score);
      
      updateTopicProgress(topic, {
        quizzesTaken: current.quizzesTaken + 1,
        bestScore: newBestScore,
        mostRecentScore: score,
      });
    },
    [getTopicProgress, updateTopicProgress]
  );

  return {
    getTopicProgress,
    recordFlashcardView,
    recordQuizCompletion,
  };
}
