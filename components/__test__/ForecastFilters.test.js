import React from 'react';
import {shallow} from 'enzyme';
import ForecastFilters from '../ForecastFilters';

jest.useFakeTimers();

describe('ForecastFilters', () => {

    test('Submit triggers event correctly', () => {
        let inputChange = jest.fn();
        let submit = jest.fn();
        let filters = {
            cityName: 'zapopan',
            zipCode: '',
            countryCode: 'MX',
            units: 'standard'
        };
        let element = shallow(<ForecastFilters
            handleInputChange={inputChange}
            handleSubmit={submit}
            values={filters}
        />);
        const event = { preventDefault: jest.fn() };
        element.find('Form').simulate('submit', event);
        expect(submit).toBeCalledTimes(1);
    });

    test('Change event triggers correctly', () => {
        let inputChange = jest.fn();
        let filters = {
            cityName: 'zapopan',
            zipCode: '',
            countryCode: 'MX',
            units: 'standard'
        };
        let element = shallow(<ForecastFilters
            handleInputChange={inputChange}
            values={filters}
        />);
        const event = { target: {name: 'zipCode', value: '45070'} };
        element.find({name:'zipCode'}).simulate('change', event);
        expect(inputChange).toBeCalledWith('zipCode', '45070');
    });

    test('Change event triggers auto Submit', () => {
        let inputChange = jest.fn();
        let submit = jest.fn();
        let filters = {
            cityName: 'zapopan',
            zipCode: '',
            countryCode: 'MX',
            units: 'standard'
        };
        let element = shallow(<ForecastFilters
            handleInputChange={inputChange}
            handleSubmit={submit}
            values={filters}
        />);
        const event = { target: {name: 'cityName', value: 'zapopan'} };
        element.find({name:'cityName'}).simulate('change', event);
        expect(inputChange).toBeCalledWith('cityName', 'zapopan');

        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

        jest.runAllTimers();
        expect(submit).toBeCalled();
    });

    test('Submit button disabled state works', () => {
        let filters = {
            cityName: '',
            zipCode: '',
            countryCode: '',
            units: 'standard'
        };
        let element = shallow(<ForecastFilters
            values={filters}
        />);
        expect(element.find('Button').prop('disabled')).toBe(true);

        filters.zipCode = '45070';
        element.setProps({filters});
        expect(element.find('Button').prop('disabled')).toBe(false);

        filters.cityName = 'zapopan';
        element.setProps({filters});
        expect(element.find('Button').prop('disabled')).toBe(false);

        filters.cityName = '';
        filters.zipCode = '';
        element.setProps({filters});
        expect(element.find('Button').prop('disabled')).toBe(true);
    });

});