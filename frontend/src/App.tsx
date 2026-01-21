import { BrowserRouter, Routes, Route } from "react-router"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ChatAppPage from "./pages/ChatAppPage"
import Protected from "./components/auth/Protected"
import { Toaster } from "sonner"


function App() {
  return (
    <>
    <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<Protected />}>
            <Route path="/" element={<ChatAppPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
