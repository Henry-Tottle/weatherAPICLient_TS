

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
const currentWeather = async (): Promise<WeatherCondition[]> => {
    const weather: Weather = await getWeather('Bath')
    return weather.weather
}

currentWeather().then(console.table)



export default getWeather;