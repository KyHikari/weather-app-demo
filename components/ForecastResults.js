import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import ForecastElement from './ForecastElement'

const UNITS_SYMBOL = {
    metric: {
        speed: 'm/s',
        temp: '°C',
    },
    imperial: {
        speed: 'mph',
        temp: '℉',
    },
    standard: {
        speed: 'm/s',
        temp: 'K',
    },
};
class ForecastResults extends React.Component {

    render() {
        let {
            results,
            timezone,
            units
        } = this.props;

        if (results.length === 0) {
            return null;
        }
        
        return (
            <Accordion>
                {results.map(element =>
                    <ForecastElement
                        key={element.dt}
                        data={element}
                        timezone={timezone}
                        tempUnit={UNITS_SYMBOL[units].temp}
                        speedUnit={UNITS_SYMBOL[units].speed}
                    />
                )}
            </Accordion>
        );

    }
}

export default ForecastResults;