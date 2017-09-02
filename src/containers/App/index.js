// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//components
import Feed from '../../components/Feed';

import avatar from '../../theme/assets/avatar.jpg';

//styles
import '../../theme/reset.css';

export const options = {
    firstName: 'Sergey',
    lastName:  'Priakhin',
    api:       'https://lab.lectrum.io/feed',
    avatar
};


export default class App extends Component {

    static childContextTypes = {
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired,
        api:       PropTypes.string
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <section>
                <Feed />
            </section>
        );
    }
}
