import React from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorEmoji}>(╮°-°)╮┳━━┳ ( ╯°□°)╯ ┻━━┻</p>
      <p className={styles.errorText}>
        Something went wrong. Please try again later
      </p>
    </div>
  );
};

export default ErrorMessage;
