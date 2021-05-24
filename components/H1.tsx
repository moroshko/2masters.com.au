import { ReactNode } from "react";
import styles from "./H1.module.css";

type Props = {
  children: ReactNode;
};

export default function H1({ children }: Props) {
  return <h1 className={styles.h1}>{children}</h1>;
}
