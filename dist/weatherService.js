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
exports.fetchAndConvertWeather = exports.convertToFahrenheit = exports.getWeather = void 0;
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
exports.getWeather = getWeather;
const convertToFahrenheit = (temperature) => {
    return Number(((temperature * 9 / 5) + 32).toFixed(2));
};
exports.convertToFahrenheit = convertToFahrenheit;
const fetchAndConvertWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weatherData = yield (0, exports.getWeather)(city);
        const temp_F = (0, exports.convertToFahrenheit)(weatherData.main.temp);
        const feels_like_F = (0, exports.convertToFahrenheit)(weatherData.main.feels_like);
        const temp_min_F = (0, exports.convertToFahrenheit)(weatherData.main.temp_min);
        const temp_max_F = (0, exports.convertToFahrenheit)(weatherData.main.temp_max);
        const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
        return Object.assign(Object.assign({}, weatherData), { sys: Object.assign(Object.assign({}, weatherData.sys), { time: { sunrise, sunset } }), main: Object.assign(Object.assign({}, weatherData.main), { tempInFahrenheit: { temp_F, feels_like_F, temp_max_F, temp_min_F } }) });
    }
    catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch and convert weather data");
    }
});
exports.fetchAndConvertWeather = fetchAndConvertWeather;
exports.default = { getWeather: exports.getWeather, convertToFahrenheit: exports.convertToFahrenheit, fetchAndConvertWeather: exports.fetchAndConvertWeather };
