export type Station = {
  id: string;
  name: string;
  thumbnail: string;
  isPublic: boolean;
  videos: {
    videoId: string;
  }[];
  _count: {
    videos: number;
  };
};
