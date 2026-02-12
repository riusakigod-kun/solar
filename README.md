# 🚀 Solar System Simulation - React Three.js

A beautiful, interactive 3D solar system simulation built with React, Three.js, and NASA ephemeris principles.

## ✨ Features

- **Real-time 3D rendering** with React Three Fiber
- **Accurate orbital mechanics** (simplified for visual appeal)
- **Interactive planet selection** with detailed information panels
- **Time control** - Pause, resume, and adjust simulation speed (0.1x to 10x)
- **Proper Saturn rings** - Beautiful, transparent ring system
- **Starfield background** - 5000+ procedurally generated stars
- **Responsive camera controls** - Orbit, zoom, and pan
- **Beautiful UI** - Modern glassmorphic design
- **No black rectangles** - Properly implemented textures and materials

## 🛠️ Technologies

- **React 18** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Zustand** - State management
- **TypeScript** - Type safety
- **Vite** - Build tool

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Extract the project files** to a folder

2. **Install dependencies:**
```bash
npm install
```

3. **Create textures folder:**
```bash
mkdir public/textures
```

4. **Add planet textures** to `public/textures/`:
   - Download from: https://www.solarsystemscope.com/textures/
   - Required files:
     - `8k_sun.jpg`
     - `8k_mercury.jpg`
     - `8k_venus_surface.jpg`
     - `8k_earth_daymap.jpg`
     - `8k_mars.jpg`
     - `8k_jupiter.jpg`
     - `8k_saturn.jpg`
     - `8k_saturn_ring_alpha.png` ⭐ **Important for Saturn rings!**
     - `2k_uranus.jpg`
     - `2k_neptune.jpg`

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser** to `http://localhost:3000`

## 🎮 Controls

### Mouse Controls
- **Left Click** - Select/deselect planet
- **Right Click + Drag** - Rotate camera view
- **Scroll Wheel** - Zoom in/out
- **Middle Click + Drag** - Pan camera

### Time Controls (Bottom Panel)
- **Play/Pause Button** - Toggle simulation
- **Speed Presets** - Quick speed selection (0.1x to 10x)
- **+/- Buttons** - Fine-tune speed in 0.5x increments

### Planet Information
- Click any planet to view detailed information
- Shows diameter, gravity, orbital period, and distance
- Click X or click background to close

## 🔧 Project Structure

```
solar-system-react/
├── public/
│   └── textures/           # Planet texture images
├── src/
│   ├── components/
│   │   ├── Planet.tsx      # Individual planet component
│   │   ├── Sun.tsx         # Sun with lighting
│   │   ├── Starfield.tsx   # Background stars
│   │   ├── SolarSystem.tsx # Main 3D scene
│   │   ├── TimeControls.tsx # Time control UI
│   │   ├── TimeControls.css
│   │   ├── PlanetHUD.tsx   # Planet info panel
│   │   └── PlanetHUD.css
│   ├── store.ts            # Zustand state management
│   ├── App.tsx             # Main app component
│   ├── App.css
│   ├── main.tsx            # Entry point
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Key Features Explained

### Saturn Rings Fix
The Saturn rings are implemented as a transparent ring geometry with proper texture mapping:

```tsx
<mesh rotation={[-Math.PI / 2 + 0.3, 0, 0]}>
  <ringGeometry args={[size * 1.5, size * 2.5, 128]} />
  <meshStandardMaterial
    color="#d4af37"
    transparent
    opacity={0.6}
    side={THREE.DoubleSide}
    map={saturnRingTexture}
  />
</mesh>
```

**No black rectangles** because:
- Proper `DoubleSide` rendering
- Correct rotation and positioning
- Transparent material with opacity
- High-resolution ring geometry (128 segments)

### Planet Detail Panel Fix
The info panel is a proper React component with:
- Glassmorphic design (no black background)
- Smooth animations
- Proper z-index layering
- Responsive layout
- Rich content display

### Camera System
- Uses `OrbitControls` from drei
- Automatically focuses on selected planet
- Smooth transitions
- Respects min/max zoom distances

## 🐛 Troubleshooting

### Textures Not Loading
**Problem:** Planets appear as colored spheres without textures

**Solutions:**
1. Check that textures are in `public/textures/` folder
2. Verify texture filenames match exactly (case-sensitive)
3. Check browser console for 404 errors
4. Ensure texture files are valid JPG/PNG format

### Saturn Rings Appear as Rectangle
**Problem:** This shouldn't happen in React version!

**If it does:**
1. Check that `8k_saturn_ring_alpha.png` exists in `public/textures/`
2. Verify the ring texture has transparency (alpha channel)
3. Check browser console for texture loading errors

### Black Info Panel
**Problem:** Planet details show as black rectangle

**Solutions:**
1. This is fixed in the React version with proper CSS
2. Check that `PlanetHUD.css` is imported correctly
3. Verify browser supports backdrop-filter CSS property
4. Clear browser cache and reload

### Performance Issues
**Solutions:**
1. Use 2k textures instead of 8k for better performance
2. Reduce starfield count in `Starfield.tsx` (line 8)
3. Close other browser tabs
4. Check GPU acceleration is enabled in browser

## 🚀 Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To preview the production build:
```bash
npm run preview
```

## 📝 Customization

### Add More Planets
Edit `src/components/SolarSystem.tsx`, add to planets array:

```tsx
{
  name: 'Pluto',
  size: 0.2,
  distance: 590,
  speed: 0.06,
  color: '#A0826D',
  texture: '2k_pluto.jpg'
}
```

### Change Colors
Edit CSS files in `src/components/` to customize the UI theme.

### Adjust Orbits
Modify the `speed` and `distance` values in the planets array for different orbital configurations.

## 🎓 Learning Resources

- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Zustand State Management](https://github.com/pmndrs/zustand)

## 📄 License

This project is provided as-is for educational purposes.

Textures: Solar System Scope (free for educational use)  
Code: Custom implementation

## 🙏 Credits

- **Planet Textures:** [Solar System Scope](https://www.solarsystemscope.com/textures/)
- **Font:** Orbitron & JetBrains Mono (Google Fonts)
- **3D Engine:** Three.js
- **React Framework:** React Three Fiber

---

## 🎉 Enjoy Exploring the Solar System!

For questions or issues, check the browser console for error messages.
