import Link from "next/link";
import { FacebookProvider, Like } from "react-facebook";

export default function Footer() {
  return (
    <footer>
      <p>
        2 Masters © {new Date().getFullYear()}. All Rights Reserved.
        <br />
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
        <br />
        <Link href="/terms-of-use">
          <a>Terms of Use</a>
        </Link>
        <br />
        ARC RTA AU27618
      </p>
      <p>
        All trademarks, service marks, trade names, product names, logos, and
        images appearing on the site are the property of their respective
        owners.
      </p>
      <FacebookProvider appId="2Masters">
        <Like
          href="https://www.facebook.com/2Masters"
          width={200}
          showFaces={false}
        />
      </FacebookProvider>
    </footer>
  );
}
