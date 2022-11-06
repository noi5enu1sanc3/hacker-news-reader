import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css';

const PageNotFound = () => {
  return (
    <section className={styles.notFoundSection}>
      <h2 className={styles.title}>Page not found</h2>
      <p className={styles.emoji}>
        ｀、ヽ｀ヽ｀、ヽ(ノ＞＜)ノ ｀、ヽ｀☂ヽ｀、ヽ
      </p>
      <p className={styles.text}>
        It might be an old link or content was deleted
      </p>
      <Link to='/' className={styles.navLink}>
        <p className={styles.linkText}>Go to main</p>
      </Link>
    </section>
  );
};

export default PageNotFound;
