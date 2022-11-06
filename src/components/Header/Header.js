import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.dot}></div>
      <h1 className={styles.title}>HackerNews Reader</h1>
    </header>
  );
};

export default Header;
