import React from 'react';
import styles from './Skeleton.module.css';

const Skeleton = ({ count, component }) => {
  const skeletonList = [];
  for (let i = 0; i < count; i += 1) {
    skeletonList.push(i);
  }
  if (component === 'newsItem') {
    return (
      <>
        {skeletonList.map(item => (
          <li className={styles.card} key={item}></li>
        ))}
      </>
    );
  }
  if (component === 'story') {
    return <div className={styles.story}></div>;
  }
  if (component === 'comment') {
    return <div className={styles.comment}></div>;
  }
};

export default Skeleton;
