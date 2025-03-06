 import weatherService from "../src/weatherService";
global.fetch = jest.fn();
const getWeather = weatherService.getWeather
const convertToFahrenheit = weatherService.convertToFahrenheit

test('fetches weather data for valid city', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ main: { temp: 25}, weather: [{ description: 'Clear sky'}] }),
    });
    const weather = await getWeather('London')
    expect(weather.main.temp).toBe(25);
    expect(weather.weather[0].description).toBe(('Clear sky'));

});

test('throws an error when API request fails', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
    });
    await expect(getWeather('InvalidCity')).rejects.toThrow('Failed to fetch weather data');
});

test('10.41 C converts to 50.738 F', () => expect(convertToFahrenheit(10.41)).toBeCloseTo(50.738, 3))
