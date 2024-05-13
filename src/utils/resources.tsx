// right now we have the resources in a R2_BUCKET variable, but we can change it to a function that returns the bucket based on the environment. This way we can have different buckets for different environments.
export const R2_BUCKET =
  process.env.R2_BUCKET ||
  "https://pub-ea7a2c20aa3640aaacc191568aca07bd.r2.dev";
