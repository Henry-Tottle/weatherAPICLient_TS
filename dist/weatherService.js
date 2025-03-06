"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_KEY = 'bb33b194c1fa1cf8cd4d01789f0e1b39';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const getWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return yield response.json();
    }
    catch (error) {
        throw new Error('Failed to fetch weather data');
    }
});
const currentWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const weather = yield getWeather(city);
    return weather.weather;
});
const convertToFahrenheit = (temperature) => {
    return (temperature * 9 / 5) + 32;
};
const fetchAndConvertWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weatherData = yield getWeather(city);
        const temperatureInC = weatherData.main.temp;
        const temperatureInF = convertToFahrenheit(temperatureInC);
        console.log(`The weather is currently ${weatherData.weather[0].description}`);
        console.log(`The temperate is ${temperatureInC} degrees Celsius or ${temperatureInF} degrees Fahrenheit`);
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
    }
});
fetchAndConvertWeather('Trowbridge');
exports.default = { getWeather, convertToFahrenheit };
