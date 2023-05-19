import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useGetCollection } from "../services/useApi";
import CenterScreenSpinner from "../common/CenterScreenSpinner";
import ErrorMessage from "../common/ErrorMessage";
import ListView from "./ListView";
import GalleryView from "./GalleryView";
import PageControls from "./PageControls";
import SelectView from "./SelectView";

export default function Collection() {
  const route = "/collections/$collectionId";
  const navigate = useNavigate({ from: route });
  const { collectionId } = useParams({ from: route });
  const { page, view } = useSearch({ from: route });
  const { isSuccess, isLoading, isFetching, data, isError, error } =
    useGetCollection({ collectionId, page, view });

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0 });
    navigate({ search: (prev) => ({ ...prev, page: newPage }) });
  };

  const handleClickPainting = (id: PaintingId) => {
    navigate({
      from: route,
      to: "/paintings/$id",
      params: { id },
    });
  };
  console.log(data);

  return (
    <div className="relative">
      {isLoading && <CenterScreenSpinner />}
      {isError && <ErrorMessage error={error} />}
      {isSuccess && (
        <div className="container relative mx-auto">
          <div className="sticky top-12 z-30 flex flex-wrap items-center justify-center gap-4 bg-base-100 px-2 py-2 md:justify-between lg:px-10">
            <h2 className="text-center font-heading font-bold md:text-xl">
              {collectionId === "ham" ? "Harvard Art Museums" : "Favorites"}
            </h2>
            <SelectView />

            <PageControls
              page={page}
              maxPages={data.maxPages}
              isLoading={isFetching}
              onPageChange={handlePageChange}
            />
          </div>

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
    </div>
  );
}
