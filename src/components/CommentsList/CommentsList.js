import styles from './CommentsList.module.css';
import Comment from '../Comment/Comment';
import Skeleton from '../shared/Skeleton/Skeleton';
import { useSelector } from 'react-redux';

const CommentsList = ({ story }) => {
  const commentLoadingStatus = useSelector(state => state.story.commentStatus);

  const isLoading = commentLoadingStatus === 'loading';

  return (
    <ul className={styles.commentsList}>
      {isLoading ? (
        <Skeleton component='comment' />
      ) : (
        <>
          {story.kids.map(kidId => (
            <Comment id={kidId} key={kidId} />
          ))}
        </>
      )}
    </ul>
  );
};

export default CommentsList;
