import React from "react";

export default {
  title: "General Settings",
  name: "generalSettings",
  type: "document",
  groups: [
    { title: "Site Details", name: "details", default: true },
    { title: "Displays", name: "displays" },
    { title: "Advanced", name: "advanced" },
  ],
  fields: [
    {
      title: "Home Page",
      name: "home",
      type: "reference",
      to: [{ type: "page" }],
      description: "This page will show at the root of your domain",
      group: "displays",
    },
    {
      title: "Order Page",
      name: "order",
      type: "reference",
      to: [{ type: "page" }],
      description: "This page will show as the order page of your domain",
      group: "displays",
    },
    {
      title: "Error Page (404)",
      name: "error",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "This page will show for any URL at your domain that does not exist yet",
      group: "displays",
    },
    {
      title: "Site Title",
      name: "siteTitle",
      type: "string",
      description: "The name of your site, usually your company/brand name",
      group: "details",
    },
    {
      title: "Live Site URL",
      description: "The root domain or subdomain of your website",
      name: "siteURL",
      type: "url",
      validation: (Rule) => Rule.required(),
      group: "details",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "General Settings",
      };
    },
  },
};
