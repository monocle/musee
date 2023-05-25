import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import cache from "../mocks/browser_cache";
import { useGetRecord } from "../services/useApi";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import FavoriteToggle from "./FavoriteToggle";
import Spinner from "../common/Spinner";
import PageControls from "./PageControls";

export default function Painting() {
  const route = "/collections/$collectionId/records/$sequence";
  const navigate = useNavigate();
  const params = useParams({ from: route });
  const search = useSearch({ from: route });
  const { collectionId, sequence } = params;
  const { page } = search;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const { isLoading, data, error } = useGetRecord({
    collectionId,
    page,
    sequence,
  });

  const handlePageChange = (newSequence: number) => {
    setIsImgLoaded(false);
    navigate({
      from: route,
      to: route,
      params: { collectionId, sequence: newSequence },
      search: { page: search.page, view: search.view },
    });
  };

  const navigateToCollection = useCallback(
    () =>
      navigate({
        to: "/collections/$collectionId",
        params,
        search: {
          ...search,
          sequence,
          page: cache.getPageFromSequence(sequence),
        },
      }),
    [params, search, sequence, navigate]
  );

  useEffect(() => {
    if (error && error.type === "missing") {
      if (sequence === 1) {
        navigate({
          to: "/collections/$collectionId",
          params: { collectionId: "favorites" },
          search: { page: 1, view: "gallery" },
        });
      } else {
        navigateToCollection();
      }
    }
  }, [error, navigate, sequence, navigateToCollection]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [sequence]);

  if (error) return <ErrorMessage error={error} />;
  if (isLoading) return <CenterScreenSpinner />;

  const record = data.record;
  const {
    artist_name,
    color,
    date,
    dimensions,
    medium,
    image_url,
    origin,
    title,
    source_url,
    source,
  } = record;

  const hslStr = color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : "";

  return (
    <div className="absolute top-0 z-40 bg-base-200 lg:flex lg:h-screen lg:w-screen lg:flex-col lg:flex-wrap">
      <nav className="sticky top-0 z-50 flex flex-wrap items-center gap-1 bg-base-200 px-2 pb-2 pt-1 sm:flex-row-reverse lg:order-2 lg:w-1/5 lg:flex-col lg:flex-nowrap lg:px-2">
        <PageControls
          className="mx-auto sm:mx-0"
          page={sequence}
          maxPages={data.maxSequence}
          isLoading={isLoading}
          navigate={handlePageChange}
        />
      </nav>

      <section className="relative flex w-full items-center justify-center bg-base-100 lg:order-1 lg:w-4/5">
        {!isImgLoaded && <Spinner className="absolute" />}
        <button
          className="btn-active btn-xs btn absolute right-2 top-2"
          onClick={navigateToCollection}
        >
          X
        </button>
        <figure
          className={`min-h-16 flex max-w-full flex-col px-1 lg:h-screen lg:pb-1 ${
            isImgLoaded
              ? "opacity-100 transition-opacity duration-1000"
              : "opacity-0"
          }`}
        >
          <img
            src={image_url.xl}
            alt={title}
            className={`h-full w-full object-contain`}
            onLoad={() => setIsImgLoaded(true)}
          />
        </figure>
      </section>

      <section className="overflow-y-auto px-4 pb-4 pt-2 lg:order-3 lg:flex lg:w-1/5 lg:flex-1 lg:flex-wrap lg:px-4">
        <FavoriteToggle
          className="btn-block btn-sm my-2 "
          record={record}
          page={page}
        />

        <ul className="list">
          <li className="mb-3 font-extrabold">{title}</li>
          <li className="mb-3 font-bold">{artist_name}</li>
          {origin && <li className="mb-3">{origin}</li>}
          <li className="mb-3">{date}</li>
          <li className="mb-3">{medium}</li>
          <li className="mb-3 lg:text-sm">
            {dimensions.slice(0, 1).map((dim) => (
              <div key={dim}>{dim}</div>
            ))}
          </li>
          <li className="mb-3">
            <a
              className="link-info link"
              href={source_url}
              target="_blank"
              rel="noreferrer"
            >
              {source === "aic" ? "Art Institute of Chicago" : "Museum"}
            </a>
          </li>
          <li className="mb-3 lg:text-xs">
            <div className="flex">
              <div className="w-2/3">{hslStr}</div>
              <div style={{ backgroundColor: hslStr }} className="w-1/3"></div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
