import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Story.module.css';

import { hackerNewsUrl, hackerNewsDomain } from '../../utils/constants';
import { extractDomain } from '../../utils/helpers/extractDomain';
import { convertTime } from '../../utils/helpers/convertTime';
import { sanitizeAndParseHTML } from '../../utils/helpers/sanitizeAndParseHTML';

import CommentsList from '../CommentsList/CommentsList';
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage';

const StoryContent = ({ currentStory, id }) => {
  const commentLoadingStatus = useSelector(state => state.story.commentStatus);

  const isCommentLoading = commentLoadingStatus === 'loading';
  const isError = commentLoadingStatus === 'error';

  const source = currentStory.url
    ? extractDomain(currentStory.url)
    : hackerNewsDomain;

  const postedTime = convertTime(currentStory.time);

  const storyText = currentStory.text
    ? sanitizeAndParseHTML(currentStory.text)
    : '';

  return (
    <>
      <article className={styles.storyCard}>
        <a
          href={`${currentStory.url || hackerNewsUrl + id}`}
          target='_blank'
          rel='noreferrer'
          className={styles.linkToSrc}
        >
          <h2 className={styles.title}>{currentStory.title}</h2>
          <p className={styles.source}>{`Read at ${source}`}</p>
        </a>
        <p
          className={styles.info}
        >{`posted: ${postedTime} by ${currentStory.by}`}</p>
        {currentStory.text && <div className={styles.text}>{storyText}</div>}
        <p className={styles.commentsCount}>{`${currentStory.descendants} ${
          currentStory.descendants === 1 ? 'comment' : 'comments'
        }`}</p>
      </article>
      {isError ? (
        <ErrorMessage />
      ) : (
        <>
          {currentStory.kids && (
            <CommentsList story={currentStory} isLoading={isCommentLoading} />
          )}
        </>
      )}
    </>
  );
};

export default StoryContent;
