import { useContext } from "react";
import { UsersContext } from "@/contexts/users-context";
import "./users-list.css";
import { UserCard } from "./user-card";

export const UsersList = () => {
	const { users } = useContext(UsersContext);

	return (
		<section id="users-list">
			<h4>Users list (for dev purposes)</h4>
			<div className="user-cards-container">
				{users?.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</section>
	);
};
