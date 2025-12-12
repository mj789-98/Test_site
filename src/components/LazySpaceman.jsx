import { Suspense, lazy } from "react";

// Lazy load the heavy 3D component
const SpacemanCanvas = lazy(() => import("./Spaceman"));

// Loading skeleton for the 3D model
const SpacemanSkeleton = () => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        <span className="ml-4 text-white/60 text-sm">Loading 3D Model...</span>
    </div>
);

// Wrapper component that lazy loads SpacemanCanvas
const LazySpacemanCanvas = ({ scrollContainer }) => {
    return (
        <Suspense fallback={<SpacemanSkeleton />}>
            <SpacemanCanvas scrollContainer={scrollContainer} />
        </Suspense>
    );
};

export default LazySpacemanCanvas;
