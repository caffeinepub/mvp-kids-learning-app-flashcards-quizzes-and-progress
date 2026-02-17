export type Topic = 'alphabet' | 'numbers' | 'colors' | 'shapes';

export const TOPICS: Topic[] = ['alphabet', 'numbers', 'colors', 'shapes'];

export interface FlashcardItem {
  prompt: string;
  answer: string;
}

const alphabetContent: FlashcardItem[] = [
  { prompt: 'A', answer: 'Apple' },
  { prompt: 'B', answer: 'Ball' },
  { prompt: 'C', answer: 'Cat' },
  { prompt: 'D', answer: 'Dog' },
  { prompt: 'E', answer: 'Elephant' },
  { prompt: 'F', answer: 'Fish' },
  { prompt: 'G', answer: 'Giraffe' },
  { prompt: 'H', answer: 'House' },
  { prompt: 'I', answer: 'Ice Cream' },
  { prompt: 'J', answer: 'Juice' },
  { prompt: 'K', answer: 'Kite' },
  { prompt: 'L', answer: 'Lion' },
  { prompt: 'M', answer: 'Monkey' },
  { prompt: 'N', answer: 'Nest' },
  { prompt: 'O', answer: 'Orange' },
  { prompt: 'P', answer: 'Penguin' },
  { prompt: 'Q', answer: 'Queen' },
  { prompt: 'R', answer: 'Rainbow' },
  { prompt: 'S', answer: 'Sun' },
  { prompt: 'T', answer: 'Tree' },
  { prompt: 'U', answer: 'Umbrella' },
  { prompt: 'V', answer: 'Violin' },
  { prompt: 'W', answer: 'Whale' },
  { prompt: 'X', answer: 'Xylophone' },
  { prompt: 'Y', answer: 'Yellow' },
  { prompt: 'Z', answer: 'Zebra' },
];

const numbersContent: FlashcardItem[] = Array.from({ length: 21 }, (_, i) => ({
  prompt: i.toString(),
  answer: [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen', 'Twenty'
  ][i],
}));

const colorsContent: FlashcardItem[] = [
  { prompt: '🔴', answer: 'Red' },
  { prompt: '🔵', answer: 'Blue' },
  { prompt: '🟡', answer: 'Yellow' },
  { prompt: '🟢', answer: 'Green' },
  { prompt: '🟠', answer: 'Orange' },
  { prompt: '🟣', answer: 'Purple' },
  { prompt: '🟤', answer: 'Brown' },
  { prompt: '⚫', answer: 'Black' },
  { prompt: '⚪', answer: 'White' },
  { prompt: '🩷', answer: 'Pink' },
];

const shapesContent: FlashcardItem[] = [
  { prompt: '⬛', answer: 'Square' },
  { prompt: '🔵', answer: 'Circle' },
  { prompt: '🔺', answer: 'Triangle' },
  { prompt: '⬜', answer: 'Rectangle' },
  { prompt: '⭐', answer: 'Star' },
  { prompt: '💎', answer: 'Diamond' },
  { prompt: '❤️', answer: 'Heart' },
  { prompt: '🔶', answer: 'Hexagon' },
];

export function getTopicContent(topic: Topic): FlashcardItem[] {
  switch (topic) {
    case 'alphabet':
      return alphabetContent;
    case 'numbers':
      return numbersContent;
    case 'colors':
      return colorsContent;
    case 'shapes':
      return shapesContent;
  }
}
