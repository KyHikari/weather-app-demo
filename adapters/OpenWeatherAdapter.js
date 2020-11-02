import fetch from 'node-fetch';
import buildUrl from 'build-url';

const BASE_URL = 'https://api.openweathermap.org/';

class OpenWeatherAdapter {

    constructor(appid) {
        this._appid = appid;
    }

    async forecast({q, zipCode, countryCode, units, lang, cnt }) {
        const zip = countryCode ? `${zipCode},${countryCode}` : zipCode;
        let url = buildUrl(BASE_URL, {
            path: '/data/2.5/forecast',
            queryParams: {
                appid: this._appid,
                q,
                zip,
                units,
                lang,
                cnt
            }
        });
        let req = await fetch(url);
        return req.json();
    }

}

export default new OpenWeatherAdapter(process.env.OPEN_WEATHER_API_KEY);