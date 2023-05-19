import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useGetPainting } from "../services/useApi";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import FavoriteToggle from "./FavoriteToggle";
import Spinner from "../common/Spinner";

export default function Painting() {
  const route = "/paintings/$id";
  const { id } = useParams({ from: route });
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [maxSequence, setMaxSequence] = useState(Infinity);
  const { isLoading, isError, data, error } = useGetPainting(id);

  if (isLoading) {
    return <CenterScreenSpinner />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (maxSequence === Infinity) {
    setMaxSequence(data.maxSequence);
  }

  const painting = data.painting;
  const {
    artist,
    colors,
    date,
    dimensions,
    medium,
    primaryimageurl,
    title,
    url,
  } = painting;

  return (
    <div className="bg-base-200 lg:flex lg:h-screen lg:w-screen lg:flex-col lg:flex-wrap">
      <div className=" px-2 pb-2 lg:order-2 lg:w-1/5 lg:px-2">
        <div className="flex items-center justify-around pb-3 pt-2">
          <FavoriteToggle id={id} />
        </div>
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
          <img
            src={primaryimageurl}
            alt={title}
            className={`h-full w-full object-contain`}
            onLoad={() => setIsImgLoaded(true)}
          />
        </figure>
      </section>

      <section className="overflow-y-auto px-4 pb-4 pt-2 lg:order-3 lg:flex lg:w-1/5 lg:flex-1 lg:px-4">
        <ul className="list">
          <li className="mb-3 font-extrabold">{title}</li>
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
