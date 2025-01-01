import { useMutation } from "@tanstack/react-query";

const TIMESLOT_URL = import.meta.env.VITE_TIMESLOT_URL;

async function addVideo(apiKey: string, stationId: string, videoId: string) {
  const url = new URL(`${TIMESLOT_URL}/api/stations/${stationId}/videos/${videoId}`, window.location.origin);
  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to add video: ${response.statusText}`);
  }

  return await response.json();
}

export function useAddVideo() {
  return useMutation({
    mutationFn: ({ apiKey, stationId, videoId }: { apiKey: string; stationId: string; videoId: string }) => addVideo(apiKey, stationId, videoId),
  });
}
