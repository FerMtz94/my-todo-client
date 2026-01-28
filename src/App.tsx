import { useContext, useEffect } from "react";
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

	return (
		<>
			{!currentUser && <Login />}
			{currentUser && (
				<>
					<div className="top-right">
						<button
							type="button"
							onClick={() => {
								setCurrentUser(null);
							}}
						>
							Logout
						</button>
					</div>
					<div className="main-container">
						<h1>{currentUser.username} Todo Items</h1>
						<TaskList />
					</div>
				</>
			)}
		</>
	);
};

export default App;
