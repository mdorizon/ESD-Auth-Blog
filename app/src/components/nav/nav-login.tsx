"use client"

import { User } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

export function NavLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={handleLogin}>
          <div className="flex items-center gap-4 text-left text-sm leading-tight">
            <User />
            <span className="truncate font-semibold">Se connecter</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
