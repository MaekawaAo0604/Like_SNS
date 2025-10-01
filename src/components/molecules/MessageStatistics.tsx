import React, { useMemo } from 'react';
import { useMessageStore } from '../../stores';
import { calculateMessageStatistics } from '../../utils/calculateMessageStatistics';

export const MessageStatistics: React.FC = () => {
  const { currentRoom } = useMessageStore();

  const statistics = useMemo(() => {
    if (!currentRoom) {
      return null;
    }
    return calculateMessageStatistics(currentRoom.messages);
  }, [currentRoom]);

  if (!statistics || statistics.totalMessages === 0) {
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          メッセージ統計
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          メッセージがありません
        </p>
      </div>
    );
  }

  const mostActiveDay = Object.entries(statistics.messagesPerDay).sort(
    ([, a], [, b]) => b - a
  )[0];

  const mostActiveHour = Object.entries(statistics.messagesPerHour).sort(
    ([, a], [, b]) => b - a
  )[0];

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const daysDiff =
    statistics.firstMessageDate && statistics.lastMessageDate
      ? Math.ceil(
          (statistics.lastMessageDate.getTime() -
            statistics.firstMessageDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const messagesPerDayAverage =
    daysDiff > 0 ? (statistics.totalMessages / daysDiff).toFixed(1) : '0';

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        メッセージ統計
      </h3>

      <div className="space-y-2 text-sm">
        {/* 基本統計 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-white dark:bg-gray-700 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              総メッセージ数
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {statistics.totalMessages}
            </div>
          </div>
          <div className="p-2 bg-white dark:bg-gray-700 rounded">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              1日平均
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {messagesPerDayAverage}
            </div>
          </div>
        </div>

        {/* 送受信統計 */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
            <div className="text-xs text-blue-600 dark:text-blue-400">
              送信メッセージ
            </div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
              {statistics.sentMessages}
            </div>
          </div>
          <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
            <div className="text-xs text-green-600 dark:text-green-400">
              受信メッセージ
            </div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">
              {statistics.receivedMessages}
            </div>
          </div>
        </div>

        {/* メッセージ長統計 */}
        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-1">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            メッセージ長
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-400">平均: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {statistics.averageMessageLength}文字
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">最長: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {statistics.longestMessage}文字
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">最短: </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {statistics.shortestMessage}文字
              </span>
            </div>
          </div>
        </div>

        {/* アクティビティ統計 */}
        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-1">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            アクティビティ
          </div>
          <div className="space-y-1 text-xs">
            {mostActiveDay && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  最多の日:{' '}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {mostActiveDay[0]} ({mostActiveDay[1]}件)
                </span>
              </div>
            )}
            {mostActiveHour && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  最多の時間帯:{' '}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {mostActiveHour[0]}時台 ({mostActiveHour[1]}件)
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 期間統計 */}
        <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded space-y-1">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            期間
          </div>
          <div className="space-y-1 text-xs">
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                最初のメッセージ:{' '}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(statistics.firstMessageDate)}
              </span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">
                最後のメッセージ:{' '}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(statistics.lastMessageDate)}
              </span>
            </div>
            {daysDiff > 0 && (
              <div>
                <span className="text-gray-500 dark:text-gray-400">
                  合計日数:{' '}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {daysDiff}日間
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
