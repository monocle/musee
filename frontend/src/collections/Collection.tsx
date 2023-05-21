import { useEffect, useRef } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useGetCollection } from "../services/useApi";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "./ListView";
import GalleryView from "./GalleryView";
import PageControls from "./PageControls";
import SelectView from "./SelectView";

export default function Collection() {
  const route = "/collections/$collectionId/";
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { collectionId } = useParams({ from: route });
  const { page, sequence, view } = useSearch({ from: route });
  const { isSuccess, isLoading, isFetching, data, isError, error } =
    useGetCollection({ collectionId, page, view });

  const handlePageChange = (newPage: number) =>
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });

  const handleClickPainting = (painting: Painting) =>
    navigate({
      from: "/collections/$collectionId",
      to: "/collections/$collectionId/paintings/$sequence",
      params: { collectionId, sequence: painting.sequence },
      search: { page, view },
    });

  useEffect(() => {
    if (!sequence) return;

    const elem = document.getElementById(`painting-${sequence}`);

    if (elem && navRef.current) {
      const top =
        elem.getBoundingClientRect().top +
        window.pageYOffset -
        navRef.current.getBoundingClientRect().top -
        navRef.current.offsetHeight;

      window.scrollTo({ top });
    }
  }, [sequence]);

  return (
    <>
      {isLoading && <CenterScreenSpinner />}
      {isError && <ErrorMessage error={error} />}
      {isSuccess && (
        <div className="relative">
          <nav
            ref={navRef}
            className="sticky top-12 z-20 flex flex-wrap items-center justify-center gap-4 bg-base-100 px-2 py-2 md:justify-between lg:px-10"
          >
            <h2 className="text-center font-heading font-bold md:text-xl">
              {collectionId === "ham" ? "Harvard Art Museums" : "Favorites"}
            </h2>
            <SelectView />

            <PageControls
              page={page}
              maxPages={data.maxPages}
              isLoading={isFetching}
              navigate={handlePageChange}
            />
          </nav>

          {view === "gallery" ? (
            <GalleryView
              paintings={data.records}
              onClickPainting={handleClickPainting}
            />
          ) : (
            <ListView
              paintings={data.records}
              onClickPainting={handleClickPainting}
            />
          )}
        </div>
      )}
    </>
  );
}
