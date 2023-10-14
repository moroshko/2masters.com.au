import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(
    process.cwd(),
    "public",
    ".well-known",
    "apple-developer-merchantid-domain-association"
  );
  const fileContent = fs.readFileSync(filePath, "utf8");

  res.setHeader("Content-Type", "text/plain");
  res.write(fileContent);
  res.end();
}
