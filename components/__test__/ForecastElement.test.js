import React from 'react';
import {shallow} from 'enzyme';
import ForecastElement from '../ForecastElement';

describe('ForecastElement', () => {

    test('renders correctly', () => {
        let data = {
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
        let timezone = -10800;
        let tempUnit = 'K';
        let speedUnit = 'm/s';

        let element = shallow(<ForecastElement
            data={data}
            timezone={timezone}
            tempUnit={tempUnit}
            speedUnit={speedUnit}
        />);
        expect(element.find('.datetime').text()).toEqual('Fri, 06 Nov 2020 00:00:00 GMT');

        expect(element.find('.main').childAt(0).text()).toEqual('Temp: 290.92K');
        element.setProps({tempUnit: 'C'});
        expect(element.find('.main').childAt(0).text()).toEqual('Temp: 290.92C');
    });

});