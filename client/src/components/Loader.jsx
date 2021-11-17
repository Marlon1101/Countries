import React from "react";
import styles from "./Styles/Loader.module.css";

export default function Loader() {
  return (
    <div id={styles.background}>
      <div id={styles.container}>
        <div id={styles.loader} />
      </div>
    </div>
  );
}
