import { useState } from "react";
import { useSearch, useNavigate, useParams } from "@tanstack/react-router";
import { useGetCollection } from "../services/useApi";
import useLocalStorage from "../services/useLocalStorage";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import Header from "../pages/Header";
import ListView from "./ListView";
import GalleryView from "./GalleryView";
import ViewControls from "./ViewControls";

export default function Collections() {
  const route = "/collections/$collectionName";
  const [view, setView] = useState<string>("gallery");
  const navigate = useNavigate();
  const { collectionName } = useParams({ from: route });
  const search = useSearch({ from: route, strict: false });
  const page = search?.page ?? 1;
  const [storedPage, setStoredPage] = useLocalStorage(
    `${collectionName}-page`,
    page
  );
  const collectionRequest = useGetCollection({ page, collectionName });
  const { isSuccess, isLoading, isFetching, data, isError, error } =
    collectionRequest;

  const handlePageChange = (newPage: number) => {
    if (!data) return;

    navigate({ search: { page: newPage } });
    setStoredPage(newPage);
  };

  if (storedPage !== page) {
    setStoredPage(page);
  }

  return (
    <div>
      <Header />
      {isLoading && <CenterScreenSpinner />}
      {isError && <ErrorMessage error={error} />}
      {isSuccess && (
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 px-2 py-4 md:justify-between lg:px-10">
            <h2 className="text-center font-heading text-2xl font-bold">
              {collectionName === "ham" ? "Harvard Art Museums" : "Favorites"}
            </h2>
            <ViewControls
              onSelectChange={(newView) => setView(newView)}
              page={page}
              maxPages={data.maxPages}
              isLoading={isFetching}
              onPageChange={handlePageChange}
            />
          </div>

          {view === "gallery" ? (
            <GalleryView collectionRequest={collectionRequest} />
          ) : (
            <ListView collectionRequest={collectionRequest} />
          )}

          <div className="flex justify-center px-2 pb-4 md:justify-end lg:px-10">
            <ViewControls
              onSelectChange={(newView) => setView(newView)}
              page={page}
              maxPages={data.maxPages}
              isLoading={isFetching}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}
