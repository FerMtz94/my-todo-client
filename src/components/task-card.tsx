import type React from "react";
import type { Task } from "../types/task";
import "./task-styles.css";
import { Icon } from "@chakra-ui/react/icon";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

interface TaskCardProps {
	task: Task;
	setSelectedTasks: React.Dispatch<React.SetStateAction<number[]>>;
}

export const TaskCard: React.FC<TaskCardProps> = ({
	task,
	setSelectedTasks,
}) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setSelectedTasks((prev) => {
			if (checked) {
				return [...prev, task.id];
			}
			return prev.filter((taskId) => taskId !== task.id);
		});
	}, [checked, setSelectedTasks, task]);

	return (
		<div className="task-card">
			<div className="task-card-header">
				<Icon>
					<FaRegTrashCan />
				</Icon>
				<input
					type="checkbox"
					checked={checked}
					className="task-card-selected"
					onChange={() => setChecked(!checked)}
				/>
			</div>
			<h2>{task.title}</h2>
			<div className="task-card-row">
				<div className="task-card-column">
					<p>{task.description ?? "No description provided"}</p>
				</div>
				<div className="checkbox-column">
					<input
						type="checkbox"
						checked={!!task.is_completed}
						onClick={() => {
							/* TODO: Implement changeCompleted function */
						}}
					/>
				</div>
			</div>
			<div className="task-card-row">
				<div className="task-card-column">
					<span>
						Last updated: {new Date(task.updated_at).toLocaleDateString()}
					</span>
				</div>
				{task.due_date && (
					<div className="task-card-column">
						<span>
							Due date: {new Date(task.due_date).toLocaleDateString()}
						</span>
					</div>
				)}
			</div>
		</div>
	);
};
