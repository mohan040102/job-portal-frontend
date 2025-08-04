import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Initial state with proper types
const initialState = {
  type: 'success',
  content: '',
  duration: 5000,
  open: false,
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      const { type, content, duration } = action.payload;
      if (type) state.type = type;
      if (content) state.content = content;
      if (duration !== undefined) state.duration = duration;
      state.open = true;
    },
    clearSnackbar: (state) => {
      state.open = false;
      state.content = '';
      state.duration = 5000;
    },
  },
});

// Export actions
export const { showSnackbar, clearSnackbar } = snackbarSlice.actions;

// Selector function
export const selectSnackbar = (state) => state.snackbar;

// Export reducer
export default snackbarSlice.reducer;
