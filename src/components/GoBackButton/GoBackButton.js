import { Link } from 'react-router-dom';

import styles from './GoBackButton.module.css';

const GoBackButton = ({ id, onGoBack }) => {
  return (
    <Link to={`/#${id}`} className={styles.navLink}>
      <button type='button' onClick={onGoBack} className={styles.backBtn}>
        Go back
      </button>
    </Link>
  );
};

export default GoBackButton;
