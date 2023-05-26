type CollectionId = RecordSource | "favorites";

interface CollectionViewProps {
  records: ApiRecord[];
  page: number;
  onClickRecord: (record: ApiRecord) => void;
}
