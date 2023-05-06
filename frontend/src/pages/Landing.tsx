import { Link } from "@tanstack/react-router";
import Header from "../common/Header";

export default function Landing() {
  return (
    <>
      <Header />
      <div
        className="hero h-[80vh]"
        style={{
          backgroundImage: `url("https://ids.lib.harvard.edu/ids/view/18772450")`,
        }}
      >
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center">
          <div className="max-w-md text-gray-100">
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

      <aside className="flex gap-8 px-2 py-2">
        <p className="font-semibold">
          Peach Blossom Spring (after Shao Zhenxian)
        </p>
        <p>Ikeno Taiga 池大雅, Japanese (Kyoto 1723 - 1776)</p>
        <cite>
          <a
            className="link"
            href="https://harvardartmuseums.org/collections/object/201168"
            target="_blank"
            rel="noreferrer"
          >
            Harvard Art Museum
          </a>
        </cite>
      </aside>
    </>
  );
}
