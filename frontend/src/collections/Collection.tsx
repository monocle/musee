import { useSearch, useNavigate, useParams } from "@tanstack/react-router";
import { useGetCollection } from "../services/useApi";
import useLocalStorage from "../services/useLocalStorage";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import Header from "../pages/Header";
import ListView from "./ListView";
import GalleryView from "./GalleryView";
import PageControls from "./PageControls";

export default function Collections() {
  const route = "/collections/$collectionId";
  const navigate = useNavigate({ from: "/collections/$collectionId" });
  const { collectionId } = useParams({ from: route });
  const search = useSearch({ from: route, strict: false });
  const page = search?.page ?? 1;
  const view = search?.view ?? "gallery";
  const [storedPage, setStoredPage] = useLocalStorage(
    `${collectionId}-page`,
    page
  );
  const collectionRequest = useGetCollection({ page, collectionId });
  const { isSuccess, isLoading, isFetching, data, isError, error } =
    collectionRequest;

  const handlePageChange = (newPage: number) => {
    if (!data) return;

    navigate({ search: (prev) => ({ ...prev, page: newPage }) });
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
              {collectionId === "ham" ? "Harvard Art Museums" : "Favorites"}
            </h2>
            <PageControls
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
            <PageControls
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
