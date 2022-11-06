import React from 'react';
import styles from './RefreshButton.module.css';

const RefreshButton = ({ clickHandler, isLoading }) => {
  return (
    <button
      type='button'
      onClick={clickHandler}
      className={`${styles.button} ${isLoading && styles.buttonLoading}`}
      disabled={isLoading}
    >
      <span className={styles.buttonText}>
        {`${isLoading ? '(ノ ˘_˘)ノ　ζ|||ζ　ζ|||ζ　ζ|||ζ' : 'Refresh'}`}
      </span>
    </button>
  );
};

export default RefreshButton;
