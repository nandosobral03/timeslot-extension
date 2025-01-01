import PlusIcon from "@/assets/icons/plus";
import TrashIcon from "@/assets/icons/trash";
import VideoIcon from "@/assets/icons/video";
import { Button } from "@/components/button";
import Wrapper from "@/components/wrapper";
import { Station } from "@/utils/types";
import { useAddVideo } from "@/utils/useAddVideo";
import { useDeleteVideo } from "@/utils/useRemoveVideo";
import useStations from "@/utils/useStations";
import { storage } from "wxt/storage";

export default function Stations({ apiKey, videoId }: { apiKey: string; videoId?: string }) {
  const [videoInStations, setVideoInStations] = useState<Record<string, boolean>>({});
  const { data: stations, isLoading, error } = useStations(apiKey, videoId);
  const { mutate: addVideo, isPending: isAddingVideo } = useAddVideo();
  const { mutate: deleteVideo, isPending: isDeletingVideo } = useDeleteVideo();

  const handleRemoveApiKey = () => {
    storage.removeItem("local:apiKey");
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Wrapper title="Stations" showSettingsButton={true} apiKey={apiKey}>
        <div className="text-center text-gray-500 text-sm grow flex flex-col justify-center">Loading...</div>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper title="Stations" showSettingsButton={true} apiKey={apiKey}>
        <div className="text-center text-red-500 text-xs grow flex flex-col justify-center gap-2">
          Uh oh! Looks like something went wrong.
          <br />
          {error.message.includes("401") && (
            <>
              <p>This is likely because your API key is invalid, please try removing it and adding it again.</p>
              <Button variant="default" size="sm" onClick={handleRemoveApiKey}>
                Remove API Key
              </Button>
            </>
          )}
        </div>
      </Wrapper>
    );
  }

  const handleAddVideo = (stationId: string) => {
    if (!videoId) return;

    addVideo(
      { apiKey, stationId, videoId },
      {
        onSuccess: () => {
          setVideoInStations((prev) => ({ ...prev, [stationId]: true }));
        },
        onError: (error) => {
          console.error("Failed to add video:", error);
        },
      }
    );
  };

  const handleDeleteVideo = (stationId: string) => {
    if (!videoId) return;

    deleteVideo(
      { apiKey, stationId, videoId },
      {
        onSuccess: () => {
          setVideoInStations((prev) => ({ ...prev, [stationId]: false }));
        },
        onError: (error) => {
          console.error("Failed to delete video:", error);
        },
      }
    );
  };

  let loading = isAddingVideo || isDeletingVideo || isLoading;

  const realCount = (station: Station) => {
    let originalCount = station._count.videos;

    if (videoInStations[station.id] === undefined) return originalCount;
    if (videoInStations[station.id] && station.videos.length === 0) {
      originalCount++;
    }

    if (!videoInStations[station.id] && station.videos.length > 0) {
      originalCount--;
    }

    return originalCount;
  };

  return (
    <Wrapper title="Stations" showSettingsButton={true} apiKey={apiKey}>
      <div className="flex flex-col gap-2 h-full">
        {stations?.map((station: Station) => {
          const videoInStation = videoInStations[station.id] ?? station.videos.length > 0;
          return (
            <div key={station.id} className="flex gap-4 items-center bg-background p-3 rounded-md shadow-sm">
              <div className="aspect-video h-16 w-16 overflow-hidden rounded-md">
                <img src={station.thumbnail} alt={station.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold">{station.name}</h2>
                <div className="flex justify-between items-center">
                  <p className="flex items-center gap-2 text-xs text-gray-600">
                    <VideoIcon className="w-4 h-4 text-gray-400" />
                    {realCount(station)} Videos
                  </p>
                  {videoId && (
                    <Button variant="default" size="icon" onClick={() => (videoInStation ? handleDeleteVideo(station.id) : handleAddVideo(station.id))} disabled={loading}>
                      {videoInStation ? <TrashIcon className="text-background" /> : <PlusIcon className="text-background" />}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
}
