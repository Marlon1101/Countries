import { Link } from "react-router-dom";
import styles from "./Styles/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.container}>
    <div className={styles.background}>
      <div className={styles.content}>
        
        <h1 id={styles.title}>Countries</h1>
        
        <div id={styles.containerLink}>
        <Link to="/home" id={styles.link}>
          Home
        </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
