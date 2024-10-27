import React from "react";
import { GoHome, ImageContainer } from "../components";
import { useGlobalContex } from "../hook/useGlobalContext";
import { NavLink } from "react-router-dom";

const DownloadedImages = () => {
  const { downloadedImages } = useGlobalContex();

  if (downloadedImages.length == 0) {
    return <GoHome />;
  }
  return (
    <section>
      <div className="align-element pb-5">
        {downloadedImages.length > 0 && (
          <ImageContainer images={downloadedImages} />
        )}
      </div>
    </section>
  );
};

export default DownloadedImages;
