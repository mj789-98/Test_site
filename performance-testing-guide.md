# Performance Testing Instructions

## BEFORE Optimization - Baseline Measurement

### Method 1: Manual Browser Testing (Recommended)

1. **Open Chrome DevTools:**

   - Press F12
   - Go to Network tab
   - Check "Disable cache"
   - Reload the page (Ctrl+R)

2. **Record These Metrics:**

   ```
   BASELINE MEASUREMENTS (Before Optimization):
   ==========================================
   Date: ___________

   Network Tab:
   - Total requests: _____
   - Total size: _____ MB
   - Load time: _____ ms
   - spaceman.glb size: _____ MB
   - spaceman.glb load time: _____ ms

   Performance Monitor (top-right corner):
   - Page Load: _____ ms (Grade: ___)
   - DOM Ready: _____ ms
   - First Paint: _____ ms
   - FCP: _____ ms
   - LCP: _____ ms
   - 3D Model: _____ ms

   User Experience:
   - Time until interactive: _____ seconds
   - 3D model appears: _____ seconds
   - Overall experience (1-10): _____
   ```

3. **Performance Tab (Optional):**
   - Go to Performance tab
   - Click Record → Reload page → Stop after 10 seconds
   - Look for "LCP" and "FCP" markers

### Method 2: Lighthouse (Easy)

1. **Open Chrome DevTools → Lighthouse tab**
2. **Click "Analyze page load"**
3. **Record the scores:**
   ```
   Lighthouse Scores (Before):
   - Performance: ___/100
   - First Contentful Paint: _____ ms
   - Largest Contentful Paint: _____ ms
   - Speed Index: _____ ms
   - Total Blocking Time: _____ ms
   ```

### Current Site Status:

- ✅ Site running at: http://localhost:5176
- ✅ Performance monitor active (top-right corner)
- ✅ 3D model load tracking enabled

## After measuring baseline, we'll implement these optimizations:

1. **Compress spaceman.glb** (2.99MB → ~500KB)
2. **Reduce lighting** (5 lights → 2 lights)
3. **Add lazy loading** for 3D model
4. **Optimize font loading**
5. **Add progressive loading states**

## Commands to run tests:

### Browser Testing:

Open: http://localhost:5176

### Network Analysis:

F12 → Network → Reload page

### Quick Performance Check:

F12 → Console → Paste:

```javascript
console.log(
  "Page Load:",
  performance.timing.loadEventEnd - performance.timing.navigationStart,
  "ms"
);
console.log(
  "DOM Ready:",
  performance.timing.domContentLoadedEventEnd -
    performance.timing.navigationStart,
  "ms"
);
performance.getEntriesByType("resource").forEach((r) => {
  if (r.name.includes(".glb")) {
    console.log(
      "3D Model:",
      r.name.split("/").pop(),
      Math.round(r.responseEnd - r.startTime),
      "ms",
      Math.round(r.transferSize / 1024),
      "KB"
    );
  }
});
```
