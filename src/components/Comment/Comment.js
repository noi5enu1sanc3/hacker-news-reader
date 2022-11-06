import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment, selectCommentById } from '../StoryPage/storySlice';
import styles from './Comment.module.css';
import { sanitizeAndParseHTML } from '../../utils/helpers/sanitizeAndParseHTML';

const Comment = ({ id }) => {
  const dispatch = useDispatch();

  const [areKidsOpen, setAreKidsOpen] = useState(false);

  const loadComment = useCallback(
    () => dispatch(fetchComment(id)),
    [dispatch, id]
  );

  const comment = useSelector(state => selectCommentById(state, id));

  const onOpenKidsToggle = () => {
    setAreKidsOpen(!areKidsOpen);
  };

  const isCommentAlive =
    comment && !comment.dead && !comment.deleted && comment.text;

  const commentText = isCommentAlive ? sanitizeAndParseHTML(comment.text) : '';

  useEffect(() => {
    loadComment();
  }, [loadComment]);

  return (
    <li className={styles.block}>
      <>
        {comment && (
          <>
            {isCommentAlive ? (
              <p className={styles.info}>{`posted on ${new Date(
                comment.time * 1000
              ).toLocaleString()} || by ${comment.by}`}</p>
            ) : (
              <p>deleted</p>
            )}
            <p className={styles.textContainer}>{commentText}</p>
            <p
              className={`${
                comment.kids
                  ? styles.repliesCountHasReplies
                  : styles.repliesCount
              }`}
            >{`replies: ${comment.kids ? comment.kids.length : '0'}`}</p>
            {comment.kids && (
              <button
                type='button'
                onClick={onOpenKidsToggle}
                className={styles.loadSubcommentsBtn}
                aria-label={`${
                  areKidsOpen ? 'Close subcomments' : 'Open Subcomments'
                }`}
              >{`${areKidsOpen ? '' : '+'}`}</button>
            )}
            {areKidsOpen && (
              <ul className={styles.subcommentsBlock}>
                {comment.kids
                  ? comment.kids.map(kidId => (
                      <Comment key={kidId} id={kidId} />
                    ))
                  : null}
              </ul>
            )}
          </>
        )}
      </>
    </li>
  );
};

export default Comment;
