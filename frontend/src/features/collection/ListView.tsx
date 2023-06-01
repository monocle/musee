export default function ListView({
  records,
  onClickRecord,
}: CollectionViewProps) {
  return (
    <table
      className="table-compact w-full text-left"
      data-testid="collection-list-view"
    >
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Artist</th>
          <th>Date</th>
          <th>Medium</th>
          <th>Dimensions</th>
          <th>Color (HSL)</th>
          <th>Museum Link</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id} className="border-t border-base-300">
            <td
              className="mr-4 flex w-24 items-center gap-1"
              id={`record-${record.sequence}`}
            >
              <span>{record.sequence}</span>
              <img
                className="h-20 w-20 cursor-pointer object-contain "
                src={record.image_url.xl}
                alt="..."
                onClick={() => onClickRecord(record)}
              />
            </td>
            <td className="whitespace-normal">{record.title}</td>
            <td>{record.artist_name}</td>
            <td>{record.date}</td>
            <td>{record.medium}</td>
            <td>
              {record.dimensions.map((dim) => (
                <div key={dim}>{dim}</div>
              ))}
            </td>
            {record.color && (
              <td>
                <div>
                  {record.color.h}, {record.color.s}%, {record.color.l}%
                </div>
              </td>
            )}
            <td>
              <a
                className="link-info link"
                href={record.source_url}
                target="_blank"
                rel="noreferrer"
              >
                link
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
