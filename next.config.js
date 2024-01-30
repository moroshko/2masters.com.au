module.exports = {
  images: {
    domains: ["womo-assets.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/apple-developer-merchantid-domain-association",
        destination:
          "/.well-known/apple-developer-merchantid-domain-association.txt",
      },
    ];
  },
};
