import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import Logo from "../pages/Logo";
import { useGetPaintings } from "./usePaintingsApi";
import PageControls from "./PageControls";
import MenuIcon from "../svgs/MenuIcon";
import Spinner from "../svgs/Spinner";
import ThemeIcon from "../common/ThemeIcon";

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
    <div className="lg:flex lg:h-screen lg:flex-col lg:flex-wrap">
      <div className="bg-base-200 px-2 pb-2 lg:order-2 lg:w-1/5 lg:px-2">
        <header className="flex items-center justify-between">
          <Logo />
          <ThemeIcon />
          <button className="btn-ghost btn-square btn">
            <MenuIcon />
          </button>
        </header>
        <div className="mb-3 mt-2 flex justify-center">
          <PageControls
            offset={idx}
            limit={1}
            total={data.records.length}
            showDetails={false}
            onOffsetChange={handleIdxChange}
          />
        </div>
      </div>

      <section className="relative flex w-full items-center justify-center lg:order-1 lg:w-4/5">
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

      <section className="bg-base-200 px-4 pb-4 pt-2 lg:order-3 lg:w-1/5 lg:grow lg:px-4">
        <ul className="list">
          <li className="mb-3">{artist?.name ?? "Unknown"}</li>
          {artist?.culture && <li className="mb-3">{artist.culture}</li>}
          {date !== 0 && <li className="mb-3">{date}</li>}
          <li className="mb-3">{medium}</li>
          <li className="mb-3 text-sm">
            {dimensionsArr?.map((dim) => (
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
          {colors.slice(0, 6).map((color) => (
            <li className="mb-3 text-xs" key={color.color}>
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
