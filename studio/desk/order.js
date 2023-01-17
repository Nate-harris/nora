import S from "@sanity/desk-tool/structure-builder";

import {
  ShoppingCart,
  Gear,
  PaintBrushHousehold,
  FrameCorners,
  Package,
  ProjectorScreen,
} from "phosphor-react";

export const orderMenu = S.listItem()
  .title("Order")
  .child(
    S.list()
      .title("Order")
      .items([
        S.listItem()
          .title("Settings")
          .child(
            S.editor()
              .id("commission")
              .schemaType("commission")
              .documentId("commission")
          )
          .icon(Gear),
        S.listItem()
          .title("Frames")
          .child(S.documentTypeList("frame").title("Frames"))
          .icon(FrameCorners),
        S.listItem()
          .title("Swatches")
          .child(S.documentTypeList("swatch").title("Swatches"))
          .icon(PaintBrushHousehold),

        S.listItem()
          .title("Shipping Options")
          .child(S.documentTypeList("shippingOption").title("Shipping Options"))
          .icon(Package),
        S.listItem()
          .title("Example Colors")
          .child(S.documentTypeList("exampleColor").title("Example Colors"))
          .icon(ProjectorScreen),
      ])
  )
  .icon(ShoppingCart);
