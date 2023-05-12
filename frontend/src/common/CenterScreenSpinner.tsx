import Spinner from "../icons/Spinner";

export default function CenterScreenSpinner() {
  return (
    <div className="fixed top-0 flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
}
