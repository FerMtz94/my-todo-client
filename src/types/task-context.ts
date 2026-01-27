import type { Task } from "./task"

export type TaskContextType = {
  tasks?: Task[] | null
  setTasks: React.Dispatch<React.SetStateAction<Task[] | null>>
}
