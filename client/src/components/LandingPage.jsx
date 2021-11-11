import { Link } from "react-router-dom";
import styles from "./Styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <h1 id={styles.text}>COUNTRIES</h1>
        <Link to="/home" id={styles.link}>
          Home
        </Link>
      </div>
    </div>
  );
}