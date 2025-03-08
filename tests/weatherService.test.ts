 import weatherService from "../src/weatherService";
global.fetch = jest.fn();
const getWeather = weatherService.getWeather;
const convertToFahrenheit = weatherService.convertToFahrenheit;
const fetchAndConvertWeather = weatherService.fetchAndConvertWeather;
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

test('converts Celsius to Fahrenheit correctly', () => {
    expect(convertToFahrenheit(10.41)).toBeCloseTo(50.74, 2);
    expect(convertToFahrenheit(0)).toBeCloseTo(32, 2);
    expect(convertToFahrenheit(100)).toBeCloseTo(212, 2);
})

 test("fetchAndConvertWeather correctly processes data", async () => {
     (fetch as jest.Mock).mockResolvedValueOnce({
         ok: true,
         json: async () => ({
             main: { temp: 25, feels_like: 27, temp_min: 22, temp_max: 28 },
             sys: { sunrise: 1640955600, sunset: 1640990400 },
             weather: [{ description: "Clear sky" }],
         }),
     });

     const result = await fetchAndConvertWeather("London");

     expect(result.main.tempInFahrenheit).toEqual({
         temp_F: convertToFahrenheit(25),
         feels_like_F: convertToFahrenheit(27),
         temp_max_F: convertToFahrenheit(28),
         temp_min_F: convertToFahrenheit(22),
     });

     expect(result.sys.time).toHaveProperty("sunrise");
     expect(result.sys.time).toHaveProperty("sunset");
 });

 test("converts timestamp to datetime string", () => {
     const convertTimestampToDateTime = (timestamp: number) =>
         new Date(timestamp * 1000).toLocaleTimeString();

     expect(convertTimestampToDateTime(1640955600)).toBe("1:00:00 PM"); // Example time format
     expect(convertTimestampToDateTime(1640990400)).toBe("10:40:00 PM");
 });

