import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cdr } from './cdrModel';

const initialState: { selected: Cdr; selectedBooks: string[]; isLoading: boolean } = {
  selected: '99999',
  isLoading: false,
  selectedBooks: [],
};
const cdrSlice = createSlice({
  name: 'CDR',
  reducers: {
    selectedCdrChanged: (state, action: PayloadAction<Cdr>) => ({ ...state, selected: action.payload }),
    setCdrIsLoading: (state, action: PayloadAction<boolean>) => ({ ...state, isLoading: action.payload }),
    setSelectedBooks: (state, action: PayloadAction<string[]>) => ({ ...state, selectedBooks: action.payload }),
  },
  initialState,
});

export const cdrActions = cdrSlice.actions;
export const cdrReducer = cdrSlice.reducer;
