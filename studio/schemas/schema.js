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
    commission,
    palette,
    commissionColorSelection,
    commisionNameSelection,
    commissionFrameSelection,
    frame,
    commissionShippingSelection,
    order,
    shippingOption,
  ]),
});
