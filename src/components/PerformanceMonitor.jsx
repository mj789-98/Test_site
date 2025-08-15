import { useEffect, useState } from "react";

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    pageLoadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    assetLoadTimes: {},
    modelLoadStart: null,
    modelLoadEnd: null,
    modelLoadTime: 0,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Measure basic page load metrics
    const measurePageMetrics = () => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paintEntries = performance.getEntriesByType("paint");

      const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.fetchStart;

      const firstPaint =
        paintEntries.find((entry) => entry.name === "first-paint")?.startTime ||
        0;
      const firstContentfulPaint =
        paintEntries.find((entry) => entry.name === "first-contentful-paint")
          ?.startTime || 0;

      setMetrics((prev) => ({
        ...prev,
        pageLoadTime: Math.round(pageLoadTime),
        domContentLoaded: Math.round(domContentLoaded),
        firstPaint: Math.round(firstPaint),
        firstContentfulPaint: Math.round(firstContentfulPaint),
      }));
    };

    // Measure asset load times
    const measureAssetTimes = () => {
      const resources = performance.getEntriesByType("resource");
      const assetLoadTimes = {};

      resources.forEach((resource) => {
        const fileName = resource.name.split("/").pop();
        const loadTime = resource.responseEnd - resource.startTime;

        if (
          fileName.includes(".glb") ||
          fileName.includes(".svg") ||
          fileName.includes(".png") ||
          fileName.includes(".jpg")
        ) {
          assetLoadTimes[fileName] = Math.round(loadTime);
        }
      });

      setMetrics((prev) => ({
        ...prev,
        assetLoadTimes,
      }));
    };

    // Measure LCP
    const measureLCP = () => {
      if ("PerformanceObserver" in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics((prev) => ({
            ...prev,
            largestContentfulPaint: Math.round(lastEntry.startTime),
          }));
        });
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      }
    };

    // Wait for page to fully load before measuring
    if (document.readyState === "complete") {
      measurePageMetrics();
      measureAssetTimes();
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          measurePageMetrics();
          measureAssetTimes();
        }, 100);
      });
    }

    measureLCP();

    // Global function to track 3D model loading
    window.trackModelLoadStart = () => {
      setMetrics((prev) => ({
        ...prev,
        modelLoadStart: performance.now(),
      }));
    };

    window.trackModelLoadEnd = () => {
      setMetrics((prev) => {
        const loadTime = prev.modelLoadStart
          ? performance.now() - prev.modelLoadStart
          : 0;
        return {
          ...prev,
          modelLoadEnd: performance.now(),
          modelLoadTime: Math.round(loadTime),
        };
      });
    };
  }, []);

  const getPerformanceGrade = (time) => {
    if (time < 1000) return { grade: "A", color: "text-green-400" };
    if (time < 2500) return { grade: "B", color: "text-yellow-400" };
    if (time < 4000) return { grade: "C", color: "text-orange-400" };
    return { grade: "D", color: "text-red-400" };
  };

  const saveMetricsToFile = () => {
    const timestamp = new Date().toISOString();
    const metricsData = {
      timestamp,
      ...metrics,
      userAgent: navigator.userAgent,
      connection: navigator.connection
        ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
          }
        : "unknown",
    };

    const blob = new Blob([JSON.stringify(metricsData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `performance-metrics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-4 right-0 z-50 font-mono">
      {/* Collapsed state - small tab on the border */}
      {!isExpanded && (
        <div
          onClick={() => setIsExpanded(true)}
          className="bg-black/80 text-white px-3 py-2 rounded-l-lg cursor-pointer hover:bg-black/90 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xs">📊</span>
            <span className="text-xs font-bold">Perf</span>
          </div>
          <div className="text-xs text-gray-300">
            {metrics.pageLoadTime > 0 && (
              <span className={getPerformanceGrade(metrics.pageLoadTime).color}>
                {metrics.pageLoadTime}ms
              </span>
            )}
          </div>
        </div>
      )}

      {/* Expanded state - full performance monitor */}
      {isExpanded && (
        <div className="bg-black/90 text-white p-4 rounded-l-lg text-xs max-w-sm border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold">Performance Monitor</h3>
            <div className="flex space-x-2">
              <button
                onClick={saveMetricsToFile}
                className="text-blue-400 hover:text-blue-300 text-xs"
                title="Save Metrics"
              >
                💾
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white text-xs"
                title="Collapse"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Page Load:</span>
              <span className={getPerformanceGrade(metrics.pageLoadTime).color}>
                {metrics.pageLoadTime}ms (
                {getPerformanceGrade(metrics.pageLoadTime).grade})
              </span>
            </div>

            <div className="flex justify-between">
              <span>DOM Ready:</span>
              <span
                className={getPerformanceGrade(metrics.domContentLoaded).color}
              >
                {metrics.domContentLoaded}ms
              </span>
            </div>

            <div className="flex justify-between">
              <span>First Paint:</span>
              <span className={getPerformanceGrade(metrics.firstPaint).color}>
                {metrics.firstPaint}ms
              </span>
            </div>

            <div className="flex justify-between">
              <span>FCP:</span>
              <span
                className={
                  getPerformanceGrade(metrics.firstContentfulPaint).color
                }
              >
                {metrics.firstContentfulPaint}ms
              </span>
            </div>

            <div className="flex justify-between">
              <span>LCP:</span>
              <span
                className={
                  getPerformanceGrade(metrics.largestContentfulPaint).color
                }
              >
                {metrics.largestContentfulPaint}ms
              </span>
            </div>

            {metrics.modelLoadTime > 0 && (
              <div className="flex justify-between">
                <span>3D Model:</span>
                <span
                  className={getPerformanceGrade(metrics.modelLoadTime).color}
                >
                  {metrics.modelLoadTime}ms
                </span>
              </div>
            )}
          </div>

          {Object.keys(metrics.assetLoadTimes).length > 0 && (
            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-gray-300">
                Asset Load Times
              </summary>
              <div className="mt-1 space-y-1 text-xs max-h-32 overflow-y-auto">
                {Object.entries(metrics.assetLoadTimes).map(([asset, time]) => (
                  <div key={asset} className="flex justify-between">
                    <span className="truncate max-w-20">{asset}</span>
                    <span className={getPerformanceGrade(time).color}>
                      {time}ms
                    </span>
                  </div>
                ))}
              </div>
            </details>
          )}

          <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
            Press F12 → Network tab for detailed analysis
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
