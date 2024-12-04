import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from "sonner"
import PostListPage from "./pages/Post/PostListPage"
import { SidebarProvider } from "./components/ui/sidebar"
import { AppSidebar } from "./components/AppSidebar"
import PostAddPage from "./pages/Post/PostAddPage"


function App() {

  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <Routes>
            {/* Post */}
            <Route path='/' element={<PostListPage />} />
            <Route path='/add' element={<PostAddPage />} />
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
