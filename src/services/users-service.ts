import { User } from "../entities/user";
import APIClient from "./api-client";

class UsersService {
  private api: APIClient<User>;

  constructor() {
    this.api = new APIClient<User>("/users");
  }

  getAll = (params?: {
    searchQuery?: string;
    sortDirection?: "asc" | "desc";
  }) => {
    const config = {
      params: {
        ...(params?.searchQuery && { username: params.searchQuery }),
        ...(params?.sortDirection && {
          sortBy: "age",
          order: params.sortDirection,
        }),
      },
    };
    return this.api.getAll(config);
  };

  create = (user: Omit<User, "id">) => this.api.post(user);

  delete = (id: string) => this.api.delete(id);

  checkUsername = (username: string) =>
    this.api.checkExists("username", username);
}

export default new UsersService();
