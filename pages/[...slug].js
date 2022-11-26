import React from "react";
import { useRouter } from "next/router";

import { Module } from "../components/Module/Module";
import { getAllDocSlugs, getPage } from "../lib/sanity";
import Layout from "../components/Layout/Layout";
import Order from "../components/Order/Order";
import Header from "../components/Header/Header";

const Page = (props) => {
  const { data } = props;

  const router = useRouter();

  if (typeof navigator !== "undefined") {
    console.log(navigator);
  }
  const { site, page } = data;
  return (
    <>
      {!router.isFallback && (
        <Layout site={site} page={page}>
          {page.isOrderPage ? (
            <Order data={page.data} />
          ) : (
            page.modules?.map((module, key) => (
              <Module key={key} index={key} data={module} />
            ))
          )}
        </Layout>
      )}
    </>
  );
};

export async function getStaticProps({ params, preview, previewData }) {
  const pageData = await getPage(params.slug.join("/"), {
    active: preview,
    token: previewData?.token,
  });

  return {
    props: {
      data: pageData,
    },
  };
}

export async function getStaticPaths() {
  const allPages = await getAllDocSlugs("page");

  return {
    paths:
      allPages?.map((page) => {
        const slugs = page.slug.split("/").filter(Boolean);

        return {
          params: {
            slug: slugs,
          },
        };
      }) || [],
    fallback: false,
  };
}

export default Page;
