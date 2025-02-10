export const validateVideoUrl = (url: string): boolean => {
  return url.includes('youtube.com/watch?v=') || url.includes('youtu.be/');
};

export const getYouTubeEmbedUrl = (url: string): string => {
  try {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1]
      : url.split('v=')[1]?.split('&')[0];

    if (!videoId) return '';

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}&enablejsapi=1&playsinline=1`;
  } catch {
    return '';
  }
};