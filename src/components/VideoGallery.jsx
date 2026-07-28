import { useState } from "react";
import { createPortal } from "react-dom";

const sampleVideos = [
  {
    id: "1Nv5hVfKiNVFbyb20RlLkYmeghM-qM1fb",
    title: "Cup Heroes",
    description:
      "Wave-based mobile RPG built in Unity 6 for Android — stylised low-poly combat, a branching skill tree, shop economy and player progression.",
    duration: "1:37",
  },
  {
    id: "1p9RjlwkagGRQHbW27lGA4_0E3j-ihSMT",
    title: "Third-Person Shooter — Mobile Prototype",
    description:
      "Unity third-person controller driven entirely by touch input: virtual joystick, aim reticle, jump and fire, tested against targets in a greybox level.",
    duration: "0:39",
  },
  {
    id: "19dwT8RdOe3ultq48CbVmyVk_PQ9agTjc",
    title: "2D Boxing — Local Versus",
    description:
      "Two-player Unity fighter with hitbox-driven punch combat, per-player health bars and animator-based damage states.",
    duration: "0:35",
  },
];

const VideoCard = ({ video, onClick }) => {
  // Drive auto-generates thumbnails from the first frame, which is rarely the
  // most representative one. `thumbnail` overrides it when supplied.
  const thumbnailUrl =
    video.thumbnail || `https://lh3.googleusercontent.com/d/${video.id}=w400`;

  return (
    <div className="video-card group" onClick={() => onClick(video)}>
      <div className="video-thumbnail-container">
        <img
          src={thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="video-thumbnail"
          onError={(e) => {
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect fill='%230a0a0a' width='400' height='225'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14'%3EVideo Preview%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="play-button-overlay">
          <div className="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {video.duration && <span className="video-duration">{video.duration}</span>}
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        {video.description && <p className="video-description">{video.description}</p>}
      </div>
    </div>
  );
};

const VideoModal = ({ video, onClose }) => {
  if (!video) return null;

  return createPortal(
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal relative" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className="video-modal-content">
          <iframe
            src={`https://drive.google.com/file/d/${video.id}/preview`}
            title={video.title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="video-iframe"
          />
        </div>
        <div className="video-modal-info">
          <h3>{video.title}</h3>
          {video.description && <p>{video.description}</p>}
        </div>
      </div>
    </div>,
    document.body
  );
};

const VideoGallery = ({ videos = sampleVideos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="video-gallery-section">
      <div className="video-gallery-header">
        <p className="section-subtitle">My Work</p>
        <h2 className="section-title">
          Video <span className="text-gradient">Gallery</span>
        </h2>
        <p className="section-description">
          Gameplay and development walkthroughs from my Unity projects
        </p>
      </div>

      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={video.id || index} video={video} onClick={setSelectedVideo} />
        ))}
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  );
};

export default VideoGallery;
