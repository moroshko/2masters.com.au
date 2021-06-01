import { ReactNode } from "react";
import cx from "classnames";
import styles from "./Button.module.css";

type Props = {
  type?: "button" | "submit";
  loading?: boolean;
  children: ReactNode;
};

export default function Button({
  type = "button",
  loading = false,
  children,
}: Props) {
  return (
    <button className={styles.button} type={type} disabled={loading}>
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span
        className={cx({
          [styles.contentWhenLoading]: loading,
        })}
      >
        {children}
      </span>
    </button>
  );
}
