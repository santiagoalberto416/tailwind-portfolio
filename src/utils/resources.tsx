// R2 bucket URL for remote images (profile photos, project screenshots).
// For Next.js client-side access, we need the NEXT_PUBLIC_ prefix. The public
// bucket URL is used as a fallback because Cloudflare preview builds don't
// have the variable set, which left preview deployments without images.
export const R2_BUCKET =
  process.env.NEXT_PUBLIC_R2_BUCKET || "https://pub-ea7a2c20aa3640aaacc191568aca07bd.r2.dev";
