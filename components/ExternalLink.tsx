import { ReactNode } from "react";

type Props = {
  href: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function ExtrnalLink({ href, onClick, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer" onClick={onClick}>
      {children}
    </a>
  );
}
