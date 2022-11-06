import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStoryById } from '../News/newsSlice';
import styles from './NewsItem.module.css';
import { extractDomain } from '../../utils/helpers/extractDomain';
import { convertTime } from '../../utils/helpers/convertTime';

const NewsItem = ({ id }) => {
  const { path } = useRouteMatch();

  const item = useSelector(state => selectStoryById(state, id));

  const source = item.url ? extractDomain(item.url) : '';

  const postedTime = convertTime(item.time);

  return (
    <li className={styles.block}>
      <Link to={`${path}news/${id}`} className={styles.link}>
        <div className={styles.focusDot}></div>
        <article className={styles.article}>
          <h2 className={styles.title}>
            <span className={styles.rating}>{`▲ ${item.score}`}</span>
            {item.title}
          </h2>
          <div className={styles.attribute}>
            <p className={`${styles.by} ${styles.info}`}>
              by <span className={styles.author}>{`${item.by}`}</span>
            </p>
            {item.url ? (
              <p className={`${styles.source} ${styles.info}`}>{source}</p>
            ) : (
              <p className={`${styles.source} ${styles.info}`}>Ask HN</p>
            )}
          </div>
          <p className={`${styles.date} ${styles.info}`}>{postedTime}</p>
          <p
            className={`${styles.commentsCount} ${styles.info} ${
              item.descendants > 0 && styles.commentsCountHasComments
            }`}
          >{`${item.descendants} ${
            item.descendants === 1 ? 'comment' : 'comments'
          }`}</p>
        </article>
      </Link>
    </li>
  );
};

export default NewsItem;
