import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default function ForecastElement(props) {
    let {
        data: {
            dt,
            main,
            weather,
            clouds,
            wind,
            visibility,
            pop,
            rain,
            snow,
            sys: { pod }
        },
        timezone,
        tempUnit,
        speedUnit
    } = props;
    let datetime = (new Date((dt + timezone ) * 1000)).toUTCString();
    let mainWeather = weather[0];
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={dt}>
                <strong> 
                    <span>{datetime}</span>
                    <br/>
                    <img src={`http://openweathermap.org/img/wn/${mainWeather.icon}.png`} />
                    {mainWeather.description}
                </strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={dt}>
                <Card.Body>
                    <div className="datetime">
                        {datetime}
                    </div>
                    <div className="weather-list">
                        {weather.map(element => 
                            <div key={element.id}>
                                <img src={`http://openweathermap.org/img/wn/${element.icon}@2x.png`} />
                                {element.description}
                            </div>
                        )}
                    </div>

                    <div className="main">
                        <div>Temp: {main.temp}{tempUnit}</div>
                        <div>Feels like: {main.feels_like}{tempUnit}</div>
                        <div>Temp Min: {main.temp_min}{tempUnit}</div>
                        <div>Temp Max: {main.temp_max}{tempUnit}</div>
                        <div>Pressure: {main.pressure} hPa</div>
                        <div>Pressure Sea level: {main.sea_level} hPa</div>
                        <div>Pressure Ground level: {main.grnd_level} hPa</div>
                        <div>Humidity: {main.humidity}%</div>
                    </div>

                    <div className="pop">
                        Probability of precipitation: {pop}%
                    </div>
                    <div className="visibility">
                        Visibility: {visibility}m
                    </div>
                    <div className="wind">
                        <div>Speed: {wind.speed}{speedUnit}</div>
                        <div>Direction: {wind.deg}deg</div>
                    </div>
                    <div className="clouds">
                        Cloudiness: {clouds.all}%
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}