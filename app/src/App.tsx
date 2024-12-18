import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import Layout from "./Layout"
import LoginPage from "./app/login"
import RegisterPage from "./app/register"
import PostListPage from "./app/index"
import PostAddPage from "./app/post/add"
import PostEditPage from "./app/post/edit"
import PostSinglePage from "./app/post/single"
import ProtectedRoute from "./components/ProtectedRoute"
import UserSettings from "./app/user/settings"

function App() {

  return (
    <BrowserRouter>
      <Layout>
          <Routes>
            {/* routes protectes */}
            <Route element={<ProtectedRoute />}>
              {/* Post */}
                <Route path='/' element={<PostListPage />} />
                <Route path='/post/:id' element={<PostSinglePage />} />
                <Route path='/post/add' element={<PostAddPage />} />
                <Route path='/post/edit/:id' element={<PostEditPage />} />
              {/* User */}
                <Route path='/settings' element={<UserSettings />} />
            </Route>
            {/* Auth Pages */}
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        <Toaster richColors position="bottom-right" />
      </Layout>
    </BrowserRouter>
  )
}

export default App
