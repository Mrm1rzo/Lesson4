import { NavLink } from "react-router-dom";
import { GoHome, ImageContainer } from "../components";
import { useGlobalContex } from "../hook/useGlobalContext";

const LikedImages = () => {
  const { likedImages } = useGlobalContex();
  if (likedImages.length == 0) {
    return <GoHome />;
  }

  return (
    <section>
      <div className="align-element pb-5">
        {likedImages.length > 0 && <ImageContainer images={likedImages} />}
      </div>
    </section>
  );
};

export default LikedImages;
