import { Card, CardContent } from '@/components/ui/card';
import { Topic, TOPICS } from '@/lib/learningContent';

interface TopicPickerProps {
  onSelect: (topic: Topic) => void;
}

const topicIcons: Record<Topic, string> = {
  alphabet: '/assets/generated/icon-alphabet.dim_512x512.png',
  numbers: '/assets/generated/icon-numbers.dim_512x512.png',
  colors: '/assets/generated/icon-colors.dim_512x512.png',
  shapes: '/assets/generated/icon-shapes.dim_512x512.png',
};

const topicNames: Record<Topic, string> = {
  alphabet: 'Alphabet',
  numbers: 'Numbers',
  colors: 'Colors',
  shapes: 'Shapes',
};

export default function TopicPicker({ onSelect }: TopicPickerProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {TOPICS.map((topic) => (
        <Card
          key={topic}
          className="border-4 border-warm-300 hover:border-warm-400 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-105"
          onClick={() => onSelect(topic)}
        >
          <CardContent className="p-6 text-center space-y-4">
            <img
              src={topicIcons[topic]}
              alt={topicNames[topic]}
              className="w-32 h-32 mx-auto rounded-2xl shadow-md"
            />
            <h3 className="text-2xl md:text-3xl font-bold text-warm-800 font-display">
              {topicNames[topic]}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
