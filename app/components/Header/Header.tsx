"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Why Us",
    href: "/why-us",
  },
  {
    text: "Heating",
    href: "/heating",
  },
  {
    text: "Cooling",
    href: "/cooling",
  },
  {
    text: "Electrical",
    href: "/electrical",
  },
  {
    text: "Our Clients",
    href: "/our-clients",
  },
  {
    text: "Get a Quote",
    href: "/get-quote",
  },
  {
    text: "Contact Us",
    href: "/contact-us",
  },
];

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <a className={styles.skipToMainContent} href="#main">
        Skip to main content
      </a>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {isMenuOpen && "Menu"}
          <button
            className={styles.menuButton}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setIsMenuOpen((isMenuOpen) => !isMenuOpen);
            }}
          >
            <span
              className={cx(styles.menuButtonLine, styles.menuButtonLineTop, {
                [styles.menuButtonLineTopOpen]: isMenuOpen,
              })}
            />
            <span
              className={cx(
                styles.menuButtonLine,
                styles.menuButtonLineBottom,
                {
                  [styles.menuButtonLineBottomOpen]: isMenuOpen,
                }
              )}
            />
          </button>
        </div>
        <div
          className={cx(styles.banner, {
            [styles.bannerWhenMenuIsOpen]: isMenuOpen,
          })}
        >
          <Image
            className="mx-auto"
            src="/images/header-banner.png"
            alt="2 Masters, phone: 0395155327, email: info@2masters.com.au"
            width={960}
            height={256}
            priority
          />
        </div>
      </header>
      <nav
        className={cx(styles.nav, {
          [styles.navOpen]: isMenuOpen,
        })}
      >
        <ul className={styles.navList}>
          {NAV_LINKS.map(({ text, href }) => {
            const isCurrent = href === pathname;

            return (
              <li
                className={cx(styles.navItem, {
                  [styles.navItemCurrent]: isCurrent,
                })}
                key={text}
              >
                {isCurrent ? (
                  <span className={styles.navItemCurrentText}>{text}</span>
                ) : (
                  <Link href={href} className={styles.navItemLink}>
                    {text}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export { Header };
