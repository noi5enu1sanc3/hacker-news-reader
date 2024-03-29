import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.creditsContainer}>
        <p className={styles.creditsText}>Powered by</p>
        <a
          href='https://github.com/HackerNews/API'
          rel='noreferrer'
          target='_blank'
          className={styles.link}
        >
          HackerNews API
        </a>
      </div>
      <a
        href='https://github.com/noi5enu1sanc3/hacker-news-reader'
        rel='noreferrer'
        target='_blank'
        className={styles.link}
      >
        Source code
      </a>
    </footer>
  );
};

export default Footer;
