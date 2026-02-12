# 🚀 Complete Setup Guide - Solar System React

## Quick Start (5 Minutes)

### Step 1: Install Node.js (if not installed)
1. Go to https://nodejs.org/
2. Download LTS version (18.x or higher)
3. Run installer and follow prompts
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Extract Project Files
1. Extract all files from the zip to a folder (e.g., `solar-system-react`)
2. Open terminal/command prompt in that folder

### Step 3: Install Dependencies
```bash
npm install
```
**Wait time:** 1-2 minutes (downloads ~200MB)

### Step 4: Download Textures
1. Visit: https://www.solarsystemscope.com/textures/
2. Download these files (click download, choose 4K or 8K):
   - ☀️ `8k_sun.jpg`
   - ☿️ `8k_mercury.jpg`
   - ♀️ `8k_venus_surface.jpg`
   - 🌍 `8k_earth_daymap.jpg`
   - ♂️ `8k_mars.jpg`
   - ♃ `8k_jupiter.jpg`
   - ♄ `8k_saturn.jpg`
   - 🪐 `8k_saturn_ring_alpha.png` ⭐ **CRITICAL FOR RINGS!**
   - ♅ `2k_uranus.jpg`
   - ♆ `2k_neptune.jpg`

3. Create folder: `public/textures/`
4. Move all downloaded images into `public/textures/`

### Step 5: Run the App
```bash
npm run dev
```

### Step 6: Open Browser
- Automatically opens to `http://localhost:3000`
- Or manually open that URL

---

## Detailed Installation Guide

### For Windows Users

1. **Open Command Prompt or PowerShell**
   - Press `Win + R`
   - Type `cmd` and press Enter

2. **Navigate to project folder:**
   ```cmd
   cd C:\path\to\solar-system-react
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```

4. **Create textures folder:**
   ```cmd
   mkdir public\textures
   ```

5. **Run the app:**
   ```cmd
   npm run dev
   ```

### For Mac Users

1. **Open Terminal**
   - Press `Cmd + Space`
   - Type "Terminal" and press Enter

2. **Navigate to project folder:**
   ```bash
   cd ~/path/to/solar-system-react
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create textures folder:**
   ```bash
   mkdir -p public/textures
   ```

5. **Run the app:**
   ```bash
   npm run dev
   ```

### For Linux Users

1. **Open Terminal**

2. **Navigate to project folder:**
   ```bash
   cd ~/path/to/solar-system-react
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create textures folder:**
   ```bash
   mkdir -p public/textures
   ```

5. **Run the app:**
   ```bash
   npm run dev
   ```

---

## Folder Structure Verification

After setup, your folder should look like this:

```
solar-system-react/
├── node_modules/          ← Created after npm install
├── public/
│   └── textures/          ← YOU CREATE THIS
│       ├── 8k_sun.jpg
│       ├── 8k_mercury.jpg
│       ├── 8k_venus_surface.jpg
│       ├── 8k_earth_daymap.jpg
│       ├── 8k_mars.jpg
│       ├── 8k_jupiter.jpg
│       ├── 8k_saturn.jpg
│       ├── 8k_saturn_ring_alpha.png  ⭐
│       ├── 2k_uranus.jpg
│       └── 2k_neptune.jpg
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── store.ts
├── index.html
├── package.json
└── vite.config.ts
```

---

## Common Issues & Solutions

### Issue 1: "npm: command not found"
**Cause:** Node.js not installed or not in PATH

**Solution:**
1. Install Node.js from nodejs.org
2. Restart terminal after installation
3. Verify: `node --version`

### Issue 2: "Cannot find module 'react'"
**Cause:** Dependencies not installed

**Solution:**
```bash
npm install
```

### Issue 3: Port 3000 already in use
**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Mac/Linux)
lsof -ti:3000 | xargs kill -9

# Or change port in vite.config.ts to 3001
```

### Issue 4: Textures not showing (planets are solid colors)
**Solutions:**
1. ✅ Check textures are in `public/textures/` folder
2. ✅ Verify exact filenames (case-sensitive!)
3. ✅ Check browser console (F12) for 404 errors
4. ✅ Ensure files are actual images (not corrupted)

### Issue 5: Saturn rings not visible
**Solutions:**
1. ✅ Download `8k_saturn_ring_alpha.png` (must have alpha/transparency)
2. ✅ Place in `public/textures/` folder
3. ✅ Check filename is exactly: `8k_saturn_ring_alpha.png`
4. ✅ Reload page (Ctrl+F5 or Cmd+Shift+R)

### Issue 6: Black screen or crashes
**Solutions:**
1. Check browser console (F12) for errors
2. Ensure modern browser (Chrome 90+, Firefox 88+, Safari 14+)
3. Enable hardware acceleration in browser settings
4. Update graphics drivers

### Issue 7: Build errors
**Solutions:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Or for Windows:
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## Performance Optimization

### For Slower Computers

1. **Use 2K textures instead of 8K:**
   - Download smaller resolution images
   - Saves RAM and improves FPS

2. **Reduce stars in Starfield:**
   - Edit `src/components/Starfield.tsx`
   - Change line 8: `const starCount = 2000;` (from 5000)

3. **Lower texture quality:**
   - Use JPG instead of PNG where possible
   - Compress images (keep under 5MB each)

### For Better Performance

1. **Close other browser tabs**
2. **Disable browser extensions temporarily**
3. **Use Chrome or Edge** (best WebGL performance)
4. **Update graphics drivers**

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

---

## Browser Compatibility

✅ **Fully Supported:**
- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

⚠️ **Partial Support:**
- Older browsers may have reduced features
- WebGL required

❌ **Not Supported:**
- Internet Explorer (any version)
- Very old mobile browsers

---

## Testing Checklist

After setup, verify everything works:

- [ ] App opens without errors
- [ ] Sun is visible and glowing
- [ ] All 8 planets are visible
- [ ] Planet textures loaded (not solid colors)
- [ ] Saturn has visible rings
- [ ] Stars visible in background
- [ ] Can click planets to see info
- [ ] Info panel shows (not black rectangle)
- [ ] Time controls work (pause/play)
- [ ] Can zoom with scroll wheel
- [ ] Can rotate view with right-click drag

---

## Getting Help

### Check Console
Press F12 to open Developer Tools and check Console tab for errors.

### Common Error Messages

**"Failed to load texture"**
- Missing texture file in public/textures/
- Check filename exactly matches

**"WebGL not supported"**
- Update browser or enable WebGL in settings

**"Module not found"**
- Run `npm install` again

---

## Next Steps After Setup

1. **Explore the simulation:**
   - Click each planet
   - Try different speeds
   - Zoom in and out

2. **Customize:**
   - Edit colors in CSS files
   - Adjust planet sizes/distances
   - Add your own features

3. **Learn:**
   - Read README.md for customization
   - Explore the code in src/components/
   - Experiment with Three.js

---

## Quick Reference

| Action | Command |
|--------|---------|
| Install | `npm install` |
| Run | `npm run dev` |
| Build | `npm run build` |
| Port | `http://localhost:3000` |
| Stop Server | `Ctrl + C` |

---

## File Size Guide

**Total project size:** ~250-500 MB
- node_modules: ~200 MB
- Textures (8K): ~200-300 MB
- Source code: ~1 MB

**Disk space needed:** 1 GB free recommended

---

## Success! 🎉

If you can see the solar system with:
- Textured planets
- Saturn's beautiful rings
- Working info panels
- Smooth animations

**You're all set!** Enjoy exploring the solar system! 🚀

---

Need help? Check the console for errors or re-read this guide.
