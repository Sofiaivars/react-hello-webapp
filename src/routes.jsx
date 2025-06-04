// Import necessary components and functions from react-router-dom.
import { ContactList } from "./pages/ContactList"; // Import the ContactList component for displaying contacts.
import { FormCreateContactBase } from "./components/FormCreateContactBase"; // Import the base form component for creating contacts.
import { FormCreateContact } from "./components/FormCreateContact"; // Import the form component for creating a new contact.
import { FormEditContact } from "./components/FormEditContact"; // Import the form component for editing an existing contact.
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/">
      <Route index element={<ContactList />} /> {/* Ruta / */}
      <Route
        path="add-contact-at-list"
        element={<FormCreateContactBase />}
      />{" "}
      {/* Ruta /add-contact */}
      <Route path="add-contact/:id" element={<FormCreateContact />} />{" "}
      {/* Ruta /add */}
      <Route path="edit/:contactId" element={<FormEditContact />} />{" "}
      {/* Ruta /edit/1, etc */}
      {/* Puedes agregar una ruta fallback */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Route>
  )
);
