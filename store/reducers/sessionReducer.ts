import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Session } from '@/types/sessions';

interface SessionState {
  selectedSession: Session | null;  
  sessionList?: Session[];
}

const initialState: SessionState = {
  selectedSession: null,
  sessionList: [],
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSelectedSession: (state, action: PayloadAction<Session | null>) => {
      state.selectedSession = action.payload;
    },
    setSessionList: (state, action: PayloadAction<Session[]>) => {
      state.sessionList = action.payload;
    },
  },
});

export const { setSelectedSession , setSessionList } = sessionSlice.actions;
export default sessionSlice.reducer;
