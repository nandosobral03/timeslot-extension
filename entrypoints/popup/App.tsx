import NoApiKey from "@/screens/no-api-key";
import Stations from "@/screens/stations";
import { useEffect, useState } from "react";
import { browser } from "wxt/browser";
import { storage } from "wxt/storage";

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      setCurrentUrl(tabs[0]?.url ?? null);
      console.log("tab", tabs[0]);
    });
  }, []);

  storage.watch("local:apiKey", (key) => {
    console.log("apiKey", key);
    setApiKey(key as string);
  });

  useEffect(() => {
    async function fetchApiKey() {
      const key = await storage.getItem("local:apiKey");
      setApiKey(key as string);
    }
    fetchApiKey();
  }, []);

  if (!apiKey) {
    return <NoApiKey />;
  }

  const urlParams = new URLSearchParams(new URL(currentUrl ?? "").search);
  const videoId = urlParams.get("v");

  return <Stations apiKey={apiKey} videoId={videoId ?? undefined} />;
}

export default App;
