import { useState } from "react";
import Header from "./Header";
import ExploreLink from "./ExploreLink";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import BriefPaintingInfo from "../paintings/BriefPaintingInfo";

const heroPainting: Painting = {
  date: "Mid Edo period, circa 1757",
  id: 201168,
  medium:
    "Album leaf or handscroll section(?) mounted as a hanging scroll; ink and light colors on paper; with artist's seal reading Sangaku Dōja",
  title: "Peach Blossom Spring (after Shao Zhenxian)",
  primaryimageurl: "https://nrs.harvard.edu/urn-3:HUAM:DDC100686_dynmc",
  artist: {
    role: "Artist",
    birthplace: "Kyoto",
    gender: "male",
    displaydate: "1723 - 1776",
    prefix: null,
    culture: "Japanese",
    displayname: "Ikeno Taiga 池大雅",
    alphasort: "Ikeno, Taiga",
    name: "Ikeno Taiga 池大雅",
    personid: 28943,
    deathplace: null,
    displayorder: 1,
  },
  colors: [],
  url: "https://www.harvardartmuseums.org/collections/object/201168",
  dimensions: [
    "painting proper: H. 30.7 x W. 32.6 cm (12 1/16 x 12 13/16 in.)",
    "mounting, including cord and roller ends: H. 132.7 x W. 54.6 cm (52 1/4 x 21 1/2 in.)",
  ],
  page: 0,
  sequence: 0,
};

export default function Landing() {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <>
      <Header />
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

              <ExploreLink
                content={<button className="btn-accent btn">Let's Go</button>}
              />
            </div>
          </div>
        </div>
        <BriefPaintingInfo
          painting={heroPainting}
          source="Harvard Art Museum"
        />
      </div>
    </>
  );
}
