import { Link } from "@tanstack/react-router";

export default function GalleryView({
  collectionRequest,
}: CollectionViewProps) {
  const collection = "ham";
  const { data } = collectionRequest;

  return (
    <div className="my-2 flex flex-wrap justify-center gap-8 py-4 lg:gap-6">
      {data.records.map(({ artist, id, primaryimageurl, sequence, title }) => (
        <figure
          className="relative w-80 border-4 border-base-200 bg-base-300 py-5"
          key={id}
        >
          <Link
            className="badge-neutral badge absolute top-0 text-sm text-neutral-content hover:text-blue-500"
            to="/explore"
            search={{ collection, painting: sequence }}
          >
            {sequence}
          </Link>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center">
            <div className="absolute inset-0 bg-base-300"></div>
            <img
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
              style={{ opacity: 0 }}
              src={`${primaryimageurl}?height=288&width=288`}
              alt={title}
              onLoad={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "1")
              }
            />
          </div>

          <figcaption className="pt-2 text-center">
            <div className="truncate px-1 text-sm font-bold">{title}</div>
            <div className="truncate text-sm">{artist.name}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
