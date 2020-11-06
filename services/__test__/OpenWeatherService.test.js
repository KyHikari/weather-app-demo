import fetchMock from 'fetch-mock-jest';
import OpenWeatherService from '../OpenWeatherService';

describe('OpenWeatherService', () => {
    test('#forecast5ByZipCode() throw error if zipCode is missing', async () => {
        await expect(async () => await OpenWeatherService.forecast5ByZipCode({})).rejects.toThrowError('ZipCode is required.');
    });

    test('#forecast5ByCityName throw error if cityName is missing', async () => {
        await expect(async () => await OpenWeatherService.forecast5ByCityName({})).rejects.toThrowError('CityName is required.');
    });

    test('#forecast5ByCityName throw error is response is error code', async () => {
        fetchMock.get('path:/data/2.5/forecast', { status: 404, body: {cod: '404', message: 'City Not Found'}});
        await expect(async () => await OpenWeatherService.forecast5ByCityName({cityName: 'zapopan'})).rejects.toThrowError('(404) : City Not Found');
    });

    test('#forecast5ByZipCode throw error is response is error code', async () => {
        fetchMock.get('path:/data/2.5/forecast', { status: 404, body: {cod: '404', message: 'ZipCode Not Found'}});
        await expect(async () => await OpenWeatherService.forecast5ByZipCode({zipCode: 'zapopan'})).rejects.toThrowError('(404) : ZipCode Not Found');
    });

    test('#forecast5ByZipCode() returns correct data', async () => {
        fetchMock.get('path:/data/2.5/forecast', {cod: '201'});
        let data = await OpenWeatherService.forecast5ByZipCode({zipCode: '45070'});
        expect(data.cod).toBe('201');
        expect(fetchMock).toHaveLastFetched('https://api.openweathermap.org/data/2.5/forecast?zip=45070')

        await OpenWeatherService.forecast5ByZipCode({zipCode: '45070', countryCode: 'MX'});
        expect(fetchMock).toHaveLastFetched('https://api.openweathermap.org/data/2.5/forecast?zip=45070%2CMX')
    });

    test('#forecast5ByCityName() returns correct data', async () => {
        fetchMock.get('path:/data/2.5/forecast', {cod: '201'});
        let data = await OpenWeatherService.forecast5ByCityName({cityName: 'zapopan'});
        expect(data.cod).toBe('201');
        expect(fetchMock).toHaveLastFetched('https://api.openweathermap.org/data/2.5/forecast?city=zapopan')

        await OpenWeatherService.forecast5ByCityName({cityName: 'zapopan', countryCode: 'MX'});
        expect(fetchMock).toHaveLastFetched('https://api.openweathermap.org/data/2.5/forecast?city=zapopan%2CMX')
    });

    afterEach(() => {
        fetchMock.restore();
    })
})
