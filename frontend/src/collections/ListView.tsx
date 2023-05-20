import React from "react";

function toPercent(num: number, minimumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
  }).format(num);
}

export default function ListView({
  paintings,
  onClickPainting,
}: CollectionViewProps) {
  return (
    <table className="table-compact w-full text-left">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Artist</th>
          <th>Date</th>
          <th>Medium</th>
          <th>Dimensions</th>
          <th>Colors</th>
          <th>Museum Link</th>
        </tr>
      </thead>
      <tbody>
        {paintings.map((painting) => (
          <tr key={painting.id} className="border-t border-base-300">
            <td className="mr-4 flex items-center gap-1">
              <span>{painting.sequence}</span>
              <img
                className="h-20 w-20 cursor-pointer object-contain "
                src={`${painting.primaryimageurl}?height=80&width=80`}
                alt="..."
                onClick={() => onClickPainting(painting)}
              />
            </td>
            <td className="whitespace-normal">{painting.title}</td>
            <td>{painting.artist?.name ?? "Unknown"}</td>
            <td>{painting.date}</td>
            <td>{painting.medium}</td>
            <td>
              {painting.dimensions.map((dim) => (
                <div key={dim}>{dim}</div>
              ))}
            </td>
            <td>
              {painting.colors.slice(0, 1).map(({ hue, percent, css3 }) => (
                <React.Fragment key={css3}>
                  <div>{hue}</div>
                  <div>{toPercent(percent)}</div>
                  <div>{css3}</div>
                </React.Fragment>
              ))}
            </td>
            <td>
              {painting.url ? (
                <a
                  className="link-info link"
                  href={painting.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  link
                </a>
              ) : (
                "None"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
