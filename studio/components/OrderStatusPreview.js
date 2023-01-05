import React from "react";
import PropTypes from "prop-types";

const STATUS_COLOR = {
  backlog: "#ff0000",
  proofSent: "#FFA500",
  proofConfirmed: "#FFFF00",
  shipped: "#00ff00",
};
const OrderStatusPreview = ({ status }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "10%",
        backgroundColor: STATUS_COLOR[status],
        position: "relative",
        overflow: "hidden",
      }}
    ></div>
  );
};
OrderStatusPreview.propTypes = {
  status: PropTypes.node.isRequired,
};

export default OrderStatusPreview;
