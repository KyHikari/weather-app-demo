import 'isomorphic-fetch';
import buildUrl from 'build-url';
import ArgumentNullError from '../errors/ArgumentNullError';

const APP_ID = process.env.OPEN_WEATHER_API_KEY;
const API_URL = 'https://api.openweathermap.org/';
const API_ENDPOINTS = {
    forecast5: '/data/2.5/forecast'
};

class OpenWeatherService {

    async forecast5ByCityName({ cityName, countryCode, units, lang, cnt }) {
        if (!cityName) {
            throw new ArgumentNullError('CityName is required.');
        }

        let q = countryCode ? `${cityName},${countryCode}` : cityName;
        let params = {
            q,
            units,
            lang,
            cnt
        };

        return this._fetch(API_ENDPOINTS.forecast5, params);
    }

    async forecast5ByZipCode({ zipCode, countryCode, units, lang, cnt }) {
        if (!zipCode) {
            throw new ArgumentNullError('ZipCode is required.');
        }
        let zip = countryCode ? `${zipCode},${countryCode}` : zipCode;
        let params = {
            zip,
            units,
            lang,
            cnt
        };

        return this._fetch(API_ENDPOINTS.forecast5, params);
    }

    async _fetch(endpoint, params) {
        if (!params.appid) {
            params.appid = APP_ID;
        }
        let url = buildUrl(API_URL, {
            path: endpoint,
            queryParams: params
        });
        try {
            let response = await fetch(url);
            if (response.status < 200 || response.status >= 300) {
                let error = await response.json();
                let message = `(${error.cod}) : ${error.message}`;
                throw new Error(message);
            }
            return response.json();
        } catch (e) {
            let message = `Error fetching URL '${url}'\n`
            message += `${e.name} ${e.message}`;
            throw new Error(message);
        }
    }

}

export default new OpenWeatherService();