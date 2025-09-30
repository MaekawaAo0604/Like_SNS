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
  createRoom: (name: string) => ChatRoom;
  deleteRoom: (roomId: string) => void;
  loadRoom: (roomId: string) => void;
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
          return {
            currentRoom: {
              ...state.currentRoom,
              messages: [...state.currentRoom.messages, message],
              updatedAt: new Date(),
            },
          };
        }),

      updateMessage: (id, updates) =>
        set((state) => {
          if (!state.currentRoom) return state;
          return {
            currentRoom: {
              ...state.currentRoom,
              messages: state.currentRoom.messages.map((msg) =>
                msg.id === id ? { ...msg, ...updates } : msg,
              ),
              updatedAt: new Date(),
            },
          };
        }),

      deleteMessage: (id) =>
        set((state) => {
          if (!state.currentRoom) return state;
          return {
            currentRoom: {
              ...state.currentRoom,
              messages: state.currentRoom.messages.filter(
                (msg) => msg.id !== id,
              ),
              updatedAt: new Date(),
            },
          };
        }),

      clearMessages: () =>
        set((state) => {
          if (!state.currentRoom) return state;
          return {
            currentRoom: {
              ...state.currentRoom,
              messages: [],
              updatedAt: new Date(),
            },
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
    }),
    {
      name: 'sns-chat-mockup-storage',
    },
  ),
);
