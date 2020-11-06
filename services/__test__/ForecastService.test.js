import fetchMock from 'fetch-mock-jest';
import getForecast from '../ForecastService';

describe('ForecastService', () => {
    test('#getForecast() should fail with no arguments', async () => {
        fetchMock.get('path:/api/forecast', 500);
        await expect(async () => await getForecast()).rejects.toThrow();
    });

    test('#getForecast() returns correct data', async () => {
        fetchMock.get('path:/api/forecast', {cod: '201'});
        let data = await getForecast({cityName: 'zapopan'});
        expect(data.cod).toBe('201');
    });

    test('#getForecast() returns data with error code', async () => {
        fetchMock.get('path:/api/forecast', { status: 404, body: {cod: '404', message: 'Not found'}});
        await expect(async () => await getForecast()).rejects.toThrowError('(404) : Not Found');
    });

    afterEach(() => {
        fetchMock.restore();
    })
})