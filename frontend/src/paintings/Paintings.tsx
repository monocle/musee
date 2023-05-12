import React, { useState } from "react";
import { useGetPaintings } from "./usePaintingsApi";
import ErrorMessage from "../common/ErrorMessage";
import Header from "../pages/Header";
import PageControls from "./PageControls";

function toPercent(num: number, minimumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits,
  }).format(num);
}

export default function Paintings() {
  const [page, setPage] = useState(1);
  const { isLoading, isFetching, isError, isSuccess, data, error } =
    useGetPaintings({
      page,
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <>
      <Header />
      <section>
        <h2 className="mb-4 text-center font-heading text-2xl font-bold">
          Paintings
        </h2>
        <div className="text-center">
          <PageControls
            page={page}
            pageMax={data.page_max}
            isLoading={isFetching}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

        <table className="table-compact">
          <thead>
            <tr className="text-left">
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
            {isSuccess &&
              data.records.map(
                (
                  { artist, colors, date, dimensions, id, medium, title, url },
                  idx
                ) => (
                  <tr key={id}>
                    <td>{idx + 1 + (page - 1) * data.page_size}</td>
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
      </section>
    </>
  );
}
