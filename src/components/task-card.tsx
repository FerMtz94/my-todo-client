import type React from "react";
import type { Task } from "../types/task";
import "./task-styles.css";
import { Icon } from "@chakra-ui/react/icon";
import { useContext, useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { TaskServiceInstance as taskService } from "@/api/task-service";
import { dialog } from "@/components/dialog";
import { TaskContext } from "@/contexts/tasks-context";

interface TaskCardProps {
	task: Task;
	setSelectedTasks: React.Dispatch<React.SetStateAction<number[]>>;
}

export const TaskCard: React.FC<TaskCardProps> = ({
	task,
	setSelectedTasks,
}) => {
	const [checked, setChecked] = useState(false);
	const { setTasks } = useContext(TaskContext);

	useEffect(() => {
		setSelectedTasks((prev) => {
			if (checked) {
				return [...prev, task.id];
			}
			return prev.filter((taskId) => taskId !== task.id);
		});
	}, [checked, setSelectedTasks, task]);

	const handleTaskDeletion = async (taskId: number) => {
		const deleted = await taskService.deleteTask(taskId);
		if (deleted) {
			setTasks(
				(prev) =>
					prev?.filter((currentTask) => currentTask.id !== taskId) || null,
			);
			dialog.close("delete-dialog");
		} else {
			alert("Failed to delete task. Please try again.");
		}
	};

	const openDeleteConfirmation = () => {
		dialog.open("delete-dialog", {
			title: "Are you sure you want to delete this task?",
			placement: "center",
			content: (
				<div
					style={{
						display: "flex",
						gap: "1rem",
						justifyContent: "center",
					}}
				>
					<button type="button" onClick={() => handleTaskDeletion(task.id)}>
						Yes
					</button>
					<button type="button" onClick={() => dialog.close("delete-dialog")}>
						No
					</button>
				</div>
			),
		});
	};

	return (
		<div className="task-card">
			<div className="task-card-header">
				<Icon
					onClick={openDeleteConfirmation}
					cursor="pointer"
					className="dialog"
				>
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
