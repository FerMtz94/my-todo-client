import { useEffect, useState } from 'react'
import './App.css'

type User = {
  id: number;
  username: string;
  email: string;
}

const App = () =>{
  const [greeting, setGreeting] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const getGreeting = async () => {
      const response = await fetch('https://my-todo-app-neon-five.vercel.app/')
      const data = await response.text()
      setGreeting(data);
    }    

    const getUsers = async () => {
      const response = await fetch('https://my-todo-app-neon-five.vercel.app/users')
      const data = await response.json()
      setUsers(data);
    }    

    getUsers();
    getGreeting();
  }, [])

  return (
    <>
      <h1>Fernando's Todo App</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Here you can see the server response to the route / with the action GET <code>{greeting}</code>
        </p>
        <div className="card">
          <p>
            Here you can see the server response to requesting the route /users with the action GET
          </p>
          <ul>
            {users.map(user => (<li key={user.id}>
              <p>ID: {user.id}</p>
              <p>User Name: {user.username}</p>
              <p>Email: {user.email}</p>
            </li>))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
