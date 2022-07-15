import S from "@sanity/desk-tool/structure-builder";
import { orders } from "./desk/orders";

import { storeSettings } from "./desk/storeSettings";

export default () =>
  S.list()
    .title("Base")
    .items([
      storeSettings,
      S.divider(),
      orders,
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["commission", "palette", "frame", "shippingOption"].includes(
            listItem.getId()
          )
      ),
    ]);
