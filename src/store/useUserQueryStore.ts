import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface UserQuery {
  searchQuery?: string;
  sortDirection?: "asc" | "desc";
}

interface UserQueryStore {
  userQuery: UserQuery;
  setSearchQuery: (searchQuery: string) => void;
  setSortDirection: (sortDirection: "asc" | "desc") => void;
  reset: () => void;
}

const useUserQueryStore = create<UserQueryStore>((set) => ({
  userQuery: {
    sortDirection: "desc",
    searchQuery: "",
  },
  setSearchQuery: (searchQuery) =>
    set((store) => ({ userQuery: { ...store.userQuery, searchQuery } })),
  setSortDirection: (sortDirection) =>
    set((store) => ({ userQuery: { ...store.userQuery, sortDirection } })),
  reset: () => set({ userQuery: { sortDirection: "desc", searchQuery: "" } }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("User Query Store", useUserQueryStore);
}

export default useUserQueryStore;
