import React from "react";

import Photo from "../Photo";

const DividerPhoto = ({ data = {} }) => {
  const { photo } = data;

  if (!photo) return null;

  return (
    <div
      className="divider"
      style={{ background: data?.backgroundColor?.hex ?? "auto" }}
    >
      <Photo
        className="divider--photo"
        photo={photo}
        width={1600}
        srcSizes={[800, 1000, 1200, 1600]}
        sizes="100vw"
      />
    </div>
  );
};

export default DividerPhoto;
