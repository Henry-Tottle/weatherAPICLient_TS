

const API_KEY = 'bb33b194c1fa1cf8cd4d01789f0e1b39';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city: string) : Promise<any> => {
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
const currentWeather = async () => {
    let weather = await getWeather('Bath')
    console.log(weather.weather)
    return weather.weather
}

currentWeather().then(console.log)



export default getWeather;