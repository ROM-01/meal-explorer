import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div>
        <div className={styles.space}></div>
        <footer className={styles.footer}>
            <p>
            Meal Explorer © 2025 | Created by Alayna Taylor | Thanks for visiting!
            </p>
        </footer>
    </div>
  );
}
