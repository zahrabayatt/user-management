import { create } from "zustand";
import { User } from "../entities/user";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  updateUser: (userId: string, updatedUser: Partial<User>) => void;
  reorderUsers: (originalUsers: User[], newOrder: User[]) => void;
  sortUsers: (direction: "asc" | "desc") => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
  deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),
  updateUser: (userId, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      ),
    })),
  reorderUsers: (originalUsers, newOrder) => set({ users: newOrder }),
  sortUsers: (direction) =>
    set((state) => ({
      users: [...state.users].sort((a, b) => {
        if (direction === "asc") {
          return a.age - b.age;
        }
        return b.age - a.age;
      }),
    })),
}));

export default useUserStore;
