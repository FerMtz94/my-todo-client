import type React from "react";
import type { User } from "../types/user";
import "./user-card.css";

interface UserCardProps {
	user: User;
	children?: React.ReactNode;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
	const { username, email, password_hash } = user;

	return (
		<div className="user-card">
			<p>User Name: {username}</p>
			<p>Email: {email}</p>
			<p>Password Hash: {password_hash}</p>
		</div>
	);
};
