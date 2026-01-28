import type React from "react";
import { useContext } from "react";
import { TaskContext } from "../contexts/tasks-context";
import { TaskCard } from "./task-card";

export const TaskList: React.FC = () => {
	const { tasks } = useContext(TaskContext);

	return (
		<section>
			{!tasks && <p>No tasks found.</p>}
			{tasks && tasks.length === 0 && (
				<p>No tasks available. Add a new task!</p>
			)}
			{tasks &&
				tasks.length > 0 &&
				tasks.map((task) => <TaskCard key={task.id} task={task} />)}
		</section>
	);
};
