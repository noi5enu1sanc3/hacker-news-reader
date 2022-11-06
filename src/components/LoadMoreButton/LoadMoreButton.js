import styles from './LoadMoreButton.module.css';
import { useSelector } from 'react-redux';

const LoadMoreButton = ({ onLoadMore }) => {
  const loadingStatus = useSelector(state => state.news.status);

  const isLoading = loadingStatus === 'updating';

  return (
    <button
      onClick={onLoadMore}
      className={`${styles.button} ${isLoading && styles.buttonLoading}`}
      disabled={isLoading}
    >
      <span className={styles.buttonText}>
        {`${isLoading ? '(ノ ˘_˘)ノ　ζ|||ζ　ζ|||ζ　ζ|||ζ' : 'Load more'}`}
      </span>
    </button>
  );
};

export default LoadMoreButton;
