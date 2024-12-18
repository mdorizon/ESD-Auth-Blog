import { useLocation } from "react-router-dom";
import { AppSidebar } from "./components/nav/AppSidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import { ReactNode } from "react";
import { UserPostsProvider } from "./context/UserPostsProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideSidebarRoutes = ["/register", "/login"];

  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <UserPostsProvider>
      <SidebarProvider>
        {shouldShowSidebar && <AppSidebar />}
        <main className="w-full">{children}</main>
      </SidebarProvider>
    </UserPostsProvider>
  );
}

export default Layout;