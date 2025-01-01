import { useQuery } from "@tanstack/react-query";
import { Station } from "./types";

const TIMESLOT_URL = import.meta.env.VITE_TIMESLOT_URL;

async function fetchStations(apiKey: string, videoId?: string) {
  const url = new URL(`${TIMESLOT_URL}/api/stations`);
  if (videoId) {
    url.searchParams.set("videoId", videoId);
  }
  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  return response.json();
}

const useStations = (apiKey: string, videoId?: string) => {
  return useQuery<Station[]>({
    queryKey: ["stations", apiKey, videoId],
    queryFn: () => fetchStations(apiKey, videoId),
    gcTime: 0,
  });
};

export default useStations;
