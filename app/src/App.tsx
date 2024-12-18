import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import PostListPage from "./pages/Post/PostListPage"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/nav/AppSidebar"
import PostAddPage from "./pages/Post/PostAddPage"
import SignupPage from "./pages/auth/SignupPage"
import SigninPage from "./pages/auth/SigninPage"
import PostEditPage from "./pages/Post/PostEditPage"
import PostSinglePage from "./pages/Post/PostSinglePage"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {

  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Routes>
            <Route element={<ProtectedRoute />}>
              {/* Post */}
              <Route path='/' element={<PostListPage />} />
              <Route path='/post/:id' element={<PostSinglePage />} />
              {/* Routes Protégées */}
              <Route path='/post/add' element={<PostAddPage />} />
              <Route path='/post/edit/:id' element={<PostEditPage />} />
            </Route>
            {/* Auth Pages */}
            <Route path='/register' element={<SignupPage />} />
            <Route path='/login' element={<SigninPage />} />
          </Routes>
        </main>
        <Toaster richColors position="bottom-right" />
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
