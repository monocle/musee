import { useState } from "react";
import CollectionLink from "../common/CollectionLink";
import CenterScreenSpinner from "../common/CenterScreenSpinner";

const hero = {
  artist_name: "Francesco Guardi",
  date: "late 1770s",
  image_url:
    "https://www.artic.edu/iiif/2/b553d1fe-da1f-dd9e-ff0f-c36fc22aac0e/full/843,/0/default.jpg",
  origin: "Italy",
  source_url: "http://www.artic.edu/artworks/111610",
  title: "The Garden of Palazzo Contarini dal Zaffo",
};

export default function Landing() {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

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
            src={hero.image_url}
            alt={hero.title}
            className="absolute left-0 top-0 h-full w-full object-cover opacity-60"
            onLoad={() => setIsImgLoaded(true)}
          />

          <div className="hero-content text-center">
            <div className="max-w-md text-accent-content">
              <h1 className="font mb-8 text-5xl">Artwork to Inspire</h1>
              <div className="mx-auto mb-8 w-72">
                <p>Explore paintings from the</p>
                <p className="text-xl font-semibold">
                  Art Institute of Chicago
                </p>
              </div>

              <CollectionLink
                className="btn-accent btn"
                collectionId="aic"
                content="Let's Go"
              />
            </div>
          </div>
        </div>

        <figcaption className="flex gap-2 px-2 py-4 text-center text-sm sm:gap-4 md:gap-8 md:text-base lg:gap-20">
          <p className="w-1/3 font-semibold">{hero.title}</p>
          <p className="w-1/3">
            {hero.artist_name}, {hero.origin} ({hero.date})
          </p>
          <cite className="w-1/3">
            <a
              className="link"
              href={hero.source_url}
              target="_blank"
              rel="noreferrer"
            >
              Art Institute of Chicago
            </a>
          </cite>
        </figcaption>
      </div>
    </>
  );
}
