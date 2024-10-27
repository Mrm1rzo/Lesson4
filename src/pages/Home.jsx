import { useActionData } from "react-router-dom";
import { Error, ImageContainer, Loading, Search } from "../components";
import { useFetch } from "../hook/useFetch";
import { useEffect, useRef, useState } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

const Home = () => {
  const searchParamFromAction = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageParam, setPageParams] = useState(1);

  const prevSearchParam = useRef(searchParamFromAction);

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${import.meta.env.VITE_ACCESS_KEY}&query=${searchParamFromAction ?? "all"}&page=${pageParam}`,
    // `https://api.unsplash.com/search/photos?client_id=18u_dbAKeQsQKml1QfC7t_D3kN0y3H-nx9NKkDutZU8&query=sex&page=2`,
  );


  useEffect(() => {
    if (data && data.results) {
      setAllImages((prevImages) => {
        return pageParam === 1
          ? data.results
          : [...prevImages, ...data.results];
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchParamFromAction !== prevSearchParam.current) {
      setAllImages([]);
      setPageParams(1);
      prevSearchParam.current = searchParamFromAction;
    }
  }, [searchParamFromAction]);

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section className="py-5">
      <div className="align-element">
        <Search />
        {allImages.length > 0 && <ImageContainer images={allImages} />}
        <button
          onClick={() => {
            setPageParams(pageParam + 1);
          }}
          className="btn btn-primary mt-5 w-full"
        >
          Read more
        </button>
      </div>{" "}
      
    </section>
  );
};

export default Home;
