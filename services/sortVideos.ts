import { fetchVideoDetails } from "@/services/youtubeApi";

export const sortVideos = async (videos: any[], sortType: string) => {
  let sorted = [...videos];

  if (sortType === "latest") {
    sorted.sort(
      (a, b) =>
        new Date(b.snippet.publishedAt).getTime() -
        new Date(a.snippet.publishedAt).getTime()
    );
  } else if (sortType === "oldest") {
    sorted.sort(
      (a, b) =>
        new Date(a.snippet.publishedAt).getTime() -
        new Date(b.snippet.publishedAt).getTime()
    );
  } else if (sortType === "popular") {
    const videoIds = videos.map((video) => video.id.videoId || video.id);

    const detailsPromises = videoIds.map((id: string) => fetchVideoDetails(id));
    const details = await Promise.all(detailsPromises);

    const viewCounts: Record<string, number> = {};
    details.forEach((detail) => {
      if (detail && detail.id) {
        viewCounts[detail.id] = Number(detail.statistics?.viewCount || 0);
      }
    });

    sorted.sort((a, b) => {
      const viewsA = viewCounts[a.id.videoId || a.id] || 0;
      const viewsB = viewCounts[b.id.videoId || b.id] || 0;
      return viewsB - viewsA;
    });
  }

  return sorted;
};
