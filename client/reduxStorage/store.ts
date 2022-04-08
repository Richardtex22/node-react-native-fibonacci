import {configureStore} from '@reduxjs/toolkit';
import fiboReducer from './slice';

const store = configureStore({
  reducer: {
    fiboReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
