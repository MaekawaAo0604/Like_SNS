import React, { useEffect } from 'react';
import { useSearchStore } from '../../stores';
import { useMessageStore } from '../../stores';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export const MessageSearch: React.FC = () => {
  const {
    searchQuery,
    isSearchActive,
    highlightedMessageIds,
    currentHighlightIndex,
    setSearchQuery,
    setIsSearchActive,
    setHighlightedMessageIds,
    clearSearch,
    nextHighlight,
    prevHighlight,
  } = useSearchStore();

  const { currentRoom } = useMessageStore();

  // 検索クエリが変更されたときにメッセージを検索
  useEffect(() => {
    if (!currentRoom || searchQuery.trim() === '') {
      setHighlightedMessageIds([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const matchedIds = currentRoom.messages
      .filter((message) => message.content.toLowerCase().includes(query))
      .map((message) => message.id);

    setHighlightedMessageIds(matchedIds);
  }, [searchQuery, currentRoom, setHighlightedMessageIds]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() !== '' && !isSearchActive) {
      setIsSearchActive(true);
    }
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  const resultCount = highlightedMessageIds.length;
  const currentPosition = currentHighlightIndex >= 0 ? currentHighlightIndex + 1 : 0;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
        メッセージ検索
      </h3>

      <div className="space-y-2">
        <Input
          placeholder="検索ワード"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          aria-label="メッセージ検索"
        />

        {isSearchActive && (
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              {resultCount > 0
                ? `${currentPosition} / ${resultCount} 件`
                : '0 件'}
            </span>

            {resultCount > 0 && (
              <div className="flex gap-1">
                <button
                  onClick={prevHighlight}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label="前の結果"
                  disabled={resultCount === 0}
                >
                  ↑
                </button>
                <button
                  onClick={nextHighlight}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label="次の結果"
                  disabled={resultCount === 0}
                >
                  ↓
                </button>
              </div>
            )}
          </div>
        )}

        {isSearchActive && (
          <Button variant="outline" fullWidth onClick={handleClearSearch}>
            検索をクリア
          </Button>
        )}
      </div>
    </div>
  );
};
