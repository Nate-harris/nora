import S from "@sanity/desk-tool/structure-builder";
import React from "react";
import { BsReceipt } from "react-icons/bs";
import OrderStatusPreview from "../components/OrderStatusPreview";
export const orders = S.listItem()
  .title("Orders")
  .child(
    S.list()
      .title("Orders")
      .items([
        S.listItem()
          .title("Not Started")
          .id("ordersNotStarted")
          .child(
            S.documentList()
              .title("Orders")
              .filter('_type == "order" && status == "backlog"')
          )
          .icon(() => <OrderStatusPreview status="backlog" />),
        ,
        S.listItem()
          .title("Waiting on Proof Confirmation")
          .id("ordersWaitingOnProof")
          .child(
            S.documentList()
              .title("Orders")
              .filter('_type == "order" && status == "proofSent"')
          )
          .icon(() => <OrderStatusPreview status="proofSent" />),
        S.listItem()
          .title("Waiting to be Shipped")
          .id("ordersWaitingToBeShipped")
          .child(
            S.documentList()
              .title("Orders")
              .filter('_type == "order" && status == "proofConfirmed"')
          )
          .icon(() => <OrderStatusPreview status="proofConfirmed" />),
        ,
        S.listItem()
          .title("Completed")
          .id("completedOrders")
          .child(
            S.documentList()
              .title("Orders")
              .filter('_type == "order" && status == "shipped"')
          )
          .icon(() => <OrderStatusPreview status="shipped" />),
        ,
      ])
  )
  .icon(BsReceipt);
