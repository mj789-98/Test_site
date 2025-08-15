# 3D Portfolio Performance Optimization Guide

## Critical Issues Found:

### 1. Large 3D Model (spaceman.glb = 2.99MB)

**Solutions:**

- Use tools like Blender or online compressors to reduce file size
- Target: < 500KB for web
- Consider using Draco compression
- Use lower poly counts for web version

### 2. Immediate Quick Fixes:

#### A. Lazy Load 3D Model

```jsx
// In Spaceman.jsx, add lazy loading
const [modelLoaded, setModelLoaded] = useState(false);

useEffect(() => {
  // Only load model when in viewport
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setModelLoaded(true);
    }
  });
  observer.observe(canvasRef.current);
}, []);
```

#### B. Reduce Light Sources

```jsx
// Instead of 5 lights, use 2-3 maximum
<directionalLight position={[1, 1, 1]} intensity={2} />
<ambientLight intensity={0.5} />
// Remove: pointLight, spotLight, hemisphereLight
```

#### C. Optimize Font Loading

```html
<!-- In index.html, replace @import with preload -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

#### D. Add Loading States

- Show skeleton loaders while 3D content loads
- Progressive enhancement approach

### 3. Model Compression Tools:

- gltf-pipeline: `npm install -g gltf-pipeline`
- Online: gltf.report
- Blender with Draco export addon

### 4. Performance Monitoring:

- Use React DevTools Profiler
- Monitor FPS during scroll
- Test on mobile devices
