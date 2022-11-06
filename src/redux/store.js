import { configureStore } from '@reduxjs/toolkit';

import newsReducer from '../components/News/newsSlice';
import storyReducer from '../components/StoryPage/storySlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    story: storyReducer,
  },
});

export default store;
