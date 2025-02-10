import { useRef, useEffect } from 'react';

export function useVideoPreview(isHovered: boolean) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isHovered && videoRef.current) {
      const playVideo = async () => {
        try {
          if (!videoRef.current) return;
          
          videoRef.current.currentTime = 0;
          videoRef.current.muted = true;
          const playPromise = videoRef.current.play();
          
          if (playPromise !== undefined) {
            await playPromise.catch(() => {
              // Silently handle autoplay prevention
            });
          }
          
          previewTimeoutRef.current = setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.pause();
              videoRef.current.currentTime = 0;
            }
          }, 10000);
        } catch (error) {
          console.warn('Video preview error:', error);
        }
      };

      playVideo();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    }

    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, [isHovered]);

  const handleVideoError = () => {
    if (videoRef.current) {
      videoRef.current.style.display = 'none';
    }
  };

  return { videoRef, handleVideoError };
}