const API_KEY: string = 'bb33b194c1fa1cf8cd4d01789f0e1b39';

const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/weather';

interface Coord {
    lon: number,
    lat: number
}

interface WeatherCondition {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface WeatherMetrics {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level?: number,
    grnd_level?: number,
}

interface Wind {
    speed: number,
    deg: number,
    gust?: number
}

interface Clouds {
    all: number
}

interface WeatherSystem {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number,
}

export interface Time {
    sunrise: string,
    sunset: string
}

export interface TempInFahrenheit {
    temp_F: number,
    feels_like_F: number,
    temp_max_F: number,
    temp_min_F: number
}

export interface Weather {
    coord: Coord,
    weather: WeatherCondition[],
    base: string,
    main: WeatherMetrics,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    sys: WeatherSystem,
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export interface ModifiedWeather extends Weather {
    sys: WeatherSystem & { time: Time };
    main: WeatherMetrics & { tempInFahrenheit: TempInFahrenheit };
}

export const getWeather = async (city: string): Promise<Weather> => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
};

export const convertToFahrenheit = (temperature: number): number => {
    return Number(((temperature * 9/5) + 32).toFixed(2));
};

export const fetchAndConvertWeather = async (city: string): Promise<ModifiedWeather> => {
    try {
        const weatherData: Weather = await getWeather(city);

        const temp_F: number = convertToFahrenheit(weatherData.main.temp);
        const feels_like_F: number = convertToFahrenheit(weatherData.main.feels_like);
        const temp_min_F: number = convertToFahrenheit(weatherData.main.temp_min);
        const temp_max_F: number = convertToFahrenheit(weatherData.main.temp_max);

        const sunrise: string = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
        const sunset: string = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

        return {
            ...weatherData,
            sys: {
                ...weatherData.sys,
                time: { sunrise, sunset }
            },
            main: {
                ...weatherData.main,
                tempInFahrenheit: { temp_F, feels_like_F, temp_max_F, temp_min_F }
            }
        };
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error("Failed to fetch and convert weather data");
    }
};

export default { getWeather, convertToFahrenheit, fetchAndConvertWeather };