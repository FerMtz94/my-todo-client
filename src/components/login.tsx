import type React from "react";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../contexts/users-context";
import { UserCard } from "./user-card";
import "./login.css";
import { UserContext } from "../contexts/user-context";

export const Login: React.FC<{}> = () => {
    const [formInput, setFormInput] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const { users } = useContext(UsersContext);
    const { setCurrentUser } = useContext(UserContext);

    useEffect(() => {
       if (error) {
            setFormInput({ email: '', password: '' });
       }
    }, [error])


    const validateUser = () => {
        const foundUser = users?.find(user => user.email === formInput.email && user.password_hash === formInput.password);
        if (foundUser) {
            setCurrentUser(foundUser);
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <>
            <h1>Welcome to My Todo App</h1>
            <div className="form-container">
                <form>
                    <input type="text" placeholder="email" value={formInput.email} onClick={() => setError('')} onChange={(e) => setFormInput({...formInput, email: e.target.value})}/>
                    <input type="password" placeholder="Password" value={formInput.password} onClick={() => setError('')} onChange={(e) => setFormInput({...formInput, password: e.target.value})} />
                    <button type="button" onClick={() => validateUser()}>Login</button>
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