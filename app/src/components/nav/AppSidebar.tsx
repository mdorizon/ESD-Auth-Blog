import { Columns2, SquarePlus } from "lucide-react"
import { NavPersonnalsPosts } from "@/components/nav/NavPersonnalPosts"
import { NavUser } from "@/components/nav/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { ComponentProps, useEffect } from "react"
import { useUserPosts } from "@/context/UserPostsProvider"

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { userPosts, fetchUserData } = useUserPosts();
  const { userData, loading } = useAuth();
  
  useEffect(() => {
    if (userData) {
      fetchUserData();
    }
  }, [userData, fetchUserData]);

  if(loading){return}
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Auth Blog</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={"/"}>
                  <Columns2 />
                  <span>Blog</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {userData &&
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={"/post/add"}>
                    <SquarePlus />
                    <span>Add a post</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            }
          </SidebarMenu>
        </SidebarGroup>
        {userData && <NavPersonnalsPosts posts={userPosts} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}