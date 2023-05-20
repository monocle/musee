import { useState } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useGetPainting } from "../services/useApi";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import FavoriteToggle from "./FavoriteToggle";
import Spinner from "../common/Spinner";
import PageControls from "../collections/PageControls";

export default function Painting() {
  const route = "/collections/$collectionId/paintings/$sequence";
  const navigate = useNavigate();
  const params = useParams({ from: route });
  const search = useSearch({ from: route });
  const { collectionId, sequence } = params;
  const { page } = search;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const { isLoading, isError, data, error } = useGetPainting({
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
    });
  };

  const handlOnDismiss = () =>
    navigate({
      to: "/collections/$collectionId",
      params,
      search,
    });

  if (isLoading) {
    return <CenterScreenSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const painting = data.painting;
  const {
    artist,
    colors,
    date,
    dimensions,
    id,
    medium,
    primaryimageurl,
    title,
    url,
  } = painting;

  return (
    <div className="absolute top-0 z-50 bg-base-200 lg:flex lg:h-screen lg:w-screen lg:flex-col lg:flex-wrap">
      <div className="flex flex-wrap items-center gap-1 px-2 pb-2 pt-1 sm:flex-row-reverse lg:order-2 lg:w-1/5 lg:flex-col lg:flex-nowrap lg:px-2">
        <PageControls
          className="mx-auto sm:mx-0"
          page={sequence}
          maxPages={data.maxSequence}
          isLoading={isLoading}
          navigate={handlePageChange}
        />
        <h2 className="mx-auto text-center font-extrabold">{title}</h2>
      </div>

      <section className="relative flex w-full items-center justify-center bg-base-100 lg:order-1 lg:w-4/5">
        {!isImgLoaded && <Spinner className="absolute" />}
        <figure
          className={`flex max-w-full flex-col px-1 lg:h-screen lg:pb-1 ${
            isImgLoaded
              ? "opacity-100 transition-opacity duration-1000"
              : "opacity-0"
          }`}
        >
          <button
            className="btn-active btn-xs btn absolute right-2 top-2"
            onClick={handlOnDismiss}
          >
            X
          </button>
          <img
            src={primaryimageurl}
            alt={title}
            className={`h-full w-full object-contain`}
            onLoad={() => setIsImgLoaded(true)}
          />
        </figure>
      </section>

      <section className="overflow-y-auto px-4 pb-4 pt-2 lg:order-3 lg:flex lg:w-1/5 lg:flex-1 lg:flex-wrap lg:px-4">
        <FavoriteToggle id={id} className="my-2" />
        <ul className="list">
          <li className="mb-3 font-bold">{artist?.name ?? "Unknown"}</li>
          {artist?.culture && <li className="mb-3">{artist.culture}</li>}
          {date !== 0 && <li className="mb-3">{date}</li>}
          <li className="mb-3">{medium}</li>
          <li className="mb-3 lg:text-sm">
            {dimensions.slice(0, 1).map((dim) => (
              <div key={dim}>{dim}</div>
            ))}
          </li>
          <li className="mb-3">
            {url ? (
              <a
                className="link-info link"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                Harvard Art Museum
              </a>
            ) : (
              "None"
            )}
          </li>
          {colors.map((color) => (
            <li className="mb-3 lg:text-xs" key={color.color}>
              <div className="flex">
                <div className="w-2/3">
                  {color.hue} ({color.color})
                </div>
                <div
                  style={{ backgroundColor: color.color }}
                  className="w-1/3"
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
