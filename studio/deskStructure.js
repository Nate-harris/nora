import S from "@sanity/desk-tool/structure-builder";
import { orders } from "./desk/orders";
import { pagesMenu } from "./desk/pages";
import { settingsMenu } from "./desk/settings";

import { storeSettings } from "./desk/storeSettings";

export default () =>
  S.list()
    .title("Base")
    .items([
      pagesMenu,
      S.divider(),
      storeSettings,
      S.divider(),
      settingsMenu,
      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "commission",
            "palette",
            "frame",
            "shippingOption",
            "landingPage",
            "generalSettings",

            "promoSettings",

            "footerSettings",

            "seoSettings",
            "page",
            "galleryItem",
            "gallerySection",
          ].includes(listItem.getId())
      ),
    ]);
