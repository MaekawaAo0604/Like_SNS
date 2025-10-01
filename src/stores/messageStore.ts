import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, ChatRoom } from '../types';

interface MessageState {
  currentRoom: ChatRoom | null;
  rooms: ChatRoom[];
  setCurrentRoom: (room: ChatRoom | null) => void;
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  clearMessages: () => void;
  reorderMessages: (fromIndex: number, toIndex: number) => void;
  createRoom: (name: string) => ChatRoom;
  deleteRoom: (roomId: string) => void;
  loadRoom: (roomId: string) => void;
  importRoom: (room: ChatRoom) => void;
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      currentRoom: null,
      rooms: [],

      setCurrentRoom: (room) => set({ currentRoom: room }),

      addMessage: (message) =>
        set((state) => {
          if (!state.currentRoom) return state;
          const updatedRoom = {
            ...state.currentRoom,
            messages: [...state.currentRoom.messages, message],
            updatedAt: new Date(),
          };
          return {
            currentRoom: updatedRoom,
            rooms: state.rooms.map((room) =>
              room.id === updatedRoom.id ? updatedRoom : room,
            ),
          };
        }),

      updateMessage: (id, updates) =>
        set((state) => {
          if (!state.currentRoom) return state;
          const updatedRoom = {
            ...state.currentRoom,
            messages: state.currentRoom.messages.map((msg) =>
              msg.id === id ? { ...msg, ...updates } : msg,
            ),
            updatedAt: new Date(),
          };
          return {
            currentRoom: updatedRoom,
            rooms: state.rooms.map((room) =>
              room.id === updatedRoom.id ? updatedRoom : room,
            ),
          };
        }),

      deleteMessage: (id) =>
        set((state) => {
          if (!state.currentRoom) return state;
          const updatedRoom = {
            ...state.currentRoom,
            messages: state.currentRoom.messages.filter((msg) => msg.id !== id),
            updatedAt: new Date(),
          };
          return {
            currentRoom: updatedRoom,
            rooms: state.rooms.map((room) =>
              room.id === updatedRoom.id ? updatedRoom : room,
            ),
          };
        }),

      clearMessages: () =>
        set((state) => {
          if (!state.currentRoom) return state;
          const updatedRoom = {
            ...state.currentRoom,
            messages: [],
            updatedAt: new Date(),
          };
          return {
            currentRoom: updatedRoom,
            rooms: state.rooms.map((room) =>
              room.id === updatedRoom.id ? updatedRoom : room,
            ),
          };
        }),

      reorderMessages: (fromIndex, toIndex) =>
        set((state) => {
          if (!state.currentRoom) return state;
          const messages = [...state.currentRoom.messages];
          const [movedMessage] = messages.splice(fromIndex, 1);
          messages.splice(toIndex, 0, movedMessage);

          const updatedRoom = {
            ...state.currentRoom,
            messages,
            updatedAt: new Date(),
          };

          return {
            currentRoom: updatedRoom,
            rooms: state.rooms.map((room) =>
              room.id === updatedRoom.id ? updatedRoom : room,
            ),
          };
        }),

      createRoom: (name) => {
        const room: ChatRoom = {
          id: crypto.randomUUID(),
          name,
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          rooms: [...state.rooms, room],
          currentRoom: room,
        }));
        return room;
      },

      deleteRoom: (roomId) =>
        set((state) => ({
          rooms: state.rooms.filter((room) => room.id !== roomId),
          currentRoom:
            state.currentRoom?.id === roomId ? null : state.currentRoom,
        })),

      loadRoom: (roomId) => {
        const room = get().rooms.find((r) => r.id === roomId);
        if (room) {
          set({ currentRoom: room });
        }
      },

      importRoom: (room) =>
        set((state) => {
          // 重複チェック: 同じIDのルームが既に存在する場合は追加しない
          const existingRoom = state.rooms.find((r) => r.id === room.id);
          if (existingRoom) {
            // 既存ルームを現在のルームとして設定
            return { currentRoom: existingRoom };
          }
          // 新しいルームを追加
          return {
            currentRoom: room,
            rooms: [...state.rooms, room],
          };
        }),
    }),
    {
      name: 'sns-chat-mockup-storage',
    },
  ),
);
