import { useState, useRef, useEffect, useCallback } from 'react';

export default function VideoPlayer({ 
  src, 
  poster, 
  autoPlay = true, 
  loop = true, 
  autoPlayOnScroll = true,
  initialMuted = true 
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [isLoading, setIsLoading] = useState(true);

  // Autoplay on mount and scroll with IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.loop = loop;

    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Fallback for strict browser autoplay
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
          });
      }
    }

    if (!autoPlayOnScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            videoRef.current.play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0, 0.2, 0.6] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlay, autoPlayOnScroll, loop, isMuted]);

  const togglePlay = useCallback((e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  return (
    <div
      ref={containerRef}
      className="minimal-video-player"
      onClick={togglePlay}
    >
      {/* Loading shimmer overlay */}
      {isLoading && (
        <div className="video-loading-overlay">
          <div className="video-loading-pulse" />
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="auto"
        muted={isMuted}
        loop={loop}
        autoPlay={autoPlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={handleCanPlay}
        onPlaying={handleCanPlay}
        onWaiting={handleWaiting}
        className="minimal-video-player__element"
      />

      {/* Unified Minimal Pill Control (Only appears on hover) */}
      <div className="video-pill-controls" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="video-pill-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <span className="video-pill-divider" />

        <button
          type="button"
          className={`video-pill-btn video-pill-btn--audio ${!isMuted ? 'is-active' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
          <span className="video-pill-audio-text">{isMuted ? 'Unmute' : 'Mute'}</span>
        </button>
      </div>
    </div>
  );
}
