import buildUrl from 'build-url';
import 'isomorphic-fetch';
const BASE_URL = 'http://localhost:3000/';

export default async function getForecast(query) {

    const url = buildUrl(BASE_URL, {
        path: '/api/forecast',
        queryParams: query
    });
    try {
        let response = await fetch(url);
        if (response.status < 200 || response.status >= 300) {
            let message = `Error fetching api URL '${url}'\n`;
            message += `(${response.status}) : ${response.statusText}`;
            throw Error(message);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
    
}