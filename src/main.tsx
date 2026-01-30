import { ChakraProvider as ChakraUIProvider } from "@chakra-ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TaskProvider } from "./contexts/tasks-context.tsx";
import { UserProvider } from "./contexts/user-context.tsx";
import { UsersProvider } from "./contexts/users-context.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChakraUIProvider>
			<UsersProvider>
				<UserProvider>
					<TaskProvider>
						<App />
					</TaskProvider>
				</UserProvider>
			</UsersProvider>
		</ChakraUIProvider>
	</StrictMode>,
);
