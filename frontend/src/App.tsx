import { Outlet } from "@tanstack/react-router";
import Header from "./pages/Header";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
