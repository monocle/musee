interface CollectionViewProps {
  collectionRequest: import("@tanstack/react-query").QueryObserverSuccessResult<
    CollectionResponse,
    ServerError
  >;
  page?: number;
}
