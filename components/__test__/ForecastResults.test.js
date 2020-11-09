import ForecastResults from '../ForecastResults';

describe('ForecastResult', () => {
    test('render null with no results', () => {
        let results = [];
        let timezone = 0;
        let units = 'standard';
        let element = shallow(<ForecastResults
            results={results}
            timezone={timezone}
            units={units}
        />);

        expect(element.equals(null)).toBe(true);
    });

    test('render the correct number of ForecastElements results', () => {
        let results = [
            { dt: '1' },
            { dt: '2' }
        ];
        let timezone = 0;
        let units = 'standard';
        let element = shallow(<ForecastResults
            results={results}
            timezone={timezone}
            units={units}
        />);

        expect(element.equals(null)).toBe(false);
        expect(element.find('ForecastElement')).toHaveLength(2);
    });
});