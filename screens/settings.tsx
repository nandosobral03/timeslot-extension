import React, { useState } from "react";
import { storage } from "wxt/storage";
import { Button } from "../components/button";
import Wrapper from "../components/wrapper";

const Settings = ({ apiKey }: { apiKey: string }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [localApiKey, setLocalApiKey] = useState(apiKey);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localApiKey.trim()) {
      setError("API key is required");
      setSuccess("");
    } else {
      storage.setItem("local:apiKey", localApiKey);
      setError("");
      setSuccess("API key saved successfully!");
    }
  };

  const handleRemoveApiKey = () => {
    storage.removeItem("local:apiKey");
    setLocalApiKey("");
    setError("");
    setSuccess("API key removed successfully!");
  };

  return (
    <Wrapper>
      <p className="mb-4">
        Timeslot is a tool to schedule and manage youtube videos as if they were on live TV. This extension is a companion to the Timeslot web app. Which you can find at{" "}
        <a href="https://timeslot.app" className="underline text-primary hover:text-primary/80">
          https://timeslot.app
        </a>
      </p>
      <form onSubmit={handleApiKeySubmit} className="mb-4 flex flex-col gap-4">
        <label className="block mb-4">
          Enter your API key:
          <input type="text" value={localApiKey} onChange={(e) => setLocalApiKey(e.target.value)} required className="border rounded p-2 w-full bg-input text-foreground bg-background" placeholder="Enter your API key here" />
        </label>
        <div className="flex justify-center gap-2 items-center">
          <Button onClick={handleRemoveApiKey} variant="secondary" size="default" type="button" className="grow">
            Remove API Key
          </Button>

          <Button type="submit" variant="default" size="default" className="grow">
            Submit
          </Button>
        </div>
      </form>
      {error && <p className="text-destructive">{error}</p>}
      {success && <p className="text-success">{success}</p>}
    </Wrapper>
  );
};

export default Settings;
