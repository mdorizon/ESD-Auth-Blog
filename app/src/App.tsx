import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import PostListPage from "./pages/Post/PostListPage"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/nav/app-sidebar"
import PostAddPage from "./pages/Post/PostAddPage"
import SignupPage from "./pages/auth/SignupPage"
import SigninPage from "./pages/auth/SigninPage"


function App() {

  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Routes>
            {/* Post */}
            <Route path='/' element={<PostListPage />} />
            <Route path='/add' element={<PostAddPage />} />
            {/* Auth Pages */}
            <Route path='/register' element={<SignupPage />} />
            <Route path='/login' element={<SigninPage />} />

            {/* <Route path='/edit/:id' element={<TravelEditPage />} /> */}
            {/* User */}
            {/* <Route path='/category' element={<CategoryListPage />} />
            <Route path='/category/:id' element={<CategorySinglePage />} />
            <Route path='/category/edit/:id' element={<CategoryEditPage />} /> */}
          </Routes>
        </main>
        <Toaster richColors position="bottom-right" />
      </SidebarProvider>
    </BrowserRouter>
  )
}

export default App
