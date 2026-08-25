# 🌤️ Weather App — React Native

A modern, cross-platform **weather application built with React Native** that provides real-time weather information and short-term forecasts for cities around the world.

The application uses the **Open-Meteo API**, requiring no API key, and provides weather conditions, forecasts, atmospheric information, sunrise/sunset timings, and an interactive temperature chart.

---

## ✨ Features

* 🌍 **Global City Search** — Search for weather information for cities worldwide.
* 📍 **Popular Cities** — Quickly access weather information for selected popular cities.
* 🌡️ **Current Temperature** — View real-time temperature and "feels like" temperature.
* 💨 **Weather Details** — View wind speed, humidity, and atmospheric pressure.
* 🌅 **Sunrise & Sunset** — Display daily sunrise and sunset times.
* 📊 **6-Hour Forecast** — View upcoming hourly temperatures using an interactive chart.
* 🎨 **Dynamic Background** — Background appearance changes based on current weather conditions.
* ⚡ **Fast & Lightweight** — Powered by Open-Meteo APIs with no API key required.
* 📱 **Cross-Platform** — Designed to run on Android and iOS.

---

## 🛠️ Tech Stack

| Technology                 | Purpose                                       |
| -------------------------- | --------------------------------------------- |
| **React Native**           | Cross-platform mobile application development |
| **React Hooks**            | State and lifecycle management                |
| `useState`                 | Component state management                    |
| `useEffect`                | Side effects and API operations               |
| `useCallback`              | Function memoization                          |
| **Open-Meteo API**         | Weather and geocoding data                    |
| **react-native-chart-kit** | Temperature data visualization                |
| **JavaScript**             | Application logic                             |

---

## 📁 Project Structure

A typical project structure can look like:

```text
Weather-app/
│
├── android/                 # Android native project
├── ios/                     # iOS native project
│
├── src/                     # Application source code
│   ├── components/          # Reusable UI components
│   ├── services/             # API and weather services
│   ├── screens/              # Application screens
│   └── utils/                # Utility functions
│
├── App.js                    # Main application component
├── package.json              # Dependencies and scripts
├── README.md                 # Project documentation
└── ...
```

> The current implementation can be further refactored into separate components and service modules as the application grows.

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/VanshMehta6/Weather-app.git
cd Weather-app
```

### 2. Install Dependencies

```bash
npm install
```

---

## ▶️ Running the App

### Start Metro

```bash
npm start
```

### Run on Android

```bash
npm run android
```

### Run on iOS

```bash
npm run ios
```

> For iOS development, make sure your environment has the required Xcode and CocoaPods configuration.

---

## 🌐 API Usage

This application uses the **Open-Meteo API** for weather and location data.

### APIs Used

#### 📍 Geocoding API

Converts a city name into geographic coordinates such as latitude and longitude.

```text
https://geocoding-api.open-meteo.com/v1/search
```

#### 🌤️ Forecast API

Retrieves current, hourly, and daily weather information.

```text
https://api.open-meteo.com/v1/forecast
```

### 🔑 API Key

No API key is required for the Open-Meteo APIs used by this project.

---

## 📊 Key Functionality

### 1. 🌍 City Search

The application allows users to search for any city.

The search process:

```text
User enters city
       ↓
Geocoding API
       ↓
Latitude + Longitude
       ↓
Forecast API
       ↓
Weather information
       ↓
Display results
```

The application also handles:

* Empty searches
* Invalid city names
* Cities with no search results
* API errors

---

### 2. 🌡️ Weather Data Processing

The application processes multiple types of weather information, including:

* Current temperature
* "Feels like" temperature
* Wind speed
* Humidity
* Atmospheric pressure
* Hourly temperature data
* Sunrise time
* Sunset time

The current time is matched against the hourly dataset to determine the most relevant forecast information.

---

### 3. 📈 Forecast Chart

The application displays the **next 6 hours of temperature data** using `react-native-chart-kit`.

The chart includes:

* Hourly temperature values
* Time labels
* Smooth Bezier curve
* Scrollable application layout for smaller screens

Example data flow:

```text
Weather API
     ↓
Hourly temperatures
     ↓
Next 6 hours selected
     ↓
Chart data processed
     ↓
Interactive temperature chart
```

---

## 🎨 UI & User Experience

### Dynamic Weather Background

The application's background changes according to the current weather condition.

For example:

```text
☀️ Clear Weather
      ↓
Sunny background

☁️ Cloudy Weather
      ↓
Cloudy background

🌧️ Rain
      ↓
Rainy background

⛈️ Storm
      ↓
