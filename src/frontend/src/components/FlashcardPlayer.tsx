import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ChevronLeft, ChevronRight, Shuffle, Eye, EyeOff } from 'lucide-react';
import { Topic, getTopicContent } from '@/lib/learningContent';
import { useProgress } from '@/hooks/useProgress';

interface FlashcardPlayerProps {
  topic: Topic;
  onBack: () => void;
}

export default function FlashcardPlayer({ topic, onBack }: FlashcardPlayerProps) {
  const content = getTopicContent(topic);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [items, setItems] = useState(content);
  const { recordFlashcardView } = useProgress();

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (isRevealed) {
      recordFlashcardView(topic);
    }
  }, [isRevealed, topic, recordFlashcardView]);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsRevealed(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  const handleReveal = () => {
    setIsRevealed(!isRevealed);
  };

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
        <Button
          onClick={handleShuffle}
          variant="outline"
          size="lg"
          className="rounded-full font-semibold"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          Shuffle
        </Button>
      </div>

      <div className="text-center">
        <p className="text-lg text-warm-700 font-medium">
          Card {currentIndex + 1} of {items.length}
        </p>
      </div>

      <Card className="border-4 border-warm-300 shadow-2xl min-h-[400px]">
        <CardContent className="p-8 md:p-12 flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h3 className="text-5xl md:text-7xl font-bold text-warm-800 font-display">
              {currentItem.prompt}
            </h3>
            {isRevealed && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-3xl md:text-4xl text-warm-700 font-semibold">
                  {currentItem.answer}
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleReveal}
            size="lg"
            className="rounded-full font-semibold text-xl px-8 py-6 h-auto shadow-lg"
          >
            {isRevealed ? (
              <>
                <EyeOff className="w-6 h-6 mr-2" />
                Hide Answer
              </>
            ) : (
              <>
                <Eye className="w-6 h-6 mr-2" />
                Show Answer
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          size="lg"
          variant="outline"
          className="flex-1 rounded-full font-semibold text-lg h-14"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          size="lg"
          className="flex-1 rounded-full font-semibold text-lg h-14"
        >
          Next
          <ChevronRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </div>
  );
}
