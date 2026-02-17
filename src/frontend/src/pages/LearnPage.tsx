import { useState } from 'react';
import TopicPicker from '@/components/TopicPicker';
import FlashcardPlayer from '@/components/FlashcardPlayer';
import { Topic } from '@/lib/learningContent';

export default function LearnPage() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  if (selectedTopic) {
    return (
      <FlashcardPlayer
        topic={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-3 font-display">
          Choose a Topic to Learn
        </h2>
        <p className="text-lg text-warm-700">
          Pick a topic and practice with flashcards!
        </p>
      </div>
      <TopicPicker onSelect={setSelectedTopic} />
    </div>
  );
}
