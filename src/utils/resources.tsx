// R2 bucket URL for remote images (profile photos, project screenshots).
// For Next.js client-side access, we need the NEXT_PUBLIC_ prefix. The public
// bucket URL is used as a fallback because Cloudflare preview builds don't
// have the variable set, which left preview deployments without images.
export const R2_BUCKET =
  process.env.NEXT_PUBLIC_R2_BUCKET || "https://pub-ea7a2c20aa3640aaacc191568aca07bd.r2.dev";

// Project screenshots: paths starting with "/" are served from /public, any
// other value is a file name inside the R2 bucket.
export const projectImageUrl = (image: string) =>
  image.startsWith("/") ? image : `${R2_BUCKET}/${image}`;

export const isExternalUrl = (path: string) => /^https?:\/\//.test(path);

// Extra props so links to other sites open in a new tab
export const externalLinkProps = (path: string) =>
  isExternalUrl(path)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

// Short form of a link for the fake browser address bars ("github.com/…")
export const displayPath = (path: string) =>
  path.replace(/^https?:\/\/(www\.)?/, "");
