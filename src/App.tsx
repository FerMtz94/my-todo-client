import { useContext, useEffect } from "react";
import { TaskModal } from "./components/task-modal";
import "./App.css";
import { Login } from "./components/login";
import { TaskList } from "./components/task-list";
import { TaskContext } from "./contexts/tasks-context";
import { UserContext } from "./contexts/user-context";
import { UsersContext } from "./contexts/users-context";

const App = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { setTasks } = useContext(TaskContext);
	const { setUsers } = useContext(UsersContext);

	useEffect(() => {
		const getUsers = async () => {
			const response = await fetch(
				"https://my-todo-app-neon-five.vercel.app/users",
			);
			const data = await response.json();
			setUsers(data);
		};

		getUsers();
	}, [setUsers]);

	useEffect(() => {
		if (currentUser) {
			document.title = `My Todos - ${currentUser.username}`;
			const getTodos = async () => {
				const response = await fetch(
					`https://my-todo-app-neon-five.vercel.app/users/${currentUser.id}/tasks`,
				);
				const data = await response.json();
				console.log("response", response);
				console.log("Fetched tasks:", data);
				setTasks(data);
			};
			getTodos();
		}
	}, [currentUser, setTasks]);

	const addTask = () => {
		TaskModal.open("a", {
			title: "Dialog Title",
			description: "Dialog Description",
		});
	};

	return (
		<>
			{!currentUser && <Login />}
			{currentUser && (
				<>
					<div className="top-right">
						<button
							type="button"
							className="outline-button"
							onClick={() => {
								setCurrentUser(null);
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
						<TaskModal.Viewport />
					</div>
				</>
			)}
		</>
	);
};

export default App;
