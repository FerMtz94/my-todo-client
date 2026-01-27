import React, { createContext, type PropsWithChildren } from "react";
import type { Task } from "../types/task";
import type { TaskContextType } from "../types/task-context";

export const TaskContext = createContext<TaskContextType>(
	{} as TaskContextType,
);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [tasks, setTasks] = React.useState<Task[] | null>(null);

	const contextValue: TaskContextType = { tasks, setTasks };

	return (
		<TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
	);
};
