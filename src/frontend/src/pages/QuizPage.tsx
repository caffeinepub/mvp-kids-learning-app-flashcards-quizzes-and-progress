import { useState } from 'react';
import TopicPicker from '@/components/TopicPicker';
import QuizPlayer from '@/components/QuizPlayer';
import { Topic } from '@/lib/learningContent';

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  if (selectedTopic) {
    return (
      <QuizPlayer
        topic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-3 font-display">
          Choose a Quiz Topic
        </h2>
        <p className="text-lg text-warm-700">
          Pick a topic and test your knowledge!
        </p>
      </div>
      <TopicPicker onSelect={setSelectedTopic} />
    </div>
  );
}
