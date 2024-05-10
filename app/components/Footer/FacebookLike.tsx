"use client";

import { FacebookProvider, Like } from "react-facebook";

const FacebookLike = () => {
  return (
    // @ts-expect-error Not sure how to address this.
    <FacebookProvider appId="2Masters">
      <Like href="https://www.facebook.com/2Masters" width={300} size="large" />
    </FacebookProvider>
  );
};

export { FacebookLike };
