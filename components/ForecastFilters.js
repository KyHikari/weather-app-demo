import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class ForecastFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitHandle: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isSubmitDisabled = this.isSubmitDisabled.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        if (this.props.handleInputChange) {
            this.props.handleInputChange.call(null, key, value);
        }

        if (!this.props.handleSubmit) {
            return;
        }

        if (this.state.submitHandle) {
            clearTimeout(this.state.submitHandle)
        }
        let submitHandle = setTimeout(this.submit, 1000);
        this.setState({submitHandle});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.submit();
    }

    submit() {
        this.setState({submitHandle: null});
        if (this.props.handleSubmit ) {
            this.props.handleSubmit.call();
        }
    }
    isSubmitDisabled() {
        return !this.props.values.cityName && !this.props.values.zipCode;
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <Form.Control
                    name="cityName"
                    placeholder="City Name"
                    onChange={this.handleChange}
                    value={this.props.values.cityName}
                />
                <Form.Control
                    name="zipCode"
                    placeholder="ZipCode"
                    onChange={this.handleChange}
                    value={this.props.values.zipCode}
                />
                <Form.Control
                    name="countryCode"
                    placeholder="CountryCode"
                    onChange={this.handleChange}
                    value={this.props.values.countryCode}
                />
                <Form.Control
                    as="select"
                    name="units"
                    onChange={this.handleChange}
                    value={this.props.values.units}
                    custom
                >
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                    <option value="standard">Standard</option>
                </Form.Control>

                <Button type="submit" disabled={this.isSubmitDisabled()}>
                    Submit
                    { this.state.submitHandle && <Spinner as="span" animation="grow" role="status" size="sm" /> }
                </Button>
            </Form>
        );
    }
}

export default ForecastFilter;