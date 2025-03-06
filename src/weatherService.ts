

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
    sea_level: number,
    grnd_level: number
}

interface Wind {
    speed: number,
    deg: number,
    gust: number
}

interface Clouds {
    all: number
}

interface WeatherSystem {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}

interface Weather {
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
const getWeather = async (city: string) : Promise<Weather> => {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        if (!response.ok){
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
}
const currentWeather = async (city: string): Promise<WeatherCondition[]> => {
    const weather: Weather = await getWeather(city)
    return weather.weather
}

const convertToFahrenheit =  (temperature: number) => {
    return (temperature * 9/5) + 32;
}

const fetchAndConvertWeather = async (city: string) => {
    try {
        const weatherData: Weather = await getWeather(city);
        const temperatureInC: number  = weatherData.main.temp;
        const temperatureInF: number = convertToFahrenheit(temperatureInC);

        console.log(`The weather is currently ${weatherData.weather[0].description}`)
        console.log(`The temperate is ${temperatureInC} degrees Celsius or ${temperatureInF} degrees Fahrenheit`);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

fetchAndConvertWeather('Trowbridge')


export default {getWeather, convertToFahrenheit};