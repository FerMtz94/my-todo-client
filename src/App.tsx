import { useContext, useEffect, useState } from 'react'
import './App.css'
import { Login } from './components/login';
import { UsersContext } from './contexts/users-context';
import { UserContext } from './contexts/user-context';

const App = () =>{
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const [greeting, setGreeting] = useState<string>('');
  const {setUsers} = useContext(UsersContext);

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
      { !currentUser && <Login /> }
      { currentUser && (<>
      <div className="top-right">
        <button onClick={() => { setCurrentUser(null) }}>Logout</button>
      </div>
      <h1>Fernando's Todo App</h1>
      
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          Here you can see the server response to the route / with the action GET <code>{greeting}</code>
        </p>
      </div></>)}
    </>
  )
}

export default App
