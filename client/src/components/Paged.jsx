import React from "react";
import styles from "./Styles/Paged.module.css"

export default function Paged({ countriesPerPage, allCountries, paged }) {
  const numberPage = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
    numberPage.push(i);
  }

  return (
    <nav>
      <ul className={styles.paged}>
        {numberPage &&
          numberPage.map((n) => 
          <li className={styles.btn} key={n}>
          <button onClick={() => paged(n)}> {n} </button>
          </li>
          )}
      </ul>
    </nav>
  );
}
