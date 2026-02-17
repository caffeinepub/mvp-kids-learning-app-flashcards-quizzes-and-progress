import { Topic, getTopicContent } from './learningContent';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getDistractors(correctAnswer: string, allAnswers: string[], count: number): string[] {
  const distractors = allAnswers.filter(a => a !== correctAnswer);
  return shuffleArray(distractors).slice(0, count);
}

export function generateQuiz(topic: Topic): QuizQuestion[] {
  const content = getTopicContent(topic);
  const numQuestions = Math.min(10, content.length);
  
  const selectedItems = shuffleArray(content).slice(0, numQuestions);
  const allAnswers = content.map(item => item.answer);
  
  return selectedItems.map(item => {
    const distractors = getDistractors(item.answer, allAnswers, 3);
    const options = shuffleArray([item.answer, ...distractors]);
    
    let question = '';
    if (topic === 'alphabet') {
      question = `What word starts with the letter ${item.prompt}?`;
    } else if (topic === 'numbers') {
      question = `What is the word for the number ${item.prompt}?`;
    } else if (topic === 'colors') {
      question = `What color is this? ${item.prompt}`;
    } else if (topic === 'shapes') {
      question = `What shape is this? ${item.prompt}`;
    }
    
    return {
      question,
      options,
      correctAnswer: item.answer,
    };
  });
}
