export default function GalleryView({
  collectionRequest,
}: CollectionViewProps) {
  const { data } = collectionRequest;

  return (
    <div className="container mx-auto">
      <div className="my-2 flex flex-wrap justify-center gap-10 py-4 lg:gap-6">
        {data.records.map(({ id, primaryimageurl, title }) => (
          <div
            key={id}
            className="relative flex h-80 w-80 items-center justify-center bg-base-200"
          >
            <div className="absolute inset-0 bg-base-300"></div>

            <img
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-500"
              style={{ opacity: 0 }}
              src={`${primaryimageurl}?height=320&width=320`}
              alt={title}
              onLoad={(e) =>
                ((e.target as HTMLImageElement).style.opacity = "1")
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
