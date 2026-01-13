// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import contactStoreReducer, { initialContactStore } from "../store"  // Import the reducer and the initial state.

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const contactStoreContext = createContext()

// Define a provider component that encapsulates the store and warps it in a context provider to 
// broadcast the information throught all the app pages and components.
export function ContactStoreProvider({ children }) {
    // Initialize reducer with the initial state.
    const [store, dispatch] = useReducer(contactStoreReducer, initialContactStore())
    // Provide the store and dispatch method to all child components.
    return <contactStoreContext.Provider value={{ store, dispatch }}>
        {children}
    </contactStoreContext.Provider>
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducerContact() {
    const { dispatch, store } = useContext(contactStoreContext)
    return { dispatch, store };
}