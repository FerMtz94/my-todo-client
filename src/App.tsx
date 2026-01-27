import { useContext, useEffect } from "react";
import "./App.css";
import { Login } from "./components/login";
import { TaskContext } from "./contexts/tasks-context";
import { UserContext } from "./contexts/user-context";
import { UsersContext } from "./contexts/users-context";

const App = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const { tasks, setTasks } = useContext(TaskContext);
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
					<h1>{currentUser.username} Todo Items</h1>
					<div className="card">
						{!tasks && <p>No tasks found.</p>}
						{tasks && tasks.length === 0 && (
							<p>No tasks available. Add a new task!</p>
						)}
						{tasks &&
							tasks.length > 0 &&
							tasks.map((task) => (
								<div key={task.id}>
									<h3>{task.title}</h3>
									<p>{task.description}</p>
									<p>
										Due Date: {new Date(task.due_date).toLocaleDateString()}
									</p>
									<p>Status: {task.is_completed ? "Completed" : "Pending"}</p>
									<hr />
								</div>
							))}
					</div>
				</>
			)}
		</>
	);
};

export default App;
