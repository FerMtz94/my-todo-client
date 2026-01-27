import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "./contexts/tasks-context.tsx";
import { UserProvider } from "./contexts/user-context.tsx";
import { UsersProvider } from "./contexts/users-context.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<UsersProvider>
			<UserProvider>
				<TaskProvider>
					<App />
				</TaskProvider>
			</UserProvider>
		</UsersProvider>
	</StrictMode>,
);
