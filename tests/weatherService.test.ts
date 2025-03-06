import getWeather from "../src";

global.fetch = jest.fn();

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
