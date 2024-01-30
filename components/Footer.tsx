import Link from "next/link";
import { FacebookProvider, Like } from "react-facebook";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.basicInfo}>
          <span>{`2 Masters © ${new Date().getFullYear()}`}</span>
          <span className={styles.separator} aria-hidden="true">
            •
          </span>
          <span>All Rights Reserved</span>
          <span className={styles.separator} aria-hidden="true">
            •
          </span>
          <Link href="/privacy-policy">Privacy policy</Link>
          <span className={styles.separator} aria-hidden="true">
            •
          </span>
          <Link href="/terms-of-use">Terms of use</Link>
          <span className={styles.separator} aria-hidden="true">
            •
          </span>
          <span>ARC RTA AU27618</span>
        </p>
        <p className={styles.trademarksInfo}>
          All trademarks, service marks, trade names, product names, logos, and
          images appearing on the site are the property of their respective
          owners.
        </p>
        {/* @ts-expect-error Not sure how to address this. */}
        <FacebookProvider appId="2Masters">
          <Like
            href="https://www.facebook.com/2Masters"
            width={300}
            size="large"
          />
        </FacebookProvider>
      </div>
    </footer>
  );
}
