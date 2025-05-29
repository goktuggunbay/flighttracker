# Flight Tracker

A smart aircraft tracking app — periodically updated OpenSky data visualized on an interactive map

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white" alt="Leaflet.js" />
  <img src="https://img.shields.io/badge/ShadCN%20UI-4A00E0?style=flat&logo=tailwind-css&logoColor=white" alt="ShadCN UI" /> 
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React" />
</p>

---

## Live Demo

[Live Site (Vercel)](https://flighttracker-xi.vercel.app)  
[GitHub Repo](https://github.com/goktuggunbay/flighttracker)

---

## Features


- Track aircraft live on interactive **Leaflet** maps with near real-time OpenSky flight data
- Auto-refresh every 15 minutes with **smart caching**
- Dynamic **plane markers** with rotation based on heading
- **Search bar with suggestions** for callsign or aircraft ID
- Fly-to animation on aircraft selection
- Built using **Next.js App Router** and modern UI with **ShadCN**

---

## Solutions


| API rate limit (4000) | Cached full world data on server, filtered based on map bounds |
| Real-time performance | Used interval updates with `visibilityState` check |


---

## Technologies

| Tech        |
|-------------|
| Next.js     |
| Leaflet.js  |
| ShadCN UI   |
| OpenSky API |
| React Hooks |

---

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/goktuggunbay/flight-tracker.git

# 2. Install dependencies
cd flight-tracker
npm install

# 3. Create .env file
cp .env.example .env.local

# Fill in your OpenSky credentials
OPENSKY_CLIENT_ID=your-client-id
OPENSKY_CLIENT_SECRET=your-client-secret

# 4. Start the development server
npm run dev
```

---

## Project Structure

```
/components
  ├── Map.jsx
  ├── SearchBar.jsx
  ├── PlanePopup.jsx
  └── MapStatus.jsx

/hooks
  └── usePlanes.js

/lib
  ├── getAccessToken.js
  └── leafletFix.js

/app/api/flights/route.js
/app/page.js
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [OpenSky Network](https://opensky-network.org/)
- [Leaflet.js](https://leafletjs.com/)
- [Next.js](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.dev/)

---

## Contact

Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/goktuggunbay/)  
or check out my other projects on [GitHub](https://github.com/goktuggunbay)
