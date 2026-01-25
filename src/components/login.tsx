import type React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { UsersContext } from "../contexts/users-context";
import { UserCard } from "./user-card";
import { UserContext } from "../contexts/user-context";
import "./login.css";

export const Login: React.FC<{}> = () => {
    const [ error, setError ] = useState<string>("");
    const { users } = useContext(UsersContext);
    const { setCurrentUser } = useContext(UserContext);

    const validateUser = (formData: FormData) => {
        const formValues = Object.fromEntries(formData.entries())
        const { email, password } = formValues as { email: string; password: string };
        const foundUser = users?.find(user => user.email === email && user.password_hash === password);

        if (foundUser) {
            setCurrentUser(foundUser);
        } else {
            setError('Invalid email or password. Please try again.');
        }
    }
    
    const removeErrorMsg = () => {
        if (error) {
            setError('');
        }
    }

    return (
        <>
            <h1>My Todo App</h1>
            <div className="form-container">
                <form action={validateUser} onInput={removeErrorMsg}>
                    <input type="text" placeholder="email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button type="submit">Login</button>
                    <span style={{ color: 'red' }}>{error}</span>
                </form>
            </div>
            <section>
                <h4>Users list (for dev purposes)</h4>
                <div className="user-cards-container">
                    {users?.map(user => (<UserCard key={user.id} user={user} />))}
                </div>
            </section>
        </>
    )
}