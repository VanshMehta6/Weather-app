import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const defaultCity = "Mumbai";

  const popularCities = [
    "New York", "London", "Tokyo", "Paris", "Dubai", "Sydney",
    "Singapore", "Berlin", "Mumbai", "Delhi", "Toronto", "Moscow"
  ];

  const fetchWeatherByCoords = useCallback(async (lat, lon, cityName = "") => {
    setLoading(true);
    setError("");

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,pressure_msl,weathercode&daily=sunrise,sunset&timezone=auto`;

    try {
      const res = await fetch(url);
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Invalid JSON response:", text);
        setError("Failed to fetch weather data. Invalid response.");
        setWeather(null);
        return;
      }

      if (data.current_weather) {
        const currentTime = new Date(data.current_weather.time);
        const hourlyData = data.hourly;

        const currentIndex = hourlyData.time.findIndex(time => {
          const timeDate = new Date(time);
          return timeDate.getHours() === currentTime.getHours() &&
                timeDate.getDate() === currentTime.getDate();
        });

        const forecastHours = [];
        const forecastTemps = [];

        for (let i = 0; i < 6 && currentIndex + i < hourlyData.time.length; i++) {
          forecastHours.push(hourlyData.time[currentIndex + i]);
          forecastTemps.push(hourlyData.temperature_2m[currentIndex + i]);
        }

        setWeather({
          city: cityName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
          temp: data.current_weather.temperature,
          feels: hourlyData.apparent_temperature[currentIndex] || data.current_weather.temperature,
          wind: data.current_weather.windspeed,
          humidity: hourlyData.relativehumidity_2m[currentIndex] || 0,
          pressure: hourlyData.pressure_msl[currentIndex] || 0,
          sunrise: data.daily.sunrise[0],
          sunset: data.daily.sunset[0],
          weathercode: data.current_weather.weathercode,
          time: data.current_weather.time,
          forecastHours,
          forecastTemps,
        });
      } else {
        setError("Weather data not available");
        setWeather(null);
      }
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError("Network error - Please check your connection");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCity = useCallback(async (city) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country, admin1 } = data.results[0];
        let displayName = name;
        if (admin1 && admin1 !== name) {
          displayName += `, ${admin1}`;
        }
        displayName += `, ${country}`;
        fetchWeatherByCoords(latitude, longitude, displayName);
      } else {
        setError("City not found. Try another name.");
        setWeather(null);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setError("Failed to search city. Check your connection.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [fetchWeatherByCoords]);

  useEffect(() => {
    fetchWeatherByCity(defaultCity);
  }, [fetchWeatherByCity]);

  const handleSearch = () => {
    if (!query.trim()) return;
    fetchWeatherByCity(query.trim());
  };

  const handleCitySelect = (city) => {
    fetchWeatherByCity(city);
  };

  const weatherCodeMap = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snow Fall",
    73: "Moderate Snow Fall",
    75: "Heavy Snow Fall",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm With Slight Hail",
    99: "Thunderstorm With Heavy Hail"
  };

  const getBgColor = () => {
    if (!weather) return "#0f172a";
    const code = weather.weathercode;
    if (code === 0) return "#56ccf2";
    if ([1, 2, 3].includes(code)) return "#a1c4fd";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "#3a7bd5";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "#e6f0ff";
    if ([95, 96, 99].includes(code)) return "#141e30";
    return "#0f172a";
  };

  const bgColor = getBgColor();

  return (
    <ScrollView
      style={[styles.scrollContainer, { backgroundColor: bgColor }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>🌤 Weather App</Text>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search any city worldwide..."
            placeholderTextColor="#999"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Quick City Selection */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cityScroll}
          contentContainerStyle={styles.cityScrollContent}
        >
          {popularCities.map((city, index) => (
            <TouchableOpacity
              key={index}
              style={styles.cityChip}
              onPress={() => handleCitySelect(city)}
            >
              <Text style={styles.cityChipText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Fetching weather data...</Text>
        </View>
      )}

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}

      {weather && (
        <View style={styles.weatherCard}>
          <View style={styles.mainWeather}>
            <Text style={styles.city}>{weather.city}</Text>
            <Text style={styles.temp}>{Math.round(weather.temp)}°C</Text>
            <Text style={styles.desc}>
              {weatherCodeMap[weather.weathercode] || "Unknown"}
            </Text>
            <Text style={styles.feelsLike}>
              Feels like {Math.round(weather.feels)}°C
            </Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💨</Text>
              <Text style={styles.detailLabel}>Wind</Text>
              <Text style={styles.detailValue}>{Math.round(weather.wind)} km/h</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💧</Text>
              <Text style={styles.detailLabel}>Humidity</Text>
              <Text style={styles.detailValue}>{weather.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📊</Text>
              <Text style={styles.detailLabel}>Pressure</Text>
              <Text style={styles.detailValue}>{weather.pressure} hPa</Text>
            </View>
          </View>

          <View style={styles.sunTimings}>
            <View style={styles.sunItem}>
              <Text style={styles.sunIcon}>🌅</Text>
              <Text style={styles.sunLabel}>Sunrise</Text>
              <Text style={styles.sunTime}>
                {new Date(weather.sunrise).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </View>
            <View style={styles.sunItem}>
              <Text style={styles.sunIcon}>🌇</Text>
              <Text style={styles.sunLabel}>Sunset</Text>
              <Text style={styles.sunTime}>
                {new Date(weather.sunset).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </View>
          </View>

          <Text style={styles.update}>
            Last update: {new Date(weather.time).toLocaleTimeString()}
          </Text>

          {weather.forecastTemps && weather.forecastTemps.length > 0 && (
            <View style={styles.chartWrapper}>
              <Text style={styles.chartTitle}>Temperature Forecast (Next 6 Hours)</Text>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: weather.forecastHours.map((h) => {
                      const date = new Date(h);
                      return `${date.getHours().toString().padStart(2, "0")}:00`;
                    }),
                    datasets: [{ data: weather.forecastTemps }],
                  }}
                  width={Dimensions.get("window").width - 60}
                  height={240}
                  chartConfig={{
                    backgroundColor: "transparent",
                    backgroundGradientFrom: "rgba(0, 0, 0, 1)",
                    backgroundGradientTo: "rgba(0, 0, 0, 0.98)",
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: {
                      r: 5,
                      strokeWidth: 2,
                      stroke: "#fff",
                      fill: "#0072ff"
                    },
                    propsForBackgroundLines: {
                      stroke: "rgba(255,255,255,0.2)",
                    },
                  }}
                  bezier
                  style={styles.chart}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1 },
  contentContainer: { flexGrow: 1, alignItems: "center", padding: 20, paddingBottom: 50 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 25, color: "#fff", textAlign: "center", marginTop: 10 },
  searchSection: { width: "100%", marginBottom: 20 },
  searchContainer: { flexDirection: "row", width: "100%", marginBottom: 15 },
  input: { flex: 1, backgroundColor: "#fff", padding: 15, borderRadius: 12, marginRight: 12, fontSize: 16, elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
  button: { backgroundColor: "#0072ff", paddingVertical: 15, paddingHorizontal: 20, borderRadius: 12, justifyContent: "center", elevation: 3, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  cityScroll: { marginBottom: 10, maxHeight: 50 },
  cityScrollContent: { alignItems: "center", paddingRight: 10 },
  cityChip: { backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", minWidth: 80, alignItems: "center" },
  cityChipText: { color: "#fff", fontSize: 14, fontWeight: "500", textAlign: "center" },
  loadingContainer: { alignItems: "center", padding: 30, width: "100%" },
  loadingText: { color: "#fff", marginTop: 15, fontSize: 16 },
  errorContainer: { width: "100%", padding: 15, backgroundColor: "rgba(255,0,0,0.2)", borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", marginBottom: 10 },
  error: { color: "#ffdede", textAlign: "center", fontSize: 16 },
  weatherCard: { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 20, padding: 25, alignItems: "center", width: "100%", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", marginTop: 10 },
  mainWeather: { alignItems: "center", marginBottom: 25, width: "100%" },
  city: { fontSize: 24, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 5 },
  temp: { fontSize: 56, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  desc: { fontSize: 20, color: "#fff", marginBottom: 8, textAlign: "center" },
  feelsLike: { fontSize: 16, color: "rgba(255,255,255,0.8)", textAlign: "center" },
  detailsGrid: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 25, paddingHorizontal: 10 },
  detailItem: { alignItems: "center", flex: 1 },
  detailIcon: { fontSize: 24, marginBottom: 8 },
  detailLabel: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 6, textAlign: "center" },
  detailValue: { fontSize: 16, fontWeight: "600", color: "#fff", textAlign: "center" },
  sunTimings: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 20, paddingHorizontal: 20 },
  sunItem: { alignItems: "center", flex: 1 },
  sunIcon: { fontSize: 24, marginBottom: 8 },
  sunLabel: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 6, textAlign: "center" },
  sunTime: { fontSize: 16, fontWeight: "600", color: "#fff", textAlign: "center" },
  update: { fontSize: 14, color: "rgba(255,255,255,0.7)", textAlign: "center", marginBottom: 10 },
  chartWrapper: { width: "100%", marginTop: 20, alignItems: "center" },
  chartTitle: { fontSize: 18, fontWeight: "600", color: "#fff", marginBottom: 15, textAlign: "center" },
  chartContainer: { backgroundColor: "rgba(246, 246, 246, 0.1)", borderRadius: 16, padding: 10, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  chart: { borderRadius: 16, marginVertical: 5 },
});
