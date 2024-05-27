import Head from "next/head";
import { FC } from "react";

const SEO: FC<{ pageTitle: string; pageDescription: string }> = ({
  pageTitle,
  pageDescription,
}) => (
  <Head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
  </Head>
);

export default SEO;
