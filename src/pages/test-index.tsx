import Header from "@/components/header";
import Head from "next/head";
import Content from "@/components/content";
import { FC } from "react";

const MainPage: FC<{}> = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Santiago Kirk Portfolio</title>
        <meta
          name="description"
          content="This is a personal portafolio of Santiago Kirk a Front End React Developer "
          key="desc"
        />
      </Head>
      <Header />
      <Content />
    </div>
  );
};

export default MainPage;
