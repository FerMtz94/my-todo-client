import { useContext } from "react";
import { UsersContext } from "@/contexts/users-context";
import { UserCard } from "./user-card";
import "./users-list.css";

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
