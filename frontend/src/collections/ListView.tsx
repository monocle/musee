import React from "react";

function toPercent(num: number, minimumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
  }).format(num);
}

export default function ListView({ paintings }: CollectionViewProps) {
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
        {paintings.map(
          ({
            artist,
            colors,
            date,
            dimensions,
            id,
            medium,
            sequence,
            title,
            url,
          }) => (
            <tr key={id} className="border-t border-base-300">
              <td>{sequence}</td>
              <td className="whitespace-normal">{title}</td>
              <td>{artist?.name ?? "Unknown"}</td>
              <td>{date}</td>
              <td>{medium}</td>
              <td>
                {dimensions.map((dim) => (
                  <div key={dim}>{dim}</div>
                ))}
              </td>
              <td>
                {colors.slice(0, 1).map(({ hue, percent, css3 }) => (
                  <React.Fragment key={css3}>
                    <div>{hue}</div>
                    <div>{toPercent(percent)}</div>
                    <div>{css3}</div>
                  </React.Fragment>
                ))}
              </td>
              <td>
                {url ? (
                  <a
                    className="link-info link"
                    href={url}
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
          )
        )}
      </tbody>
    </table>
  );
}
