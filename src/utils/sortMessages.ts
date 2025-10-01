import type { Message } from '../types';
import type { SortType } from '../stores';

export const sortMessages = (
  messages: Message[],
  sortType: SortType
): Message[] => {
  const sorted = [...messages];

  switch (sortType) {
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    case 'oldest':
      return sorted.sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    case 'sender-first':
      return sorted.sort((a, b) => {
        if (a.isSender === b.isSender) {
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        }
        return a.isSender ? -1 : 1;
      });

    case 'receiver-first':
      return sorted.sort((a, b) => {
        if (a.isSender === b.isSender) {
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        }
        return a.isSender ? 1 : -1;
      });

    default:
      return sorted;
  }
};
