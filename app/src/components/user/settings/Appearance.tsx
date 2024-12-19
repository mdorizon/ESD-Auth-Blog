import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";

const Appearance = () => {
  const { theme, changeTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">(theme);

  const handleThemeChange = (value: "light" | "dark") => {
    setSelectedTheme(value)
  };

  const handleSubmit = () => {
    changeTheme(selectedTheme);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator className="my-6" />
      <div>
        <h2 className="text-sm font-medium">Theme</h2>
        <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
      </div>
      <div className="grid max-w-md grid-cols-2 gap-8">
        <div>
          <div
            onClick={() => handleThemeChange("light")}
            className={`cursor-pointer items-center rounded-md border-2 p-1 ${
              selectedTheme === "light" ? "border-primary" : "border-muted"
            }`}
          >
            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">Light</span>
        </div>
        <div>
          <div
            onClick={() => handleThemeChange("dark")}
            className={`cursor-pointer items-center rounded-md border-2 p-1 ${
              selectedTheme === "dark" ? "border-primary" : "border-muted"
            }`}
          >
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">Dark</span>
        </div>
      </div>
      <Button onClick={handleSubmit}>
        Update preferences
      </Button>
    </div>
  );
};

export default Appearance;