import getForecast from '../../services/ForecastService';
import Forecast from '../Forecast';

jest.mock('../../services/ForecastService');
jest.useFakeTimers();

describe('Forecast', () => {

    test('Initial state renders no results', () => {
        let element = shallow(<Forecast />);

        expect(element.find('ForecastFilter').exists()).toBe(true);
        expect(element.find('ForecastResults').exists()).toBe(false);
        expect(element.find('h2').exists()).toBe(false);

    });

    describe('Forecast service returns results', () => {

        let promise;
        beforeAll(() => {
            
            getForecast.mockImplementation(() => {
                let element = {
                    "dt": 1604631600,
                    "main": {
                        "temp": 290.92,
                        "feels_like": 287,
                        "temp_min": 290.68,
                        "temp_max": 290.92,
                        "pressure": 1016,
                        "sea_level": 1016,
                        "grnd_level": 984,
                        "humidity": 37,
                        "temp_kf": 0.24
                    },
                    "weather": [
                        {
                            "id": 800,
                            "main": "Clear",
                            "description": "cielo claro",
                            "icon": "01n"
                        }
                    ],
                    "clouds": {
                        "all": 0
                    },
                    "wind": {
                        "speed": 3.42,
                        "deg": 12
                    },
                    "visibility": 10000,
                    "pop": 0,
                    "sys": {
                        "pod": "n"
                    },
                    "dt_txt": "2020-11-06 03:00:00"
                };
                return promise = Promise.resolve({
                    list: [element],
                    city: {}
                });
            });
        });

        afterAll(() => {
            getForecast.mockReset();
        });

        test('Search fetches results from ForecastService', async () => {
            let element = mount(<Forecast />);

            let changeEvent = { target: { name: 'cityName', value: 'zapopan' } };
            element.find('ForecastFilter').find({ name: 'cityName' }).first().simulate('change', changeEvent);

            jest.runAllTimers();

            expect(getForecast).toHaveBeenCalled();
            await promise;
            expect(element.state('forecastResults').length).toBe(1);
            expect(element.state('error')).toBe(false);
            element.update();
            expect(element.find('ForecastResults').exists()).toBe(true);
            expect(element.find('h2').exists()).toBe(false);
        });
    });

    describe('Forecast service throws an error', () => {

        let promise;
        beforeAll(() => {
            getForecast.mockImplementation(() => {
                return promise = Promise.reject('Error fetching from API');
            });
        });

        afterAll(() => {
            getForecast.mockReset();
        });

        test('Search fetches results from ForecastService', async () => {
            let element = mount(<Forecast />);

            let changeEvent = { target: { name: 'cityName', value: 'zapopan' } };
            element.find('ForecastFilter').find({ name: 'cityName' }).first().simulate('change', changeEvent);

            jest.runAllTimers();

            expect(getForecast).toHaveBeenCalled();
            await expect(promise).rejects.toBe('Error fetching from API');
            expect(element.state('forecastResults').length).toBe(0);
            expect(element.state('error')).toBe(true);
            element.update();
            expect(element.find('ForecastResults').exists()).toBe(false);
            expect(element.find('h2').exists()).toBe(true);
        });
    });

});