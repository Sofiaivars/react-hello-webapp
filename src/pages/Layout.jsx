import { Outlet } from "react-router-dom/dist";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
  return (
    <div>
      <h1>Contact List</h1>
      <Outlet />
    </div>
  );
};
