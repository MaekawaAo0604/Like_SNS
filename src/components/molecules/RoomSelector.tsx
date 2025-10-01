import React, { useState } from 'react';
import type { ChatRoom } from '../../types';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

interface RoomSelectorProps {
  rooms: ChatRoom[];
  currentRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
  onCreateRoom: (roomName: string) => void;
  onDeleteRoom: (roomId: string) => void;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms,
  currentRoomId,
  onSelectRoom,
  onCreateRoom,
  onDeleteRoom,
}) => {
  const [showRooms, setShowRooms] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      onCreateRoom(newRoomName.trim());
      setNewRoomName('');
      setShowCreateForm(false);
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm('このルームを削除しますか？')) {
      onDeleteRoom(roomId);
    }
  };

  const currentRoom = rooms.find((room) => room.id === currentRoomId);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setShowRooms(!showRooms)}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={showRooms ? 'ルーム一覧を閉じる' : 'ルーム一覧を開く'}
        aria-expanded={showRooms}
      >
        {showRooms ? '💬 ルーム一覧を閉じる' : `💬 ${currentRoom?.name || 'ルームを選択'}`}
      </button>

      {showRooms && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3 border border-gray-200 dark:border-gray-700">
          {/* ルーム一覧 */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              ルーム一覧 ({rooms.length})
            </h4>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={() => {
                      onSelectRoom(room.id);
                      setShowRooms(false);
                    }}
                    className={`flex-1 text-left px-3 py-2 rounded transition-colors ${
                      room.id === currentRoomId
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    aria-label={`ルーム: ${room.name}`}
                    aria-current={room.id === currentRoomId ? 'true' : 'false'}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{room.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {room.messages.length}件
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(room.updatedAt).toLocaleDateString('ja-JP')}
                    </p>
                  </button>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className="px-2 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      aria-label={`${room.name}を削除`}
                      disabled={room.id === currentRoomId}
                    >
                      🗑️
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 新規ルーム作成フォーム */}
          {showCreateForm ? (
            <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
              <Input
                placeholder="ルーム名"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                fullWidth
                aria-label="新しいルーム名"
              />
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleCreateRoom}
                  disabled={!newRoomName.trim()}
                >
                  作成
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewRoomName('');
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="新しいルームを作成"
            >
              ➕ 新しいルームを作成
            </button>
          )}
        </div>
      )}
    </div>
  );
};
