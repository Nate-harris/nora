import { getSanityClient } from "./client";
import * as queries from "./queries";

// Fetch all dynamic docs
export async function getAllDocSlugs(doc) {
  const data = await getSanityClient().fetch(
    `*[_type == "${doc}" && !(_id in [${queries.homeID}, ${queries.errorID}]) && wasDeleted != true && isDraft != true]{ "slug": slug.current }`
  );
  return data;
}

// Fetch a static page with our global data
export async function getStaticPage(pageData, preview) {
  const query = `
  {
    "page": ${pageData},
    ${queries.site}
  }
  `;

  const data = await getSanityClient(preview).fetch(query);

  return data;
}

// Fetch a specific dynamic page with our global data
export async function getPage(slug, preview) {
  const slugs = JSON.stringify([slug, `/${slug}`, `/${slug}/`]);

  const isOrderPageQuery = `
    {
      "page": *[_type == "page" && slug.current in ${slugs}] | order(_updatedAt desc)[0]{
        "id": _id,
        isOrderPage
    }
  }.page.isOrderPage
  `;

  const isOrderPage = await getSanityClient(preview).fetch(isOrderPageQuery);

  const pageQuery = `
    {
      "page": *[_type == "page" && slug.current in ${slugs}] | order(_updatedAt desc)[0]{
        "id": _id,
        hasTransparentHeader,
        isOrderPage,
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
      },
      ${queries.site}
    }
  `;

  const orderPageQuery = `
    {
      "page": *[_type == "page" && slug.current in ${slugs}] | order(_updatedAt desc)[0]{
        "id": _id,
        hasTransparentHeader,
        isOrderPage,
        "data": ${queries.commissionFormQuery},
        title,
        seo
      },
      ${queries.site}
    }
  `;

  const data = await getSanityClient(preview).fetch(
    isOrderPage ? orderPageQuery : pageQuery
  );

  return data;
}

export { queries };
