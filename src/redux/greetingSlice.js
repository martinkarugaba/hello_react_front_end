import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  greeting: null,
  status: 'idle',
  error: null,
};

export const fetchRandomGreeting = createAsyncThunk(
  'greeting/fetchRandomGreeting',
  async () => {
    const response = await fetch('http://localhost:3000/api/greetings/random');
    const data = await response.json();
    return data;
  },
);

const greetingSlice = createSlice({
  name: 'greeting',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.greeting = action.payload.message;
      })
      .addCase(fetchRandomGreeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default greetingSlice.reducer;
