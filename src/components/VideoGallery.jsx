import { useState } from "react";
import { createPortal } from "react-dom";

// Your Google Drive videos
// Make sure each video's sharing is set to "Anyone with the link can view"
const sampleVideos = [
    {
        id: "1Nv5hVfKiNVFbyb20RlLkYmeghM-qM1fb",
        title: "Project Demo 1",
        description: "Click to watch",
    },
    {
        id: "1p9RjlwkagGRQHbW27lGA4_0E3j-ihSMT",
        title: "Project Demo 2",
        description: "Click to watch",
    },
    {
        id: "19dwT8RdOe3ultq48CbVmyVk_PQ9agTjc",
        title: "Project Demo 3",
        description: "Click to watch",
    },
];

const VideoCard = ({ video, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    // Thumbnail URL from Google Drive - using the export view format
    const thumbnailUrl = `https://lh3.googleusercontent.com/d/${video.id}=w400`;

    return (
        <div
            className="video-card group cursor-pointer"
            onClick={() => onClick(video)}
        >
            <div className="video-thumbnail-container">
                {/* Thumbnail with play button overlay */}
                <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="video-thumbnail"
                    onLoad={() => setIsLoaded(true)}
                    onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect fill='%231a1a2e' width='400' height='225'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em' font-family='sans-serif'%3EVideo%3C/text%3E%3C/svg%3E";
                    }}
                />
                <div className="play-button-overlay">
                    <div className="play-button">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                {video.description && (
                    <p className="video-description">{video.description}</p>
                )}
            </div>
        </div>
    );
};

const VideoModal = ({ video, onClose }) => {
    if (!video) return null;

    // Use portal to render modal at body level (outside wrapper with perspective)
    return createPortal(
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
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
                <p className="section-subtitle">MY WORK</p>
                <h2 className="section-title">
                    Video <span className="text-gradient">Gallery</span>
                </h2>
                <p className="section-description">
                    Check out some of my project demos and tutorials
                </p>
            </div>

            <div className="video-grid">
                {videos.map((video, index) => (
                    <VideoCard
                        key={video.id || index}
                        video={video}
                        onClick={setSelectedVideo}
                    />
                ))}
            </div>

            <VideoModal
                video={selectedVideo}
                onClose={() => setSelectedVideo(null)}
            />
        </section>
    );
};

export default VideoGallery;
