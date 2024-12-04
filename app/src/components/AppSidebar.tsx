import { Rss, SquarePlus, User, UserPlus } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

const postItems = [
  {
    title: "Blog",
    url: "/",
    icon: Rss,
  },
  {
    title: "Créer un post",
    url: "/add",
    icon: SquarePlus,
  }
]

const userItems = [
  {
    title: "Utilisateurs",
    url: "#",
    icon: User,
  },
  {
    title: "Ajouter un utilisateur",
    url: "#",
    icon: UserPlus,
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarTrigger />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Posts
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {postItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Utilisateurs
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
