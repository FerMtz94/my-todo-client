import React, { createContext, type PropsWithChildren, useEffect } from "react";
import { UserService } from "@/api/user-service";
import type { User } from "../types/user";
import type { UsersContextType } from "../types/users-context";

export const UsersContext = createContext<UsersContextType>(
	{} as UsersContextType,
);

export const UsersProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [users, setUsers] = React.useState<User[] | null>(null);
	const userService = new UserService();

	useEffect(() => {
		const getUsers = async () => {
			setUsers((await userService.getUsers()) || []);
		};

		getUsers();
	}, [userService]);

	const contextValue: UsersContextType = { users, setUsers };

	return (
		<UsersContext.Provider value={contextValue}>
			{children}
		</UsersContext.Provider>
	);
};
