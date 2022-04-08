import {bindActionCreators, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {useRef} from 'react';

export interface Result {
  serie: string;
  result: string;
}
export interface InitialState {
  results: Result[];
}

const initialState: InitialState = {
  results: [],
};
export const fiboSlice = createSlice({
  name: 'fibonacci',
  initialState,
  reducers: {
    setCurrentResults: (
      state: InitialState,
      action: PayloadAction<Result[]>,
    ) => {
      state.results = state.results.concat(action.payload);
    },
  },
});

export function useActions() {
  const dispatch = useDispatch();
  const actions = {
    ...fiboSlice.actions,
  };
  const refActions = useRef(bindActionCreators(actions, dispatch));
  return refActions.current;
}

export default fiboSlice.reducer;
