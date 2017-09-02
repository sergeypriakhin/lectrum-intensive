import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';


export default class Counter extends Component {

    static propTypes = {
        postCount: PropTypes.number.isRequired
    };

    render () {
        const { postCount } = this.props;

        return (
            <section className = { Styles.counter }>
                <span>
                    Post count: { postCount }
                </span>
            </section>
        );
    }
}
