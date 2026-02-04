import React, { createContext, type PropsWithChildren } from "react";
import type { User } from "../types/user";
import type { UserContextType } from "../types/user-context";

export const UserContext = createContext<UserContextType>(
	{} as UserContextType,
);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [currentUser, setCurrentUser] = React.useState<User | null>(null);
	const contextValue: UserContextType = { currentUser, setCurrentUser };

	return (
		<UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
	);
};
