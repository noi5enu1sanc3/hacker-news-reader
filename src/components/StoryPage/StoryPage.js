import { useEffect, useCallback, useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Story.module.css';

import { setStory } from './storySlice';
import { selectStoryById } from '../News/newsSlice';

import { getItem } from '../../utils/hackerNewsApi';

import { intervalDelay } from '../../utils/constants';
import { setTimer } from '../../utils/helpers/setTimer';

import Skeleton from '../shared/Skeleton/Skeleton';
import RefreshButton from '../shared/RefreshButton/RefreshButton';

import GoBackButton from '../GoBackButton/GoBackButton';
import StoryContent from './StoryContent';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';
import PageNotFound from '../PageNotFound/PageNotFound';

const Story = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  const [currentStory, setCurrentStory] = useState({});
  const [loadingStatus, setLoadingStatus] = useState('idle');

  const interval = useRef();

  const story = useSelector(
    state => selectStoryById(state, id) || state.story.currentStory
  );

  const setStoryState = useCallback(() => {
    setCurrentStory(story);
    dispatch(setStory(story));
  }, [setCurrentStory, story, dispatch]);

  const loadStory = useCallback(async () => {
    setLoadingStatus(`${story ? 'updating' : 'loading'}`);
    const fetchedStory = await getItem(id);
    setCurrentStory(fetchedStory);
    dispatch(setStory(fetchedStory));
    setLoadingStatus('idle');
  }, [dispatch, id, story]);

  const isLoading = loadingStatus === 'loading';
  const isUpdating = loadingStatus === 'updating';
  const isError = loadingStatus === 'error';

  const handleGoBack = () => {
    history.goBack();
  };

  const onRefresh = () => {
    loadStory();

    clearInterval(interval.current);

    interval.current = setTimer(loadStory, intervalDelay);
  };

  useEffect(() => {
    if (story) {
      setStoryState();
    } else {
      loadStory();
    }
  }, [setStoryState, story, loadStory]);

  useEffect(() => {
    interval.current = setTimer(loadStory, intervalDelay);
    return () => clearInterval(interval.current);
  }, [loadStory]);

  if (isError) return <ErrorMessage />;
  if (!story) return <PageNotFound />;

  return (
    <main className={styles.section}>
      <GoBackButton id={id} onGoBack={handleGoBack} />
      {isLoading ? (
        <Skeleton component='story' />
      ) : (
        <StoryContent currentStory={currentStory} id={id} />
      )}
      <RefreshButton
        clickHandler={onRefresh}
        isLoading={isLoading || isUpdating}
      />
    </main>
  );
};

export default Story;
