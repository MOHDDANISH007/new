import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DashBoardPage from './pages/DashBoardPage.jsx'
import AssetsPage from './pages/AssetsPage.jsx'
import LiabilitiesPage from './pages/LiabilitiesPage.jsx'
import LoansPage from './pages/LoansPage.jsx'
import GoalsPage from './pages/GoalsPage.jsx'
import { AuthProvider } from './context/Auth.context.jsx'
import { useAuth } from './context/Auth.context.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { FinancialProvider } from './context/Financial.context.jsx'
import AI_documentation from './components/AI_documentation.jsx'
import GroqAndLlamaPage from './pages/GroqAndLlamaPage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import FinancialDataForm from './components/FinancialDataForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <FinancialProvider>
          <App />
        </FinancialProvider>
      </AuthProvider>
    ),
    children: [
      { path: 'dashboard', element: <DashBoardPage /> },
      { path: 'assets', element: <AssetsPage /> },
      { path: 'liabilities', element: <LiabilitiesPage /> },
      { path: 'loans', element: <LoansPage /> },
      { path: 'document', element: <AI_documentation /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'groqAndLlama', element: <GroqAndLlamaPage /> },
      { path: 'setting', element: <SettingPage /> },
      { path: 'form', element: <FinancialDataForm /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
