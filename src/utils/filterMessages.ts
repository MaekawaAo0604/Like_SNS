import type { Message } from '../types';
import type { FilterType, DateRange } from '../stores';

export const filterMessages = (
  messages: Message[],
  filterType: FilterType,
  dateRange: DateRange
): Message[] => {
  if (filterType === 'all') {
    return messages;
  }

  if (filterType === 'sent') {
    return messages.filter((msg) => msg.isSender);
  }

  if (filterType === 'received') {
    return messages.filter((msg) => !msg.isSender);
  }

  if (filterType === 'date') {
    const { start, end } = dateRange;

    return messages.filter((msg) => {
      const messageDate = new Date(msg.timestamp);

      if (start && end) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);
        return messageDate >= startDate && messageDate <= endDate;
      }

      if (start) {
        const startDate = new Date(start);
        startDate.setHours(0, 0, 0, 0);
        return messageDate >= startDate;
      }

      if (end) {
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);
        return messageDate <= endDate;
      }

      return true;
    });
  }

  return messages;
};
