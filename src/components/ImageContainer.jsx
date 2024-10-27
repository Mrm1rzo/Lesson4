import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useGlobalContex } from "../hook/useGlobalContext";

const ImageCardSkeleton = () => {
  return <div className="skeleton h-80"></div>;
};

const ImageContainer = ({ images }) => {
  const { likedImages, downloadedImages } = useGlobalContex();
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
    }, 3000);
  }, []);
  return (
    <section className="pt-5">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {images.map((image) => {
            return skeleton ? (
              <ImageCardSkeleton key={image.id} />
            ) : (
              <ImageCard
                key={image.id}
                image={image}
                liked={likedImages.some((img) => {
                  return img.id == image.id;
                })}
                downloaded={downloadedImages.some((img) => {
                  return img.id == image.id;
                })}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </section>
  );
};

export default ImageContainer;
