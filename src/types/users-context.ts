import type { User } from "./user";

export type UsersContextType = {
    users?: User[] | null;
    setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
}