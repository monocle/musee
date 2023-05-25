import FavoriteToggle from "./FavoriteToggle";

export default function GalleryView({
  records,
  page,
  onClickRecord,
}: CollectionViewProps) {
  return (
    <div className="my-2 flex flex-wrap justify-center gap-2 py-4 sm:gap-5 md:gap-8">
      {records.map((record) => (
        <figure
          className="relative w-[22rem] border-4 border-base-200 bg-base-300 py-5"
          id={`record-${record.sequence}`}
          key={record.id}
        >
          <div className="absolute top-0 z-10 flex w-full justify-between">
            <div className="badge-neutral badge text-sm text-neutral-content">
              {record.sequence}
            </div>

            <FavoriteToggle className="btn-xs" page={page} record={record} />
          </div>

          <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
            <div className="absolute inset-0 bg-base-300"></div>
            <img
              className="absolute h-full w-full cursor-pointer object-contain transition-opacity duration-500"
              style={{ opacity: 0 }}
              src={`${record.image_url.xl}`}
              alt={record.title}
              onLoad={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "1")
              }
              onClick={() => onClickRecord(record)}
            />
          </div>

          <figcaption className="pt-2 text-center">
            <div className="truncate px-1 text-sm font-bold">
              {record.title}
            </div>
            <div className="truncate text-sm">{record.artist_name}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
