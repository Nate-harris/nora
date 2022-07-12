import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
});
