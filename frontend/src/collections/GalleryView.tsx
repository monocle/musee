export default function GalleryView({
  paintings,
  onClickPainting,
}: CollectionViewProps) {
  return (
    <div className="my-2 flex flex-wrap justify-center gap-8 py-4 lg:gap-6">
      {paintings.map((painting) => (
        <figure
          className="relative w-80 border-4 border-base-200 bg-base-300 py-5"
          key={painting.id}
        >
          <div className="badge-neutral badge absolute top-0 text-sm text-neutral-content">
            {painting.sequence}
          </div>

          <div className="relative mx-auto flex h-72 w-72 items-center justify-center">
            <div className="absolute inset-0 bg-base-300"></div>
            <img
              className="absolute h-full w-full cursor-pointer object-contain transition-opacity duration-500"
              style={{ opacity: 0 }}
              src={`${painting.primaryimageurl}?height=288&width=288`}
              alt={painting.title}
              onLoad={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "1")
              }
              onClick={() => onClickPainting(painting.id)}
            />
          </div>

          <figcaption className="pt-2 text-center">
            <div className="truncate px-1 text-sm font-bold">
              {painting.title}
            </div>
            <div className="truncate text-sm">{painting.artist.name}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
