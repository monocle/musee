import PageControls from "../common/PageControls";

interface Props {
  onSelectChange: (view: string) => void;
  page: number;
  maxPages: number;
  isLoading: boolean;
  onPageChange: (newPage: number) => void;
}

export default function ViewControls({
  onSelectChange,
  page,
  maxPages,
  isLoading,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-evenly gap-10">
      <select
        className="select select-xs md:select-sm"
        onChange={(e) => onSelectChange(e.target.value)}
      >
        <option value="gallery">Gallery View</option>
        <option value="list">List View</option>
      </select>

      <PageControls
        page={page}
        maxPages={maxPages}
        isLoading={isLoading}
        onPageChange={onPageChange}
      />
    </div>
  );
}
