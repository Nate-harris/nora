import S from "@sanity/desk-tool/structure-builder";

import {
  GiPalette,
  GiWoodPile,
  GiWoodFrame,
  GiCommercialAirplane,
} from "react-icons/gi";
import { BsGearWideConnected, BsWindow } from "react-icons/bs";

export const storeSettings = S.listItem()
  .title("Order Form Settings")
  .id("orderFormSettings")
  .child(
    S.list()
      .title("Store Settings")
      .items([
        S.listItem()
          .title("Commission Form")
          .child(
            S.editor()
              .title("Commission Form")
              .id("commission")
              .schemaType("commission")
              .documentId("commission")
          )
          .icon(GiWoodPile),

        S.listItem()
          .title("Palettes")
          .child(S.documentTypeList("palette").title("Palettes"))
          .icon(GiPalette),

        S.listItem()
          .title("Frames")
          .child(S.documentTypeList("frame").title("Frames"))
          .icon(GiWoodFrame),

        S.listItem()
          .title("Shipping Options")
          .child(S.documentTypeList("shippingOption").title("Shipping Options"))
          .icon(GiCommercialAirplane),
      ])
  )
  .icon(BsGearWideConnected);
