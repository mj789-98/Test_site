#!/usr/bin/env node

/**
 * Performance Testing Script
 * Measures load times and saves baseline metrics
 */

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const SITE_URL = "http://localhost:5175";
const RESULTS_DIR = "./performance-results";

async function measurePerformance(label = "baseline") {
  console.log(`🚀 Starting performance test: ${label}`);

  const browser = await puppeteer.launch({
    headless: false, // Set to true for CI/automated testing
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Enable performance monitoring
  await page.setCacheEnabled(false); // Disable cache for accurate measurements

  const metrics = {
    timestamp: new Date().toISOString(),
    label,
    url: SITE_URL,
  };

  try {
    console.log("📊 Loading page and collecting metrics...");

    // Start performance tracking
    const startTime = Date.now();

    // Navigate to page
    await page.goto(SITE_URL, {
      waitUntil: "networkidle2", // Wait until network is idle
      timeout: 30000,
    });

    // Wait for 3D content to potentially load
    await page.waitForTimeout(3000);

    // Collect performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paintEntries = performance.getEntriesByType("paint");
      const resources = performance.getEntriesByType("resource");

      // Calculate key metrics
      const pageLoadTime = navigation.loadEventEnd - navigation.fetchStart;
      const domContentLoaded =
        navigation.domContentLoadedEventEnd - navigation.fetchStart;
      const firstPaint =
        paintEntries.find((entry) => entry.name === "first-paint")?.startTime ||
        0;
      const firstContentfulPaint =
        paintEntries.find((entry) => entry.name === "first-contentful-paint")
          ?.startTime || 0;

      // Analyze resource loading
      const assetMetrics = {};
      let totalAssetSize = 0;

      resources.forEach((resource) => {
        const fileName = resource.name.split("/").pop();
        const loadTime = resource.responseEnd - resource.startTime;
        const size = resource.transferSize || resource.encodedBodySize || 0;

        if (
          fileName.includes(".glb") ||
          fileName.includes(".svg") ||
          fileName.includes(".png") ||
          fileName.includes(".jpg")
        ) {
          assetMetrics[fileName] = {
            loadTime: Math.round(loadTime),
            size: size,
            sizeKB: Math.round(size / 1024),
          };
          totalAssetSize += size;
        }
      });

      return {
        pageLoadTime: Math.round(pageLoadTime),
        domContentLoaded: Math.round(domContentLoaded),
        firstPaint: Math.round(firstPaint),
        firstContentfulPaint: Math.round(firstContentfulPaint),
        totalAssetSize: totalAssetSize,
        totalAssetSizeMB:
          Math.round((totalAssetSize / (1024 * 1024)) * 100) / 100,
        assetMetrics,
        totalAssets: Object.keys(assetMetrics).length,
      };
    });

    const endTime = Date.now();
    const totalTestTime = endTime - startTime;

    // Combine all metrics
    Object.assign(metrics, performanceMetrics, {
      totalTestTime,
      userAgent: await page.evaluate(() => navigator.userAgent),
      viewport: await page.viewport(),
    });

    console.log("📈 Performance Results:");
    console.log(`   Page Load Time: ${metrics.pageLoadTime}ms`);
    console.log(`   DOM Content Loaded: ${metrics.domContentLoaded}ms`);
    console.log(`   First Paint: ${metrics.firstPaint}ms`);
    console.log(`   First Contentful Paint: ${metrics.firstContentfulPaint}ms`);
    console.log(`   Total Asset Size: ${metrics.totalAssetSizeMB}MB`);
    console.log(`   Total Test Time: ${metrics.totalTestTime}ms`);

    if (Object.keys(metrics.assetMetrics).length > 0) {
      console.log("\n📦 Asset Breakdown:");
      Object.entries(metrics.assetMetrics).forEach(([asset, data]) => {
        console.log(`   ${asset}: ${data.loadTime}ms (${data.sizeKB}KB)`);
      });
    }
  } catch (error) {
    console.error("❌ Error during performance test:", error);
    metrics.error = error.message;
  } finally {
    await browser.close();
  }

  // Save results
  if (!fs.existsSync(RESULTS_DIR)) {
    fs.mkdirSync(RESULTS_DIR, { recursive: true });
  }

  const filename = `performance-${label}-${Date.now()}.json`;
  const filepath = path.join(RESULTS_DIR, filename);

  fs.writeFileSync(filepath, JSON.stringify(metrics, null, 2));
  console.log(`💾 Results saved to: ${filepath}`);

  return metrics;
}

// Main execution
async function main() {
  const label = process.argv[2] || "baseline";

  console.log("🏃 Performance Testing Tool");
  console.log(`📍 Testing URL: ${SITE_URL}`);
  console.log(`🏷️  Test Label: ${label}\n`);

  try {
    await measurePerformance(label);
    console.log("\n✅ Performance test completed successfully!");
  } catch (error) {
    console.error("\n❌ Performance test failed:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { measurePerformance };
