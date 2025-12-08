import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: number;
  error?: boolean;
  retryData?: {
    message: string;
    chatId: string;
  };
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: number;
}

interface RagState {
  currentChatId: string;
  sessions: Record<string, ChatSession>;
  isStreaming: boolean;
  error: string | null;
}

const initialState: RagState = {
  currentChatId: "",
  sessions: {},
  isStreaming: false,
  error: null,
};

const ragSlice = createSlice({
  name: "rag",
  initialState,
  reducers: {
    // Initialize a new chat session
    initializeChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (!state.sessions[chatId]) {
        state.sessions[chatId] = {
          id: chatId,
          messages: [
            {
              id: `${chatId}_welcome`,
              role: "ai",
              content:
                "Xin chào! Mình là trợ lý ảo của Aurora Hotel. Mình có thể giúp gì cho bạn hôm nay? 😊\n\nVí dụ:\n- Dịch vụ của khách sạn\n- Thông tin phòng\n- Ưu đãi và khuyến mãi",
              timestamp: Date.now(),
            },
          ],
          createdAt: Date.now(),
        };
      }
      state.currentChatId = chatId;
    },

    // Set the current active chat
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },

    // Add a user message
    addUserMessage: (state, action: PayloadAction<{ chatId: string; content: string }>) => {
      const { chatId, content } = action.payload;
      if (state.sessions[chatId]) {
        const message: Message = {
          id: `${chatId}_${Date.now()}`,
          role: "user",
          content,
          timestamp: Date.now(),
        };
        state.sessions[chatId].messages.push(message);
      }
    },

    // Add or update AI message (for streaming)
    addOrUpdateAiMessage: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string; content: string; error?: boolean; retryData?: { message: string; chatId: string } }>
    ) => {
      const { chatId, messageId, content, error, retryData } = action.payload;
      
      if (state.sessions[chatId]) {
        const existingMessageIndex = state.sessions[chatId].messages.findIndex(
          (msg) => msg.id === messageId
        );

        if (existingMessageIndex !== -1) {
          // Update existing message (streaming continuation)
          state.sessions[chatId].messages[existingMessageIndex].content = content;
          if (error !== undefined) {
            state.sessions[chatId].messages[existingMessageIndex].error = error;
          }
          if (retryData) {
            state.sessions[chatId].messages[existingMessageIndex].retryData = retryData;
          }
        } else {
          // Add new AI message
          const message: Message = {
            id: messageId,
            role: "ai",
            content,
            timestamp: Date.now(),
            error,
            retryData,
          };
          state.sessions[chatId].messages.push(message);
        }
      }
    },

    // Set streaming status
    setStreaming: (state, action: PayloadAction<boolean>) => {
      state.isStreaming = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear chat session
    clearChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      if (state.sessions[chatId]) {
        state.sessions[chatId].messages = [state.sessions[chatId].messages[0]]; // Keep welcome message
      }
    },

    // Delete chat session
    deleteChat: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      delete state.sessions[chatId];
      if (state.currentChatId === chatId) {
        state.currentChatId = "";
      }
    },
  },
});

export const {
  initializeChat,
  setCurrentChat,
  addUserMessage,
  addOrUpdateAiMessage,
  setStreaming,
  setError,
  clearChat,
  deleteChat,
} = ragSlice.actions;

export default ragSlice.reducer;
