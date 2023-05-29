import { useEffect, useRef } from "react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useGetCollection } from "../../hooks/useApi";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "./ListView";
import GalleryView from "./GalleryView";
import PageControls from "./PageControls";
import SelectView from "./ViewSelect";

export default function Collection() {
  const route = "/collections/$collectionId/";
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { collectionId } = useParams({ from: route });
  const { page, sequence, view } = useSearch({ from: route });
  const { isLoading, isFetching, data, error } = useGetCollection({
    collectionId,
    page,
    view,
  });

  const handlePageChange = (newPage: number) =>
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });

  const handleClickRecord = (record: ApiRecord) => {
    const sequence =
      collectionId === "favorites" && record.favoritesSequence
        ? record.favoritesSequence
        : record.sequence;

    navigate({
      from: "/collections/$collectionId",
      to: "/collections/$collectionId/records/$sequence",
      params: { collectionId, sequence },
      search: { page, view },
    });
  };

  useEffect(() => {
    if (!sequence) return;

    const elem = document.getElementById(`record-${sequence}`);

    if (elem && navRef.current) {
      const top =
        elem.getBoundingClientRect().top +
        window.pageYOffset -
        navRef.current.getBoundingClientRect().top -
        navRef.current.offsetHeight;

      window.scrollTo({ top });
    }
  }, [sequence]);

  if (isLoading) return <CenterScreenSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="relative">
      <nav
        ref={navRef}
        className="sticky top-12 z-20 flex flex-wrap items-center justify-center gap-4 bg-base-100 px-2 py-2 md:justify-between lg:px-10"
        aria-label="Painting navigation"
      >
        <h1 className="text-center font-heading font-bold md:text-xl">
          {collectionId === "aic" ? "Art Institute of Chicago" : "Favorites"}
        </h1>
        <SelectView />

        <PageControls
          page={page}
          maxPages={data.maxPages}
          isLoading={isFetching}
          onPageChange={handlePageChange}
        />
      </nav>

      {view === "gallery" ? (
        <GalleryView
          records={data.records}
          page={page}
          onClickRecord={handleClickRecord}
        />
      ) : (
        <ListView
          records={data.records}
          page={page}
          onClickRecord={handleClickRecord}
        />
      )}
    </div>
  );
}
