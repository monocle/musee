import { useState } from "react";
import CollectionLink from "./CollectionLink";
import CenterScreenSpinner from "../common/CenterScreenSpinner";

const heroPainting = {
  date: "Mid Edo period, circa 1757",
  id: 201168,
  medium:
    "Album leaf or handscroll section(?) mounted as a hanging scroll; ink and light colors on paper; with artist's seal reading Sangaku Dōja",
  title: "Peach Blossom Spring (after Shao Zhenxian)",
  primaryimageurl: "https://nrs.harvard.edu/urn-3:HUAM:DDC100686_dynmc",
  artist: {
    birthplace: "Kyoto",
    displaydate: "1723 - 1776",
    culture: "Japanese",
    name: "Ikeno Taiga 池大雅",
  },
  url: "https://www.harvardartmuseums.org/collections/object/201168",
};

export default function Landing() {
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const artist = heroPainting.artist;

  return (
    <>
      {!isImgLoaded && <CenterScreenSpinner />}
      <div
        className={
          isImgLoaded
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0"
        }
      >
        <div className="hero relative h-[80vh]">
          <img
            src={heroPainting.primaryimageurl}
            alt={heroPainting.title}
            className="absolute left-0 top-0 h-full w-full object-cover opacity-60"
            onLoad={() => setIsImgLoaded(true)}
          />

          <div className="hero-content text-center">
            <div className="max-w-md text-accent-content">
              <h1 className="mb-8 text-5xl font-bold">Artwork to Inspire</h1>
              <div className="mx-auto mb-8 w-72">
                <p>Explore paintings from the</p>
                <p className="text-xl font-bold">Harvard Art Museums</p>
              </div>

              <CollectionLink
                collectionId="ham"
                content={<button className="btn-accent btn">Let's Go</button>}
              />
            </div>
          </div>
        </div>

        <figcaption className="flex gap-2 px-2 py-2 text-sm md:gap-4 md:text-base">
          <p className="font-semibold">{heroPainting.title}</p>
          <p>
            <>
              {artist.name}, {artist.culture} ({artist.birthplace}{" "}
              {artist.displaydate})
            </>
          </p>
          <cite>
            <a
              className="link"
              href={heroPainting.url}
              target="_blank"
              rel="noreferrer"
            >
              Harvard Art Museums
            </a>
          </cite>
        </figcaption>
      </div>
    </>
  );
}
