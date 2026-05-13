# 🍕 Antalya Pizzeria & Imbiss — Premium Scroll Website

> Seit über 21 Jahren Ihr Lieblingsrestaurant in Barnstorf.

Eine hochwertige, cinematische Marketing-Website mit Apple-level Scroll-Animationen.

---

## 🚀 Schnellstart

### Lokal öffnen (ohne Installation)

```powershell
# Im Projektordner:
powershell -ExecutionPolicy Bypass -File server.ps1
# → Öffne http://localhost:8080
```

Oder einfach `index.html` direkt im Browser öffnen (Hinweis: wegen CORS muss ein lokaler Server verwendet werden).

### Docker

```bash
docker-compose up --build
# → Öffne http://localhost:3000
```

---

## 🎬 Features

### Scroll-Frame-Animation (Hero)
- **200 Bilder** werden als Frame-Sequenz auf ein Canvas gerendert
- Beim Scrollen wird die Pizza cinematisch zusammengesetzt
- GSAP ScrollTrigger steuert die Frame-Position (scrub)
- Text-Overlays faden synchron zum Scroll-Fortschritt ein/aus

### Premium Design
- Dunkles, elegantes Farbschema (Schwarz + Gold/Amber)
- Playfair Display (Headlines) + Inter (Body) Typografie
- Glassmorphism-Navigation mit Blur-Effekt
- Gradient-Buttons mit Hover-Animationen
- Card-basiertes Menü mit Kategorie-Tabs

### Animationen
- Scroll-triggered fade/slide Animationen via `[data-animate]`
- Counter-Animation für Statistiken (Ease-Out Cubic)
- Smooth scroll für Navigation
- Back-to-Top Button
- Micro-interactions auf allen interaktiven Elementen

### Responsiv
- Mobile-first Design
- Hamburger-Menü mit Fullscreen-Overlay
- Touch-optimierte Scroll-Animationen
- Alle Grids passen sich an (4→2→1 Spalten)

---

## 📁 Dateistruktur

```
pizzaaa/
├── index.html          # Hauptseite
├── style.css           # Alle Styles
├── app.js              # GSAP Animationen + Logik
├── server.ps1          # Lokaler Dev-Server (PowerShell)
├── frames/             # 200 Frame-Bilder
│   ├── ezgif-frame-001.jpg
│   └── ...
├── Dockerfile          # Container-Setup
├── docker-compose.yml  # Docker Compose
└── .dockerignore
```

---

## 🛠 Tech Stack

| Technologie | Verwendung |
|---|---|
| HTML5 / CSS3 | Struktur & Design |
| Vanilla JavaScript | Logik & Interaktion |
| GSAP 3 + ScrollTrigger | Scroll-Animationen |
| Canvas API | Frame-Rendering |
| Google Fonts | Typografie |
| nginx:alpine | Docker-Container |

---

## 🎨 Design-System

- **Primär**: `#d4a853` (Gold)
- **Akzent**: `#e67e22` (Orange) / `#c0392b` (Rot)
- **Hintergrund**: `#0a0a0a` (Fast-Schwarz)
- **Karten**: `#141414`
- **Text**: `#f5f0e8` / `#a09888` / `#6b6155`

---

## 🔧 Erweiterungsmöglichkeiten

- **Lieferando/Lieferservice Integration** — Bestell-Button verlinken
- **Google Maps API** — Interaktive Karte statt Embed
- **Bewertungen** — Google Reviews einbinden
- **Online-Bestellung** — Warenkorb-System ergänzen
- **Bildergalerie** — Weitere Food-Fotos in Lightbox
- **Mehrsprachigkeit** — DE/TR/EN Sprachauswahl
