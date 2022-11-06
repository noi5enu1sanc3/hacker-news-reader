import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { getNewsIds, getItem } from '../../utils/hackerNewsApi';
import { pickFirstIds } from '../../utils/helpers/pickFirstIds';

const newsAdapter = createEntityAdapter();
const initialState = newsAdapter.getInitialState({
  status: 'idle',
  lastLoaded: null,
});

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, { rejectWithValue }) => {
    try {
      const allIds = await getNewsIds();
      const ids = pickFirstIds(allIds);
      const promises = await ids.map(id => getItem(id));
      const stories = await Promise.all(promises);
      return stories;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchMoreNews = createAsyncThunk(
  'news/fetchMoreNews',
  async (offset, { rejectWithValue }) => {
    try {
      const allIds = await getNewsIds();
      const end = offset + 20;
      const ids = allIds.slice(offset, end).sort((a, b) => a.id - b.id);
      const promises = await ids.map(id => getItem(id));
      const stories = await Promise.all(promises);
      return stories;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNews.pending, (state, action) => {
        state.status = state.ids.length === 0 ? 'loading' : 'updating';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        newsAdapter.setMany(state, action.payload);
        state.status = 'idle';
        state.lastLoaded = Math.min(...state.ids);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'error';
        console.log(action.error);
      })
      .addCase(fetchMoreNews.pending, (state, action) => {
        state.status = 'updating';
      })
      .addCase(fetchMoreNews.fulfilled, (state, action) => {
        newsAdapter.addMany(state, action.payload);
        state.status = 'idle';
        state.lastLoaded = Math.min(...state.ids);
      })
      .addCase(fetchMoreNews.rejected, (state, action) => {
        state.status = 'error';
        console.log(action.error);
      });
  },
});

export default newsSlice.reducer;

export const {
  selectAll: selectNews,
  selectById: selectStoryById,
  selectEntities: selectStories,
  selectIds: selectNewsIds,
} = newsAdapter.getSelectors(state => state.news);
