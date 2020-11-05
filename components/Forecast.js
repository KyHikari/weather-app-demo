import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import ForecastFilter from '../components/ForecastFilters'
import ForecastResults from './ForecastResults'
import getForecast from '../services/ForecastService'

class Forecast extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            forecastResults: [],
            city: null,
            filters: {
                cityName: '',
                zipCode: '',
                countryCode: '',
                units: 'standard'
            },
            currentFilters: {
                cityName: '',
                zipCode: '',
                countryCode: '',
                units: 'standard'
            }
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    }

    handleFilterChange(key, value) {
        this.setState((state) => {
            let filters = {...state.filters};
            filters[key] = value;
            return {
                filters
            };
        });
    }

    handleFilterSubmit() {
        this.setState({
            loading: true,
            currentFilters: {...this.state.filters}
        });
        getForecast(this.state.filters)
        .then(data => {
            this.setState({
                loading: false,
                error: false,
                forecastResults: data.list,
                city: data.city,
            });
        }).catch(() => {
            this.setState({
                loading: false,
                error: true,
                forecastResults: [],
                city: null 
            });
        })
    }

    render() {
        let { forecastResults, city, error } = this.state;

        let results;
        if (forecastResults.length > 0) {
            results = (<ForecastResults
                results={forecastResults}
                timezone={city.timezone}
                units={this.state.currentFilters.units}
            />);
        }
        return (
            <>
                <ForecastFilter
                    handleInputChange={this.handleFilterChange}
                    handleSubmit={this.handleFilterSubmit}
                    values={this.state.filters}
                />

                {error && !this.state.loading && <h2>Error!</h2>}
                {this.state.loading && <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>}
                {!this.state.loading && results}
            </>
        );
    }
}

export default Forecast;