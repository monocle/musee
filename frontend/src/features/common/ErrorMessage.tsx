interface Props {
  error: ServerError;
}

export default function ErrorMessage({ error }: Props) {
  return <span>Error: {error.message}</span>;
}
