import React from "react";
import styles from "../styles/LoadingSpinner.module.css";

const LoadingSpinner = () => {
    return (
      <div className={styles.spinnerOverlay}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  };
  
  export default LoadingSpinner;