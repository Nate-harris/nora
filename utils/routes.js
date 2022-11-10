export const getActive = (isStatic, pageSlug, router) => {
  if (isStatic !== false) {
    return isStatic == router.pathname.replace(/^\//g, "");
  } else {
    const slugs = [].concat(router.query.slug);
    const currentPath = slugs
      ? slugs.join("/")
      : router.asPath.replace(/^\//g, "");
    return currentPath == pageSlug;
  }
};
