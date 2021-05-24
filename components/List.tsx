import { CSSProperties, ReactNode } from "react";
import styles from "./List.module.css";

type ItemProps = {
  children: ReactNode;
};

function Item({ children }: ItemProps) {
  return <li className={styles.item}>{children}</li>;
}

type Props = {
  margin?: string;
  children: ReactNode;
};

function List({ margin, children }: Props) {
  const style: CSSProperties | undefined = margin ? { margin } : undefined;

  return (
    <ul className={styles.list} style={style}>
      {children}
    </ul>
  );
}

List.Item = Item;

export default List;
