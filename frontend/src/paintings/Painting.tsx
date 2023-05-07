import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import Logo from "../common/Logo";
import { useGetPaintings } from "./usePaintingsApi";
import PageControls from "./PageControls";
import MenuIcon from "../svgs/MenuIcon";
import Spinner from "../svgs/Spinner";

export default function Painting() {
  const [idx, setIdx] = useState(0);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const { isLoading, isError, data, error } = useGetPaintings({
    offset: 0,
    limit: 100,
  });

  const handleIdxChange = (newIdx: number) => {
    setIdx(newIdx);
    setIsImgLoaded(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorMessage error={error} />;

  const painting = data.records[idx];
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
  } = painting;
  const date = dated ?? dateend;

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <section className="relative flex w-full items-center justify-center lg:w-4/5">
        {!isImgLoaded && <Spinner className="absolute" />}
        <figure
          className={`flex max-w-full flex-col lg:h-screen ${
            isImgLoaded
              ? "opacity-100 transition-opacity duration-1000"
              : "opacity-0"
          }`}
        >
          <figcaption className="my-2 text-center font-bold">
            {title}
          </figcaption>
          <img
            src={primaryimageurl}
            alt={title}
            className={`h-full w-full object-contain`}
            onLoad={() => setIsImgLoaded(true)}
          />
        </figure>
      </section>

      <section className="min-h-screen w-full px-4 py-1 dark:bg-gray-800 lg:w-1/5">
        <div className="flex justify-between">
          <Logo />
          <button className="btn-ghost btn-square btn">
            <MenuIcon />
          </button>
        </div>
        <div className="mb-8 mt-3 flex justify-center">
          <PageControls
            offset={idx}
            limit={1}
            total={data.records.length}
            showDetails={false}
            onOffsetChange={handleIdxChange}
          />
        </div>
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
          {colors.slice(0, 6).map((color) => (
            <li className="mb-2 text-xs" key={color.color}>
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
