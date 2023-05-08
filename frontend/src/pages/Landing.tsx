import { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { Painting } from "../types";
import Header from "./Header";
import Spinner from "../svgs/Spinner";
import BriefPaintingInfo from "../paintings/BriefPaintingInfo";

const heroPainting: Painting = {
  images: [],
  imagepermissionlevel: 0,
  dated: "Mid Edo period, circa 1757",
  dateend: 1757,
  id: 201168,
  medium:
    "Album leaf or handscroll section(?) mounted as a hanging scroll; ink and light colors on paper; with artist's seal reading Sangaku Dōja",
  title: "Peach Blossom Spring (after Shao Zhenxian)",
  primaryimageurl: "https://nrs.harvard.edu/urn-3:HUAM:DDC100686_dynmc",
  people: [
    {
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
  ],
  colors: [],
  url: "https://www.harvardartmuseums.org/collections/object/201168",
  dimensions:
    "painting proper: H. 30.7 x W. 32.6 cm (12 1/16 x 12 13/16 in.)\r\nmounting, including cord and roller ends: H. 132.7 x W. 54.6 cm (52 1/4 x 21 1/2 in.)",
};

export default function Landing() {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <>
      <Header />
      {!isImgLoaded && (
        <div className="hero h-[80vh]">
          <Spinner />
        </div>
      )}
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
              <h1 className="mb-5 text-5xl font-bold">Artwork to Inspire</h1>
              <p className="mx-auto mb-5 w-72">
                Explore museum paitings and collect the ones that inspire you.
              </p>

              <Link to="/painting">
                <button className="btn-accent btn">Get Started</button>
              </Link>
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
