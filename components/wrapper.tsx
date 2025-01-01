import { useState } from "react";
// Start of Selection
import SettingsIcon from "@/assets/icons/settings";
import XIcon from "@/assets/icons/x";
import Settings from "@/screens/settings";

export default function Wrapper({ children, title, showSettingsButton, apiKey }: { children: React.ReactNode; title?: string; showSettingsButton?: boolean; apiKey?: string }) {
  const [showSettings, setShowSettings] = useState(false);

  const handleSettingsClick = () => {
    console.log("Settings button clicked");
    setShowSettings(!showSettings);
  };

  return (
    <div className="p-4 bg-background-light text-foreground h-[400px] w-full overflow-y-scroll flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        {showSettingsButton && (
          <Button variant="secondary" size="icon" onClick={handleSettingsClick}>
            {showSettings ? <XIcon /> : <SettingsIcon />}
          </Button>
        )}
      </div>
      {showSettings && <Settings apiKey={apiKey ?? ""} />}
      {!showSettings && children}
    </div>
  );
}
