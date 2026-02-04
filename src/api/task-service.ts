import type { Task } from "@/types/task";

export class TaskService {
	private baseUrl: string;

	constructor(baseUrl?: string) {
		this.baseUrl = baseUrl || "https://my-todo-app-neon-five.vercel.app";
	}

	public async getTasks(): Promise<Task[] | undefined> {
		try {
			const response = await fetch(`${this.baseUrl}/tasks`);
			if (response.status !== 200) {
				throw new Error(`Failed to fetch tasks: ${response.statusText}`);
			}
			return (await response.json()) as Task[];
		} catch (error) {
			console.error(error);
		}
	}

	public async getTaskById(taskId: number): Promise<Task | undefined> {
		try {
			const response = await fetch(`${this.baseUrl}/tasks/${taskId}`);
			if (response.status !== 200) {
				throw new Error(
					`Failed to fetch task with ID ${taskId}: ${response.statusText}`,
				);
			}
			return (await response.json()) as Task;
		} catch (error) {
			console.error(error);
		}
	}

	public async getUserTaskById(
		userId: number,
		taskId: number,
	): Promise<Task | undefined> {
		try {
			const response = await fetch(
				`${this.baseUrl}/users/${userId}/tasks/${taskId}`,
			);
			if (response.status !== 200) {
				throw new Error(
					`Failed to fetch task with ID ${taskId}: ${response.statusText}`,
				);
			}
			return (await response.json()) as Task;
		} catch (error) {
			console.error(error);
		}
	}

	public async getTasksByUserId(userId: number): Promise<Task[] | undefined> {
		try {
			const response = await fetch(`${this.baseUrl}/users/${userId}/tasks`);
			if (response.status !== 200) {
				throw new Error(
					`Failed to fetch tasks for user ${userId}: ${response.statusText}`,
				);
			}
			return (await response.json()) as Task[];
		} catch (error) {
			console.error(error);
		}
	}

	public async createUserTask(
		task: Partial<Task>,
	): Promise<{ task_id: number } | undefined> {
		try {
			const response = await fetch(
				`${this.baseUrl}/users/${task.user_id}/tasks`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(task),
				},
			);
			if (response.status !== 201) {
				throw new Error(`Failed to create task: ${response.statusText}`);
			}
			return response.json();
		} catch (error) {
			console.error(error);
			return undefined;
		}
	}

	public async updateTask(
		taskId: number,
		task: Partial<Task>,
	): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(task),
			});
			if (response.status !== 200) {
				throw new Error(`Failed to update task: ${response.statusText}`);
			}
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	public async deleteTask(taskId: number): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
				method: "DELETE",
			});
			if (response.status !== 200) {
				throw new Error(`Failed to delete task: ${response.statusText}`);
			}
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
