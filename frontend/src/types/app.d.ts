interface CollectionViewProps {
  paintings: Painting[];
  page: number;
  onClickPainting: (painting: Painting) => void;
}
