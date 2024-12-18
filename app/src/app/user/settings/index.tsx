import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Button } from "@/components/ui/button";
import Profile from "@/components/user/settings/Profile";
import Appearance from "@/components/user/settings/Appearance";
import Security from "@/components/user/settings/Security";

const sidebarNavItems = [
  {
    title: "Profile",
    component: "profile",
  },
  {
    title: "Appearance",
    component: "appearance",
  },
  {
    title: "Security",
    component: "security",
  }
]

export default function UserSettings() {
  const [actualPage, setActualPage] = useState<'profile' | 'appearance' | 'security'>('profile');

  const renderPageContent = () => {
    switch (actualPage) {
      case 'profile':
        return <Profile />
      case 'appearance':
        return <Appearance />
      case 'security':
        return <Security />
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <nav className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}>
              {sidebarNavItems.map((item, index) => (
                <Button
                  variant="ghost"
                  className="justify-start"
                  key={index}
                  // @ts-expect-error type not needed
                  onClick={() => setActualPage(item.component)}
                >
                  {item.title}
                </Button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {renderPageContent() }
          </div>
        </div>
      </div>
    </>
  )
}