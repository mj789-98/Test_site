import { useState } from "react";
import { createPortal } from "react-dom";

const sampleVideos = [
  {
    id: "yFjFdLrm2oU",
    source: "youtube",
    title: "Plane — Endless Arcade Flight Shooter",
    description:
      "Endless arcade flight shooter for Android — procedural obstacle waves, tilt-free touch steering and score-chasing runs.",
  },
  {
    id: "1JVuvNeR06Do6V59Vrhi-QgiujTBY4bNY",
    title: "Battleverse",
    description:
      "PUBG-style multiplayer battle royale shooter — real-time networked matches built on Photon PUN.",
  },
  {
    id: "19ql1zvYEL5xY0YCWqMpiejGVnNk5HoJU",
    title: "Leap On",
    description:
      "Endless arcade score-chaser — time your leaps between platforms and push past your best run.",
  },
  {
    id: "1tdAos26TSGtObBzzUoILl9kFTAttIHWl",
    title: "Turn",
    description:
      "Tap-timing arcade runner through an endless maze of corners — mistime a turn and your cube shrinks, narrowing the passage; nail four in a row and it grows back.",
  },
  {
    id: "1Nv5hVfKiNVFbyb20RlLkYmeghM-qM1fb",
    title: "Cup Heroes",
    description:
      "Wave-based mobile RPG built in Unity 6 for Android — stylised low-poly combat, a branching skill tree, shop economy and player progression.",
    duration: "1:37",
  },
  {
    id: "1EOXk4_J_B7bgpYeMJ3Kv2NoYZEwQJt7n",
    title: "Solitaire",
    tag: "Nakama",
    description:
      "Classic Klondike solitaire built in Unity — drag-and-drop card handling, undo, and score tracking.",
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

// Drive's lh3.googleusercontent.com/d/<id> host throttles aggressively and
// starts failing after a handful of loads; the /thumbnail endpoint is stable.
const thumbnailFor = (video) =>
  video.thumbnail ||
  (video.source === "youtube"
    ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`
    : `https://drive.google.com/thumbnail?id=${video.id}&sz=w640`);

const embedFor = (video) =>
  video.source === "youtube"
    ? `https://www.youtube.com/embed/${video.id}`
    : `https://drive.google.com/file/d/${video.id}/preview`;

const VideoCard = ({ video, onClick }) => {
  // Drive auto-generates thumbnails from the first frame, which is rarely the
  // most representative one. `thumbnail` overrides it when supplied.
  const thumbnailUrl = thumbnailFor(video);

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
        <h3 className="video-title">
          {video.title}
          {video.tag && <span className="video-title-tag"> ({video.tag})</span>}
        </h3>
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
            src={embedFor(video)}
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