Storm background
```

### Quick City Selection

Popular cities are presented as horizontally scrollable chips/buttons, allowing users to quickly switch between locations.

### Responsive Layout

The application uses a scrollable layout to ensure the interface remains usable on smaller mobile screens.

---

## ⚠️ Error Handling

The application includes handling for common failure scenarios:

* ❌ Invalid API responses
* 🌐 Network failures
* 🔍 City not found
* 📝 Empty search input
* ⚠️ Missing or unexpected weather data

The UI provides a graceful fallback rather than crashing when weather information cannot be retrieved.

---

## 📌 Current Limitations

The current version is a functional weather application, but there are several areas that can be improved.

### 💾 No Caching

Weather data is fetched repeatedly without a caching layer, which can result in unnecessary API requests.

### 📍 No Geolocation

The application does not currently detect the user's current location automatically.

### 🌤️ Limited Weather Visuals

Weather conditions are represented primarily through text and background changes rather than dedicated weather icons.

### 🌡️ Celsius Only

There is currently no option to switch between:

* Celsius (°C)
* Fahrenheit (°F)

### 🕘 No Persistent Search History

Previously searched cities are not persisted between sessions.

### 🏗️ Limited State Management

Most application logic is currently handled within a single component, which can become difficult to maintain as the project grows.

### 📴 No Offline Mode

The application does not currently provide cached weather information when the device is offline.

---

## 🧠 Future Improvements

The following improvements would make the application more production-ready.

### 🧩 1. Component Architecture

Break the main component into reusable components such as:

```text
components/
├── SearchBar.js
├── WeatherCard.js
├── WeatherDetails.js
├── ForecastChart.js
├── CityChip.js
└── LoadingState.js
```

This would improve maintainability and reusability.

---

### 📍 2. Add Geolocation

Automatically detect the user's current location and display local weather.

```text
Device Location
      ↓
Latitude + Longitude
      ↓
Weather API
      ↓
Current Weather
```

This would eliminate the need for users to manually search for their location.

---

### 💾 3. Add Caching

Use a storage solution such as **AsyncStorage** to cache:

* Recent weather results
* Previously searched cities
* Last selected location
* User preferences

This can reduce unnecessary API calls and improve perceived performance.

---

### 🎨 4. Improve the User Experience

Potential improvements include:

* 🌤️ Dedicated weather icons
* 💀 Loading skeletons instead of a basic spinner
* ⚠️ Improved error states
* 🎯 Better empty states
* 🌙 Dark mode
* ✨ Smoother animations
* 📱 Improved responsive layouts

---

### ⚡ 5. Performance Improvements

Optimize application performance by:

* Memoizing expensive calculations
* Avoiding unnecessary re-renders
* Using `useMemo` where appropriate
* Using `React.memo` for reusable components
* Reducing unnecessary API requests

---

### 🏗️ 6. Improve Scalability

Move API and business logic into dedicated service files:

```text
src/
├── components/
│   ├── SearchBar.js
│   ├── WeatherCard.js
│   └── ForecastChart.js
│
├── services/
│   └── api/
│       └── weather.js
│
├── screens/
│   └── HomeScreen.js
│
└── utils/
    └── weatherUtils.js
```

If the application becomes larger, introducing a global state management solution could also make the architecture easier to maintain.

---

## 🗺️ Suggested Development Roadmap

```text
Current Version
      │
      ├── ✅ City Search
      ├── ✅ Current Weather
      ├── ✅ Hourly Forecast
      ├── ✅ Sunrise / Sunset
      ├── ✅ Temperature Chart
      │
      ▼
Phase 2
      │
      ├── 📍 Geolocation
      ├── 💾 AsyncStorage Caching
      ├── 🌤️ Weather Icons
      ├── 🌡️ Unit Switching
      └── 🕘 Search History
      │
      ▼
Phase 3
      │
      ├── 🧩 Component Refactoring
      ├── ⚡ Performance Optimization
      ├── 📴 Offline Support
      ├── 🌙 Dark Mode
      └── 📊 Extended Forecasts
```

---

## 🐛 Troubleshooting

### Metro Bundler Issues

Try resetting the Metro cache:

```bash
npx react-native start --reset-cache
```

### Android Build Issues

Try cleaning the Android build:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Dependency Issues

Remove installed dependencies and reinstall:

```bash
rm -rf node_modules
npm install
```

For iOS, reinstall CocoaPods dependencies if necessary:

```bash
cd ios
pod install
cd ..
```

---

## 📜 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

## 👨‍💻 Author

Developed as a **React Native weather application** demonstrating:

* Cross-platform mobile development
* React Hooks
* REST API integration
* Asynchronous data fetching
* Weather data processing
* Data visualization
* Responsive mobile UI
* Error handling

---

## ⭐ Project Summary

**Weather App** is a lightweight React Native application designed to provide users with quick and useful weather information for cities around the world.

It combines **Open-Meteo APIs**, React Native, and interactive data visualization to create a simple and modern weather experience.

> 🌤️ **Know the weather. Plan your day.**
