import React, { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import Logo from "../common/Logo";
import { useGetPaintings } from "./usePaintingsApi";
import PageControls from "./PageControls";

export default function Painting() {
  const [idx, setIdx] = useState(0);
  const { isLoading, isError, data, error } = useGetPaintings({
    offset: 0,
    limit: 100,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorMessage error={error} />;

  const {
    artist,
    colors,
    dated,
    dateend,
    dimensionsArr,
    medium,
    primaryimageurl,
    title,
    url,
  } = data.records[idx];
  const date = dated ?? dateend;

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <section className="flex w-full items-center justify-center lg:w-4/5">
        <figure>
          <img
            src={primaryimageurl}
            alt={title}
            className="max-w-full object-contain lg:h-screen"
          />
        </figure>
      </section>

      <section className="w-full px-3 py-3 lg:w-1/5">
        <Logo />
        <PageControls
          className="my-4"
          offset={idx}
          limit={1}
          total={data.records.length}
          onOffsetChange={(newIdx) => setIdx(newIdx)}
        />
        <h2 className="mb-4 font-bold lg:text-lg">{title}</h2>

        <ul className="list">
          <li className="mb-2">{artist?.name ?? "Unknown"}</li>
          {artist?.culture && <li className="mb-2">{artist.culture}</li>}
          {date !== 0 && <li className="mb-2">{date}</li>}
          <li className="mb-2">{medium}</li>
          <li className="mb-2 text-sm">
            {dimensionsArr?.map((dim) => (
              <div key={dim}>{dim}</div>
            ))}
          </li>
          <li className="mb-2">
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
          {colors.slice(0, 3).map((color) => (
            <React.Fragment key={color.color}>
              <li className="mb-2">
                {color.hue} ({color.color})
              </li>
              <li
                className="mb-2 h-4 w-full"
                style={{ backgroundColor: color.color }}
              ></li>
            </React.Fragment>
          ))}
        </ul>
      </section>
    </div>
  );
}
