import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { getItem } from '../../utils/hackerNewsApi';

const storyAdapter = createEntityAdapter();
const initialState = storyAdapter.getInitialState({
  currentStory: null,
  commentStatus: 'idle',
});

export const fetchComment = createAsyncThunk(
  'story/fetchComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const comment = await getItem(commentId);
      return comment;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStory: (state, action) => {
      state.currentStory = action.payload;
    },
    resetCurrentStory: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchComment.pending, (state, action) => {
        state.commentStatus = state.ids.length === 0 ? 'loading' : 'updating';
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        storyAdapter.addOne(state, action.payload);
        state.commentStatus = 'idle';
      })
      .addCase(fetchComment.rejected, (state, action) => {
        state.commentStatus = 'error';
        console.log(action.error);
      });
  },
});

export default storySlice.reducer;

export const { setStory, resetCurrentStory } = storySlice.actions;

export const {
  selectAll: selectComments,
  selectById: selectCommentById,
  selectIds: selectCommentsIds,
} = storyAdapter.getSelectors(state => state.story);
