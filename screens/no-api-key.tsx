import React, { useState } from "react";
import { storage } from "wxt/storage";
import { Button } from "../components/button";
import Wrapper from "../components/wrapper";

const NoApiKey = () => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError("API key is required");
    } else {
      storage.setItem("local:apiKey", apiKey);
      setError("");
      // Handle API key submission logic here
    }
  };

  return (
    <Wrapper>
      <h1 className="text-2xl font-bold mb-4">Hey there!</h1>
      <p className="mb-4">
        Timeslot is a tool to schedule and manage youtube videos as if they were on live TV. This extension is a companion to the Timeslot web app. Which you can find at{" "}
        <a href={import.meta.env.VITE_TIMESLOT_URL} className="underline text-primary hover:text-primary/80">
          {import.meta.env.VITE_TIMESLOT_URL}
        </a>
      </p>
      <form onSubmit={handleApiKeySubmit} className="mb-4 flex flex-col gap-4">
        <label className="block mb-4">
          Enter your API key:
          <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} required className="border rounded p-2 w-full bg-input text-foreground bg-background" placeholder="Enter your API key here" />
        </label>
        <Button type="submit" variant="default" size="default">
          Submit
        </Button>
      </form>
      {error && <p className="text-destructive">{error}</p>}
    </Wrapper>
  );
};

export default NoApiKey;
