# 💍 Royal 3D Digital Wedding Invitation

A modern, highly interactive digital wedding invitation web application built with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **react-parallax-tilt**.

---

## ✨ Features & Architecture

1. **Global Background Layer (`FallingFlowers.tsx`)**
   - Continuously falling floral petals (rose, blush, gold, marigold) across all scroll positions.
   - Smooth 3D flutter, drift, and rotation keyframe animations.
   - Hydration-safe client rendering, fixed to viewport with `pointer-events-none`.

2. **Floating Music Player (`MusicPlayer.tsx`)**
   - Fixed circular audio controller at bottom-right.
   - HTML5 `<audio>` player with support for audio streaming.
   - Built-in **Web Audio API harmonic chime synthesizer fallback** so ambient music plays even in offline mode.
   - Spinning gold filigree ring and animated sound equalizer bars while playing.

3. **Hero Section (`HeroSection.tsx`)**
   - Full-screen height (`min-h-screen`) with romantic dark gradient overlay.
   - Couple names displayed in an elegant serif typeface with a **3D text shadow effect** and luxury gold finish.
   - **Framer Motion 3D Parallax effect**: couple names and background shift at different scroll velocities (`useScroll`, `useTransform`).
   - Live **Countdown Timer** (Days, Hours, Minutes, Seconds) to the wedding moment.

4. **Photo Gallery / Story Section (`PhotoGallery.tsx`)**
   - 4-column responsive grid with luxury glassmorphism cards and golden accents.
   - Framer Motion scroll entry animations with 3D depth scaling.
   - Interactive full-resolution Lightbox modal on click.

5. **Event Celebrations with 3D Tilt (`EventDetails.tsx`)**
   - Event cards for *Sangeet & Celebration Night*, *Auspicious Muhurtham*, and *Grand Evening Reception*.
   - Wrapped in `<Tilt>` from `react-parallax-tilt` with dynamic 3D glare and depth scaling on hover and device tilt.
   - Date, time, venue, dress code badge, and "Add to Google Calendar" button.

6. **Location & Navigation (`LocationSection.tsx`)**
   - Split layout:
     - **Left**: Stylized interactive Google Maps embed iframe.
     - **Right**: High-resolution QR code for instant smartphone camera scanning + "Open in Google Maps" direct action button.
   - One-click "Copy Address" button and hospitality contact desk.

7. **Guest Blessings Wall (`BlessingsSection.tsx`)**
   - Interactive "Shower Blessings" button with floating heart confetti and persistent counter.
   - Guest wishes submission form and community blessings feed saved in `localStorage`.

8. **Centralized Configuration (`src/data/weddingData.ts`)**
   - All couple names, dates, quotes, audio sources, photos, events, and venue coordinates are located in **one file** for effortless editing.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run the Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the live invitation.

### 3. Build for Production
```bash
pnpm run build
pnpm run start
```

---

## 🎨 How to Customize

All content is managed in:
👉 [`src/data/weddingData.ts`](file:///c:/Users/jaish/OneDrive/Desktop/Wedding%20invitations/Dharashan/src/data/weddingData.ts)

You can customize:
- `couple`: Groom and Bride full names, parents, hashtags, dates, and quotes.
- `audio`: Background wedding audio URL and track title.
- `hero`: Welcome headline and background wallpaper.
- `story.photos`: Photo URLs, titles, and captions.
- `events`: Title, date, time, venue address, dress code, and icons.
- `location`: Google Maps embed URL, direct navigation URL, and QR code URL.
