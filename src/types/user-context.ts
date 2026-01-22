import type { User } from "./user";

export type UserContextType = {
    currentUser?: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}