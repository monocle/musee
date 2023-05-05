import { Outlet } from "@tanstack/react-router";
import Header from "./common/Header";

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
