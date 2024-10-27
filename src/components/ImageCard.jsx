import { FaDownload, FaEye, FaRegEye, FaTrash } from "react-icons/fa";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useGlobalContex } from "../hook/useGlobalContext";

const ImageCard = ({ image, liked, downloaded }) => {
  const { links, urls, user, alt_description } = image;
  const { likedImages, downloadedImages, dispatch } = useGlobalContex();

  const addLikedImage = (image) => {
    const allreadyAdded = likedImages.some((img) => {
      return img.id == image.id;
    });

    if (!allreadyAdded) {
      dispatch({ type: "LIKE", payload: image });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
    }
  };
  const addDownloadedImages = (image) => {
    const allreadyAdded = downloadedImages.some((img) => {
      return img.id == image.id;
    });

    if (!allreadyAdded) {
      dispatch({ type: "DOWNLOAD", payload: image });
    } else {
      dispatch({ type: "NOTDOWNLOAD", payload: image.id });
    }
  };
  return (
    <div className="group relative flex flex-col gap-0">
      <img
        src={urls.small}
        alt={alt_description}
        className="w-full rounded-t-2xl sm:rounded-lg"
      />
      <div className="absolute top-0 z-20 hidden h-full w-full rounded-lg bg-[#00000081] opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex"></div>
      <span className="absolute right-2 top-2 z-40 flex gap-2">
        {!liked && (
          <button
            onClick={() => addLikedImage(image)}
            className="btn btn-ghost invisible hidden text-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:flex"
          >
            <FaHeartCirclePlus className="text-white" />
          </button>
        )}
        {liked && (
          <button
            onClick={() => addLikedImage(image)}
            className="btn btn-ghost invisible hidden text-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:flex"
          >
            <FaHeartCircleMinus className="text-white" />
          </button>
        )}
        {downloaded && (
          <button
            onClick={() => addDownloadedImages(image)}
            className="btn btn-ghost invisible hidden text-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:flex"
          >
            <FaTrash className="text-white" />
          </button>
        )}
        {!downloaded && (
          <a
            target="_blank"
            rel="nofollow"
            download
            onClick={() => addDownloadedImages(image)}
            href={links.download + "&force=true"}
            className="btn btn-ghost invisible hidden text-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:flex"
          >
            <FaDownload className="text-white" />
          </a>
        )}
      </span>
      <span className="absolute left-2 top-2 z-30 flex gap-2">
        <NavLink to={`/imageInfo/${image.id}`}>
          <button className="btn btn-ghost invisible hidden text-xl opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100 sm:flex">
            <FaRegEye className="text-white" />
          </button>
        </NavLink>
      </span>
      <span className="absolute bottom-2 left-3 z-50 hidden items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 sm:flex">
        <img
          src={user.profile_image.large}
          alt={user.bio}
          className="w-10 rounded-full"
        />
        <p className="text-white">{user.name}</p>
      </span>
      <div className="mb-5 flex w-full flex-col gap-3 rounded-b-2xl bg-base-300 px-5 py-3 shadow-xl sm:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={user.profile_image.large}
              alt={user.bio}
              className="w-10 rounded-full"
            />
            <p className="">{user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            {liked && (
              <button
                onClick={() => addLikedImage(image)}
                className="btn btn-primary btn-sm"
              >
                <FaHeartCircleMinus className="text-white" />
              </button>
            )}
            {!liked && (
              <button
                onClick={() => addLikedImage(image)}
                className="btn btn-primary btn-sm"
              >
                <FaHeartCirclePlus className="text-white" />
              </button>
            )}
            {downloaded && (
              <button
                onClick={() => addDownloadedImages(image)}
                className="btn btn-primary btn-sm"
              >
                <FaTrash className="text-white" />
              </button>
            )}
            {!downloaded && (
              <a
                target="_blank"
                rel="nofollow"
                download
                href={links.download + "&force=true"}
                className="btn btn-primary btn-sm"
              >
                <FaDownload
                  onClick={() => addDownloadedImages(image)}
                  className="text-white"
                />
              </a>
            )}
          </div>
        </div>
        <NavLink
          to={`/imageInfo/${image.id}`}
          className="btn btn-sm bg-base-100"
        >
          More info
        </NavLink>
      </div>
    </div>
  );
};

export default ImageCard;
