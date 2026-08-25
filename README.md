🌤 Weather App (React Native)

A modern, cross-platform weather application built with React Native that provides real-time weather data and short-term forecasts for any city worldwide.

🚀 Features
🌍 Search weather for any city globally
📍 Quick access to popular cities
🌡 Real-time temperature & “feels like”
💨 Wind speed, humidity, and pressure
🌅 Sunrise & 🌇 sunset timings
📊 6-hour temperature forecast (interactive chart)
🎨 Dynamic background based on weather conditions
⚡ Fast and lightweight (powered by Open-Meteo APIs)

🛠 Tech Stack
React Native
React Hooks (useState, useEffect, useCallback)
Open-Meteo API (no API key required)
react-native-chart-kit (for data visualization)
📦 Installation

Clone the repository:

git clone https://github.com/VanshMehta6/Weather-app.git
cd weather-app

Install dependencies:

npm install
▶️ Running the App
Start Metro
npm start
Run on Android
npm run android
Run on iOS
npm run ios
🌐 API Usage

This app uses:

Geocoding API – Converts city name → coordinates
Forecast API – Fetches weather data

Endpoints used:

https://geocoding-api.open-meteo.com/v1/search
https://api.open-meteo.com/v1/forecast
📊 Key Functionality

1. City Search
   Converts user input into latitude & longitude
   Handles invalid or missing results
2. Weather Data Processing
   Extracts:
   Current weather
   Hourly data
   Daily sunrise/sunset
   Matches current time with hourly dataset for accuracy
3. Forecast Chart
   Displays next 6 hours of temperature
   Uses react-native-chart-kit with bezier curve
   🎨 UI Behavior
   Background color changes dynamically based on weather condition codes
   Scrollable layout for smaller screens
   Horizontal quick-select city chips
   ⚠️ Error Handling
   Invalid API response detection
   Network failure handling
   Graceful fallback when city not found
   📌 Limitations

Let’s be honest—this is where you’re still playing small:

No caching → unnecessary API calls
No geolocation (user’s current location missing)
No weather icons (just text mapping)
No unit switching (°C only)
No persistent search history
No state management scaling (everything in one component)
No offline handling

🧠 What You Should Improve Next

If you actually want to level this up instead of keeping it as a demo:

Break the monolith
Split into components (SearchBar, WeatherCard, ForecastChart)
Add geolocation
Auto-detect user location (this is expected, not optional)
Introduce caching
Use something like AsyncStorage
Improve UX
Weather icons (not just text)
Loading skeletons instead of spinner
Better error states
Performance
Memoize heavy computations
Avoid unnecessary re-renders
Scalability
Move logic to services (api/weather.js)
Introduce global state if app grows

📄 License
MIT License
