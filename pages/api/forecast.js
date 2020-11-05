import OpenWeatherService from '../../services/OpenWeatherService';

export default async (req, res) => {

    try {
        let {
            query: {
                cityName,
                zipCode,
                countryCode,
                units,
                lang,
                cnt
            }
        } = req;

        let data;
        switch (true) {
            case (!!cityName):
                data = await OpenWeatherService.forecast5ByCityName({
                    cityName,
                    countryCode,
                    units,
                    lang,
                    cnt
                });
                break;
            case (!!zipCode):
                data = await OpenWeatherService.forecast5ByZipCode({
                    zipCode,
                    countryCode,
                    units,
                    lang,
                    cnt
                });
                break;
            default:
                throw new Error('Invalid arguments');
        }

        res.statusCode = 200;
        res.json(data);
    } catch (e) {
        console.error(e);
        res.statusCode = 500;
        res.send();
    }
}