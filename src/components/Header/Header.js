import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.dot}></div>
      <div className={styles.box}>
        <h1 className={styles.title}>HackerNews Reader</h1>
      </div>
    </header>
  );
};

export default Header;
