import * as React from "react"
import { Columns2, SquarePlus } from "lucide-react"
import { NavPersonnalsPosts } from "@/components/nav/NavPersonnalPosts"
import { NavUser } from "@/components/nav/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar"
import { accountData } from "@/services/auth.service"
import { UserType } from "@/types/user.type"
import { getAllPostsByUser } from "@/services/post.service"
import { Link } from "react-router-dom"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userPosts, setUserPosts] = React.useState([])
  const [user, setUser] = React.useState<UserType>()

  // fetch user & his posts
  const fetchUserData = async() => {
    try {
      const data = await accountData()
      setUser(data);
      // si un user est bien connecté on fetch ses posts
      try {
        const posts = await getAllPostsByUser();
        setUserPosts(posts);
      } catch (e) {
        console.log('Error to fetch user posts', e)
      }
    } catch (e) {
      console.log('Error to fetch user data', e)
    }
  }

  React.useEffect(() => {
    fetchUserData()
  }, [])

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
            {user &&
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
        {user && <NavPersonnalsPosts posts={userPosts} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
