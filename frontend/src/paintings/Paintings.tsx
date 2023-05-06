import React, { useState, useEffect } from "react";
import { useGetPaintings } from "./usePaintingsApi";
import ErrorMessage from "../common/ErrorMessage";
import PageControls from "./PageControls";

function toPercent(num: number, minimumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
  }).format(num);
}

export default function Paintings() {
  const limit = 20;
  const [offset, setOffset] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const { isLoading, isError, isSuccess, data, error } = useGetPaintings({
    offset,
    limit,
  });

  useEffect(() => {
    if (data?.count) setTotalRecords(data.count);
  }, [data]);

  return (
    <section>
      <h2 className="mb-4 text-center font-heading text-2xl font-bold">
        Paintings
      </h2>
      <div className="text-center">
        <PageControls
          offset={offset}
          limit={limit}
          total={totalRecords}
          onOffsetChange={(offset) => setOffset(offset)}
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {isError && <ErrorMessage error={error} />}
      {isSuccess && (
        <table className="table-compact">
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Date</th>
              <th>Medium</th>
              <th>Dimensions</th>
              <th>Colors</th>
              <th># Images</th>
              <th>Image URL</th>
              <th>HAM Link</th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              data.records.map(
                ({
                  artist,
                  colors,
                  dated,
                  dateend,
                  dimensionsArr,
                  id,
                  images,
                  medium,
                  primaryimageurl,
                  title,
                  url,
                }) => (
                  <tr key={id}>
                    <td className="whitespace-normal">{title}</td>
                    <td>{artist?.name ?? "Unknown"}</td>
                    <td>{dated ?? dateend}</td>
                    <td>{medium}</td>
                    <td>
                      {dimensionsArr?.map((dim) => (
                        <div key={dim}>{dim}</div>
                      ))}
                    </td>
                    <td>
                      {colors.map(({ hue, percent, css3 }) => (
                        <React.Fragment key={css3}>
                          <div>{hue}</div>
                          <div>{toPercent(percent)}</div>
                          <div>{css3}</div>
                        </React.Fragment>
                      ))}
                    </td>
                    <td>{images.length}</td>
                    <td>
                      {primaryimageurl ? (
                        <a className="link-info link" href={primaryimageurl}>
                          link
                        </a>
                      ) : (
                        "None"
                      )}
                    </td>
                    <td>
                      {url ? (
                        <a className="link-info link" href={url}>
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
      )}
    </section>
  );
}