import type React from "react";
import { useEffect, useState } from "react";
import { authClient } from "@/auth";

export const AuthenticationForm: React.FC = () => {
	const [session, setSession] = useState<unknown | null>(null);
	const [user, setUser] = useState<(unknown & { email: string }) | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authClient.getSession().then((result) => {
			if (result.data?.session && result.data?.user) {
				setSession(result.data.session);
				setUser(result.data.user);
			}
			setLoading(false);
		});
	}, []);

	const handleSubmit = async (e) => {
		// e.preventDefault();
		const result = isSignUp
			? await authClient.signUp.email({
					name: email.split("@")[0] || "User",
					email,
					password,
				})
			: await authClient.signIn.email({ email, password });
		if (result.error) {
			alert(result.error.message);
			return;
		} else {
				console.log('User created:', result.data.user)
		}
		const sessionResult = await authClient.getSession();
		if (sessionResult.data?.session && sessionResult.data?.user) {
			setSession(sessionResult.data.session);
			setUser(sessionResult.data.user);
		}
	};

	const handleSignOut = async () => {
		await authClient.signOut();
		setSession(null);
		setUser(null);
	};

	if (loading) return <div>Loading...</div>;
	if (session && user) {
		return (
			<div>
				<h1>Logged in as {user.email}</h1>
				<button type="button" onClick={handleSignOut}>
					Sign Out
				</button>
			</div>
		);
	}

	return (
		<form action={handleSubmit}>
			<h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
			<p>
				{isSignUp ? (
					<>
						Already have an account?{" "}
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								setIsSignUp(false);
							}}
						>
							Sign in
						</button>
					</>
				) : (
					<>
						Don't have an account?{" "}
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								setIsSignUp(true);
							}}
						>
							Sign up
						</button>
					</>
				)}
			</p>
		</form>
	);
};
