import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './codeSlice'
const store = configureStore({
  reducer: {
    code: codeReducer,
  },
});

export default store;
