import { useCallback, useContext, useEffect, useRef } from "react";
import { dialog } from "./components/dialog";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { TaskServiceInstance as taskService } from "./api/task-service";
import { Login } from "./components/login";
import { TaskList } from "./components/task-list";
import { TaskContext } from "./contexts/tasks-context";
import { UserContext } from "./contexts/user-context";
import type { Task } from "./types/task";
import type { User } from "./types/user";

const App = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { setTasks } = useContext(TaskContext);
	const currentStoredUserString = useRef(
		sessionStorage.getItem("current-user"),
	);

	const getUserTodos = useCallback(
		async (currentUser: User) => {
			await setTasks(
				(await taskService.getTasksByUserId(currentUser.id)) || [],
			);
		},
		[setTasks],
	);

	useEffect(() => {
		if (currentStoredUserString.current) {
			const sessionStoredCurrentUser: User = JSON.parse(
				currentStoredUserString.current,
			);
			setCurrentUser(sessionStoredCurrentUser);
		}
	}, [setCurrentUser]);

	useEffect(() => {
		if (!currentUser) {
			return;
		}
		document.title = `My TO-DOs - ${currentUser.username}`;
		getUserTodos(currentUser);
	}, [currentUser, getUserTodos]);

	const postTask = async (formData: FormData) => {
		const formValues = Object.fromEntries(formData.entries());
		const { title, description } = formValues as {
			title: string;
			description: string;
		};

		if (!currentUser) {
			return;
		}
		if (!title) {
			return;
		}

		const createdTask = await taskService.createUserTask({
			user_id: currentUser.id,
			title,
			description,
		} as Partial<Task>);

		if (createdTask) {
			const newTask = await taskService.getUserTaskById(
				currentUser.id,
				createdTask.id,
			);
			if (newTask) {
				setTasks((prev) => (prev ? [newTask, ...prev] : [newTask]));
			}
			dialog.close("add-task-dialog");
		}
	};

	const addTask = () => {
		dialog.open("add-task-dialog", {
			title: "Add a new task",
			placement: "center",
			content: (
				<form action={postTask}>
					<label htmlFor="task-title">Title</label>
					<input id="task-title" type="text" name="title" />

					<label htmlFor="task-description">Description</label>
					<input id="task-description" type="text" name="description" />

					<button type="submit">Add</button>
				</form>
			),
		});
	};

	return (
		<>
			<Toaster position={"bottom-center"} />
			{!currentUser && <Login />}
			{currentUser && (
				<>
					<div className="top-right">
						<button
							type="button"
							className="outline-button"
							onClick={() => {
								setCurrentUser(null);
								sessionStorage.removeItem("current-user");
							}}
						>
							Logout
						</button>
					</div>
					<div className="main-container">
						<h1>{currentUser.username} Todo Items</h1>
						<button
							id="add-task-button"
							type="button"
							onClick={() => addTask()}
						>
							+
						</button>
						<TaskList />
						<dialog.Viewport />
					</div>
				</>
			)}
		</>
	);
};

export default App;
