// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// We import object and document schemas
import blockContent from "./blockContent";
import category from "./category";
import product from "./product";
import vendor from "./vendor";
import productVariant from "./productVariant";

import localeString from "./locale/String";
import localeText from "./locale/Text";
import localeBlockContent from "./locale/BlockContent";
import palette from "./palette";
import commission from "./commission";
import commissionColorSelection from "./commissionColorSelection";
import commisionNameSelection from "./commisionNameSelection";
import commissionFrameSelection from "./commissionFrameSelection";
import frame from "./frame";
import commissionShippingSelection from "./commissionShippingSelection";
import order from "./order";
import shippingOption from "./shippingOption";
import landingPage from "./landingPage";

import gridColumn from "./objects/grid-column";
import gridSize from "./objects/grid-size";
import accordion from "./objects/accordion";

import accordions from "./objects/accordions";

import seo from "./objects/seo";
import freeform from "./objects/freeform";
import navPage from "./objects/nav-page";
import navLink from "./objects/nav-link";
import socialLink from "./objects/social-link";
import horizontalRule from "./objects/horizontal-rule";
import simplePortableText from "./objects/portable-simple";
import complexPortableText from "./objects/portable-complex";

import generalSettings from "./documents/settings-general";
import promoSettings from "./documents/settings-promo";
import footerSettings from "./documents/settings-footer";
import seoSettings from "./documents/settings-seo";
import headerSettings from "./documents/settings-header";

import page from "./documents/page";
import grid from "./modules/grid";
import menu from "./documents/menu";
import galleryItem from "./objects/gallery-item";
import gallerySection from "./modules/gallery-section";
import dividerPhoto from "./modules/divider-photo";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    localeText,
    localeBlockContent,
    localeString,
    productVariant,

    palette,
    commission,
    commissionColorSelection,
    commisionNameSelection,
    commissionFrameSelection,
    frame,
    commissionShippingSelection,

    shippingOption,
    landingPage,
    galleryItem,
    gallerySection,
    gridColumn,
    gridSize,
    seo,
    socialLink,
    navLink,
    navPage,
    horizontalRule,
    simplePortableText,
    complexPortableText,
    freeform,
    accordion,
    accordions,
    page,
    grid,
    menu,
    dividerPhoto,
    generalSettings,
    promoSettings,
    footerSettings,
    seoSettings,
    headerSettings,
  ]),
});
