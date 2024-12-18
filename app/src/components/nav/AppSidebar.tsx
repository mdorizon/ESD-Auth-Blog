import * as React from "react"
import { Columns2, SquarePlus } from "lucide-react"
import { NavPersonnalsPosts } from "@/components/nav/NavPersonnalPosts"
import { NavUser } from "@/components/nav/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { getAllPostsByUser } from "@/services/post.service"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userPosts, setUserPosts] = React.useState([])
  const { userData, loading} = useAuth();
  
  // fetch user & his posts
  const fetchUserData = async() => {
    try {
      const posts = await getAllPostsByUser();
      setUserPosts(posts);
    } catch (e) {
      console.log('Error to fetch user posts', e)
    }
  }
  
  React.useEffect(() => {
    fetchUserData()
  }, [])
  
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
        {userData && <NavPersonnalsPosts posts={userPosts} reloadData={fetchUserData} />}
      </SidebarContent>
      <SidebarFooter>
        {userData && <NavUser user={userData} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
