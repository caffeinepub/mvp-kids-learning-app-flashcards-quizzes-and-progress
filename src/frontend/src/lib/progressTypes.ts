export interface TopicProgress {
  flashcardsViewed: number;
  quizzesTaken: number;
  bestScore: number | null;
  mostRecentScore: number | null;
}

export interface AllProgress {
  [topicId: string]: TopicProgress;
}

export function createEmptyProgress(): TopicProgress {
  return {
    flashcardsViewed: 0,
    quizzesTaken: 0,
    bestScore: null,
    mostRecentScore: null,
  };
}
