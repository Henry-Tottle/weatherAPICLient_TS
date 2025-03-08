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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weatherService_1 = require("./weatherService");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3007;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/weather/:city', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.params.city;
        const weatherData = yield (0, weatherService_1.fetchAndConvertWeather)(city);
        res.json(weatherData);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
