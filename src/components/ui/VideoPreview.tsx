interface VideoPreviewProps {
  src: string;
  isPlaying: boolean;
  onError: () => void;
}

export function VideoPreview({ src, isPlaying, onError }: VideoPreviewProps) {
  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <img
        src={src}
        alt="Game Preview"
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ 
          opacity: isPlaying ? 1 : 0,
        }}
        onError={onError}
      />
    </div>
  );
}