import { useState, useEffect } from "react";
import cx from "classnames";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Splitbee from "./Splitbee";
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

type Props = {
  pageTitle: string;
  pageDescription: string;
};

export default function Header({ pageTitle, pageDescription }: Props) {
  const { pathname } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const title = pageTitle
    ? `${pageTitle} - 2 Masters`
    : "2 Masters - Heating, Cooling, Electrical";

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://2masters.com.au/images/open-graph.png"
        />
        <meta property="og:image:alt" content="2 Masters" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="1200" />
        <meta property="og:url" content="https://2masters.com.au/" />
        <meta property="og:locale" content="en_AU" />
      </Head>
      <Splitbee />
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
                  <Link href={href}>
                    <a className={styles.navItemLink}>{text}</a>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
