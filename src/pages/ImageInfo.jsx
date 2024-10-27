import { useParams } from "react-router-dom";
import { useFetch } from "../hook/useFetch";
import { Error, Loading } from "../components";
import {
  FaHeart,
  FaDownload,
  FaEye,
  FaLink,
  FaInstagram,
  FaTwitter,
  FaPassport,
  FaUser,
  FaInfo,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import Errorr from "../components/Errorr";
import { FaLocationDot } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { useGlobalContex } from "../hook/useGlobalContext";

const ImageInfoSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-3 md:flex-row">
      <div className="skeleton h-96 grow md:h-[500px]"></div>
      <div className="flex h-96 grow flex-col gap-4 md:h-[500px]">
        <div className="skeleton w-full grow"></div>
        <div className="skeleton w-full grow"></div>
      </div>
    </div>
  );
};

const ImageInfo = () => {
  const { id } = useParams();
  const { data, isPending, error } =
    useFetch(`https://api.unsplash.com/photos/${id}?&client_id=${import.meta.env.VITE_ACCESS_KEY}
`);
  const [copied, setCopied] = useState(false);
  const { likedImages, downloadedImages, dispatch } = useGlobalContex();
  const [skeleton, setSkeleton] = useState(true);

  const textToCopy = data?.urls.regular;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy); // Matnni clipboardga yozish
      setCopied(true); // Nusxa olindi holatiga o'zgartirish
      setTimeout(() => setCopied(false), 2000); // 2 sekunddan keyin "Nusxa olindi" statusini olib tashlash
    } catch (err) {
      console.error("Nusxa olishda xatolik yuz berdi:", err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
    }, 3000);
  }, []);

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
    <section className="align-element py-5">
      {skeleton ? (
        <ImageInfoSkeleton />
      ) : (
        <div className="flex md:gap-5">
          <figure>
            <img
              src={data?.urls.regular}
              alt="Shoes"
              className="hidden w-full rounded-3xl shadow-xl md:flex"
            />
          </figure>
          <div className="flex flex-col gap-5">
            <div className="card w-full bg-base-300 shadow-xl">
              <figure>
                <img
                  src={data?.urls.regular}
                  alt="Shoes"
                  className="w-full md:hidden"
                />
              </figure>
              <div className="card-body">
                <h1 className="card-title text-2xl md:text-4xl">Image info</h1>
                {data?.description && (
                  <p className="text-lg font-semibold">
                    Description:
                    <span className="ml-2 text-base font-normal">
                      {data?.description}
                    </span>
                  </p>
                )}
                {data?.created_at && (
                  <p className="text-lg font-semibold">
                    Created:
                    <span className="ml-2 text-base font-normal">
                      {data?.created_at.substring(0, 10)}
                    </span>
                  </p>
                )}
                {data?.location.name && (
                  <p className="text-lg font-semibold">
                    Location:
                    <span className="ml-2 text-base font-normal">
                      {data?.location.name}
                    </span>
                  </p>
                )}
                <div className="flex w-full flex-wrap gap-3 md:flex-col">
                  <div class="join flex w-full grow sm:w-2/5 md:w-full">
                    <button
                      onClick={() => addLikedImage(data)}
                      class="btn join-item flex grow justify-start"
                    >
                      Like
                      <FaHeart />
                    </button>
                    <button class="btn btn-disabled join-item grow">
                      {data?.likes}
                    </button>
                  </div>
                  <div class="join flex w-full grow sm:w-2/5 md:w-full">
                    <a
                      onClick={() => addDownloadedImages(data)}
                      target="_blank"
                      rel="nofollow"
                      download
                      href={data?.links.download + "&force=true"}
                      class="btn join-item flex grow justify-start"
                    >
                      Download
                      <FaDownload />
                    </a>
                    <button class="btn btn-disabled join-item grow">
                      {data?.downloads}
                    </button>
                  </div>

                  <button
                    onClick={handleCopy}
                    class="btn join-item flex w-full grow justify-start sm:w-2/5 md:w-full"
                  >
                    {copied ? "Link copied!" : "Copy link"}
                    <FaLink />
                  </button>
                  <div class="join flex w-full grow sm:w-2/5 md:w-full">
                    <button class="btn btn-disabled join-item flex grow justify-start">
                      Views <FaEye />
                    </button>
                    <button class="btn btn-disabled join-item grow">
                      {data?.views}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card w-full bg-base-300 shadow-xl">
              <div className="card-body">
                <h1 className="card-title text-2xl md:text-4xl">User info</h1>

                <div className="avatar mx-auto w-full">
                  <div class="mask mask-hexagon mx-auto w-64">
                    <img
                      className="w0f mask mask-hexagon mx-auto w-10"
                      src={data?.user.profile_image.large}
                    />
                  </div>
                </div>
                <p className="flex items-center text-lg font-semibold">
                  <FaUser className="text-5xl" />
                  <span className="ml-2 flex flex-col gap-1 text-base font-normal">
                    <span className="text-xl">{data?.user.name}</span>
                    <span className="text-xl">@{data?.user.username}</span>
                  </span>
                </p>

                {data?.user.bio && (
                  <p className="flex items-center text-lg font-semibold">
                    <FaInfo className="text-3xl" />
                    <span className="ml-2 text-lg font-normal">
                      {data?.user.bio}
                    </span>
                  </p>
                )}
                {data?.user.location && (
                  <p className="flex items-center text-lg font-semibold">
                    <FaLocationDot className="text-3xl" />
                    <span className="ml-2 text-lg font-normal">
                      {data?.user.location}
                    </span>
                  </p>
                )}
                <div className="join join-horizontal mt-3 flex w-full">
                  {data?.twitter_username && (
                    <a
                      href={data?.twitter_username}
                      className="group btn join-item grow bg-cyan-500"
                    >
                      <FaTwitter className="text-2xl text-black group-hover:text-cyan-500" />
                    </a>
                  )}
                  {data?.instagram_username && (
                    <a
                      href={data?.instagram_username}
                      className="hover:text- group btn join-item grow bg-fuchsia-700"
                    >
                      <FaInstagram className="text-2xl text-black group-hover:text-fuchsia-700" />
                    </a>
                  )}
                  {data?.portfolio_url && (
                    <a
                      href={data?.portfolio_url}
                      className="hover:text- group btn join-item grow bg-violet-950"
                    >
                      <TbWorldWww className="text-2xl text-black group-hover:text-violet-950" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageInfo;
