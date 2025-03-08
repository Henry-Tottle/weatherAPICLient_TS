import {ModifiedWeather, Weather} from './weatherService';
import { getWeather, fetchAndConvertWeather, convertToFahrenheit } from './weatherService';

import express, { Response, Request } from 'express';
import cors from 'cors';
const app = express();
const port = 3007;

app.use(cors());
app.use(express.json())


app.get('/weather/:city', async (req: Request, res: Response) => {
    try {
        const city: string = req.params.city;
        const weatherData: ModifiedWeather = await fetchAndConvertWeather(city);
        res.json(weatherData)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})