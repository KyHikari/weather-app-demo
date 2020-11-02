import OpenWeather from '../../adapters/OpenWeatherAdapter';

export default async (req, res) => {

    try {
        const {
            query: {
                q,
                zipCode,
                countryCode,
                units,
                lang,
                cnt
            }
        } = req;

        let data = await OpenWeather.forecast({
            q,
            zipCode,
            countryCode,
            units,
            lang,
            cnt
        });

        res.statusCode = 200;
        res.json(data);
    } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send();
    }
}