import { ReactNode } from "react";
import styles from "./H2.module.css";

type Props = {
  children: ReactNode;
};

export default function H2({ children }: Props) {
  return <h2 className={styles.h2}>{children}</h2>;
}
