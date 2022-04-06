import { configureStore } from '@reduxjs/toolkit';
import GlobalStateReducer from './globalStateSlice';

export const store = configureStore({
  reducer: {
    GlobalState: GlobalStateReducer,
  },
});
