import type React from "react";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../contexts/user-context";
import { UsersContext } from "../contexts/users-context";
import "./login.css";
import { UsersList } from "./users-list";

export const Login: React.FC<{}> = () => {
	const [error, setError] = useState<string>("");
	const { users } = useContext(UsersContext);
	const { setCurrentUser } = useContext(UserContext);
	const [disabled, setDisabled] = useState<boolean>(true);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
		const email = e.target.value;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email.length > 0 && !emailRegex.test(email)) {
			setError("Please enter a valid email address.");
			setDisabled(true);
		} else {
			setError("");
		}
	};

	const validateCredentials = (formData: FormData) => {
		const formValues = Object.fromEntries(formData.entries());
		const { email, password } = formValues as {
			email: string;
			password: string;
		};

		const foundUser = users?.find(
			(user) => user.email === email && user.password_hash === password,
		);

		if (foundUser) {
			setCurrentUser(foundUser);
		} else {
			setError("Invalid email or password. Please try again.");
			emailRef.current?.focus();
			setDisabled(true);
		}
	};

	const removeErrorMsg = () => {
		if (error && error.search("address") === -1) {
			setError("");
		}
	};

	const enableButton = () => {
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const enablingCondition =
			email &&
			password &&
			email.length > 0 &&
			password.length > 0 &&
			error === "";
		if (enablingCondition) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	const handleEmailInput = () => {
		setError("");
		if (passwordRef.current && passwordRef.current?.value.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	return (
		<div className="app-container">
			<h1>My Todo App</h1>
			<div className="form-container">
				<form action={validateCredentials} onInput={removeErrorMsg}>
					<input
						type="text"
						placeholder="Email"
						name="email"
						onBlur={validateEmail}
						onInput={handleEmailInput}
						ref={emailRef}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onInput={enableButton}
						ref={passwordRef}
					/>
					<button type="submit" disabled={disabled}>
						Login
					</button>
					<span style={{ color: "red" }}>{error}</span>
				</form>
			</div>
			<UsersList />
		</div>
	);
};
