import { ChatInitialState, Conversation, Message } from "@/types/chatType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: ChatInitialState = {
  conversation_list: [],
  active_chat: null,
  messages: []
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversation_list = action.payload;
    },
    setActiveChat: (state, action: PayloadAction<Conversation | null>) => {
      state.active_chat = action.payload;
    },
    set_messages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    clearAll: (state:any) => {
      state.conversation_list = [];
      state.active_chat = null;
      state.messages = [];
    }
  }
});
export const {setConversations, setActiveChat,set_messages,clearAll} = chatSlice.actions;

export default chatSlice.reducer;
