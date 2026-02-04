import type { User } from "@/types/user";

export class UserService {
	private baseUrl: string;

	constructor(baseUrl?: string) {
		this.baseUrl = baseUrl || "https://my-todo-app-neon-five.vercel.app";
	}

	public async getUsers(): Promise<User[] | undefined> {
		try {
			const response = await fetch(`${this.baseUrl}/users`);
			if (response.status !== 200) {
				throw new Error(`Failed to fetch users: ${response.statusText}`);
			}
			return (await response.json()) as User[];
		} catch (error) {
			console.error(error);
		}
	}

	public async getUserById(userId: number) {
		try {
			const response = await fetch(`${this.baseUrl}/users/${userId}`);
			if (response.status !== 200) {
				throw new Error(
					`Failed to fetch user with ID ${userId}: ${response.statusText}`,
				);
			}
			return (await response.json()) as User;
		} catch (error) {
			console.error(error);
		}
	}

	public async createUser(user: Partial<User>): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (response.status !== 201) {
				throw new Error(`Failed to create user: ${response.statusText}`);
			}
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async updateUser(
		userId: number,
		user: Partial<User>,
	): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/users/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (response.status !== 200) {
				throw new Error(`Failed to update user: ${response.statusText}`);
			}
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deleteUser(userId: number): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/users/${userId}`, {
				method: "DELETE",
			});
			if (response.status !== 200) {
				throw new Error(`Failed to delete user: ${response.statusText}`);
			}
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
