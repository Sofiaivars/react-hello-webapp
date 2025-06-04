// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();

// Define a provider component that encapsulates the store and warps it in a context provider to
// broadcast the information throught all the app pages and components.
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
export default function useGlobalStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalStore must be used within a StoreProvider");
  }
  return context;
}
