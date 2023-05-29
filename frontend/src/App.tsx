import { Outlet } from "@tanstack/react-router";
import Header from "./features/header/Header";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
