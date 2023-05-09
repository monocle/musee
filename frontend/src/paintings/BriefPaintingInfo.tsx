interface Props {
  painting: Painting;
  source: string;
}

export default function BriefPaintingInfo({ painting, source }: Props) {
  const artist = painting.artist;

  return (
    <figcaption className="flex gap-4 px-2 py-2">
      <p className="font-semibold">{painting.title}</p>
      <p>
        <>
          {artist.name}, {artist.culture} ({artist.birthplace}{" "}
          {artist.displaydate})
        </>
      </p>
      <cite>
        <a
          className="link"
          href={painting.url}
          target="_blank"
          rel="noreferrer"
        >
          {source}
        </a>
      </cite>
    </figcaption>
  );
}
