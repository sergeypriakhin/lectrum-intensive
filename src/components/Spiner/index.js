import React, { Component } from 'react';
import Styles from './styles.scss';

export default class Spiner extends Component {
    state = {
        loading: 'Loading'
    };

    componentWillMount () {
        this.spinning = setInterval(() => this.spin(), 1000);
    }

    componentWillUnmount () {
        clearInterval(this.spinning);
    }

    spin = () => {
        const { loading } = this.state;

        if (loading.length >= 10) {
            this.setState({
                loading: 'loading'
            });
            // return;
        } else {
            this.setState({
                loading: `${loading}.`
            });
        }
    };

    render () {
        const { loading } = this.state;

        return <section className = { Styles.spiner }>{loading}</section>;
    }
}
