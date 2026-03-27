import "./users-list.css";
import { Spinner } from "@chakra-ui/react";
import { useDataFetch } from "@/hooks/use-data-fetch";
import type { User } from "@/types/user";
import { UserCard } from "./user-card";

export const UsersList = () => {
	const {
		data: users,
		loading,
		error,
	} = useDataFetch("https://my-todo-app-neon-five.vercel.app/users");

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
				}}
			>
				<Spinner />
			</div>
		);
	}

	if (error) {
		return <p>Error loading users: {error}</p>;
	}

	return (
		<section id="users-list">
			<h4>Users list (for dev purposes)</h4>
			{!users || users.length === 0}
			<div className="user-cards-container">
				{users?.map((user: User) => (
					<UserCard key={user.id} user={user} />
				))}
			</div>
		</section>
	);
};
