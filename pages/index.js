import React from "react";
import Error from "next/error";
import Layout from "../components/Layout/Layout";
import { Module } from "../components/Module/Module";
import { getStaticPage } from "../lib/sanity";
import * as queries from "../lib/sanity/queries";

const Home = ({ data }) => {
  const { site, page } = data;

  if (!page) {
    return (
      <Error
        title={`"Home Page" is not set in Sanity, or the page data is missing`}
        statusCode="Data Error"
      />
    );
  }

  return (
    <Layout site={site} page={page}>
      {page.modules?.map((module, key) => {
        return <Module key={key} index={key} data={module} />;
      })}
    </Layout>
  );
};

export async function getStaticProps({ preview, previewData }) {
  const pageData = await getStaticPage(
    `
    *[_type == "page" && _id == ${queries.homeID}] | order(_updatedAt desc)[0]{
      "id": _id,
      hasTransparentHeader,
      modules[]{
        defined(_ref) => { ...@->content[0] {
          ${queries.modules}
        }},
        !defined(_ref) => {
          ${queries.modules},
        }
      },
      title,
      seo
    }
  `,
    {
      active: preview,
      token: previewData?.token,
    }
  );

  return {
    props: {
      data: pageData,
    },
  };
}

export default Home;
