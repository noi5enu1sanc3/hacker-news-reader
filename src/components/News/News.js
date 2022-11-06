import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import Skeleton from '../shared/Skeleton/Skeleton';
import { selectNewsIds } from './newsSlice';
import { fetchNews, fetchMoreNews } from './newsSlice';
import { resetCurrentStory } from '../StoryPage/storySlice';
import styles from './News.module.css';
import RefreshButton from '../shared/RefreshButton/RefreshButton';
import { intervalDelay } from '../../utils/constants';
import { setTimer } from '../../utils/helpers/setTimer';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';

const News = () => {
  const [offset, setOffset] = useState(10);

  const dispatch = useDispatch();

  const loadNews = useCallback(() => dispatch(fetchNews()), [dispatch]);

  const loadMoreNews = useCallback(
    () => dispatch(fetchMoreNews(offset)),
    [dispatch, offset]
  );

  const resetStory = useCallback(
    () => dispatch(resetCurrentStory()),
    [dispatch]
  );

  const ids = useSelector(selectNewsIds);
  const news = [...ids].sort((a, b) => b - a);

  const loadingStatus = useSelector(state => state.news.status);

  const isLoading = loadingStatus === 'loading';
  const isUpdating = loadingStatus === 'updating';
  const isError = loadingStatus === 'error';

  const loadMoreHandler = () => {
    setOffset(offset + 20);
    loadMoreNews();
    console.log(offset, news);
  };

  const interval = useRef();

  const onRefresh = () => {
    loadNews();

    clearInterval(interval.current);

    interval.current = setTimer(loadNews, intervalDelay);
  };

  useEffect(() => {
    resetStory();
    loadNews();
  }, [loadNews, resetStory]);

  useEffect(() => {
    interval.current = setTimer(loadNews, intervalDelay);
    return () => clearInterval(interval.current);
  }, [loadNews]);

  if (isError) return <ErrorMessage />;

  return (
    <main className={styles.section}>
      <RefreshButton
        clickHandler={onRefresh}
        isLoading={isLoading || isUpdating}
      />
      <ul className={styles.list}>
        <>
          {isLoading ? (
            <Skeleton count={5} component='newsItem' />
          ) : (
            news.map(id => <NewsItem id={id} key={id} isLoading={isLoading} />)
          )}
        </>
      </ul>
      <LoadMoreButton onLoadMore={loadMoreHandler} isLoading={isLoading} />
    </main>
  );
};

export default News;
