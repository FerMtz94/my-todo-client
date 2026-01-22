import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/user-context.tsx'
import { UsersProvider } from './contexts/users-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </UsersProvider>
  </StrictMode>,
)
