import { useState } from "react";
import { useSearch, useNavigate, useParams } from "@tanstack/react-router";
import { useGetCollection } from "../services/useApi";
import useLocalStorage from "../services/useLocalStorage";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import PageControls from "../common/PageControls";
import Header from "../pages/Header";
import ListView from "./ListView";
import GalleryView from "./GalleryView";

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
        <>
          <div className="flex items-center justify-between gap-4 px-2 py-4 lg:px-10">
            <h2 className="text-center font-heading text-2xl font-bold">
              {collectionName === "ham" ? "Harvard Art Museums" : "Favorites"}
            </h2>
            <div className="flex items-center justify-evenly gap-10">
              <div className="text-center">
                <PageControls
                  page={page}
                  maxPages={data.maxPages}
                  isLoading={isFetching}
                  onPageChange={handlePageChange}
                />
              </div>
              <select
                className="select select-xs md:select-sm"
                onChange={(e) => setView(e.target.value)}
              >
                <option value="gallery">Gallery View</option>
                <option value="list">List View</option>
              </select>
            </div>
          </div>

          {view === "gallery" ? (
            <GalleryView collectionRequest={collectionRequest} />
          ) : (
            <ListView collectionRequest={collectionRequest} />
          )}
        </>
      )}
    </div>
  );
}
