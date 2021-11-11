import React from "react";
import styles from "./Styles/Cards.module.css";

export default function Cards({ img, name, continent}) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>{name}</h3>
        <h5>{continent}</h5>
        <img className={styles.img} src={img} alt="img" />
      </div>
    </div>
  );
}
