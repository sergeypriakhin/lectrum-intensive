import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './styles.scss';

export default class Like extends Component {
    static propTypes = {
        liked:      PropTypes.bool.isRequired,
        likePost:   PropTypes.func,
        likes:      PropTypes.array
    };
    static contextTypes = {
        firstName: PropTypes.string,
        lastName:  PropTypes.string
    };

    constructor () {
        super();

        this.likePost = ::this._likePost;
    }

    state = {
        showLikers: false
    };

    setShowLikersState = (value) => {
      this.setState({
          showLikers: value
      });
    };

    _likePost () {
        const { likePost, id } = this.props;
        const { firstName, lastName } = this.context;

        // console.log('POST _likePost', id, firstName, lastName);

        likePost(id, firstName, lastName);
    }

    render () {
        const { liked, likes } = this.props;
        const { showLikers } = this.state;

        const likeStyles = liked
            ? `${Styles.icon} ${Styles.liked}`
            : `${Styles.icon}`;

        const likers = likes.map(
            ({ firstName, lastName }, index) =>
                <li key = { index }>{ `${firstName} ${lastName}` }</li>
        );

        const likersList = showLikers && likers.length
            ? <ul className = { Styles.ul }>
                { likers }
            </ul>
            : null;

        return (
            <section className = { Styles.like }>
                <div
                    className = { likeStyles }
                    onClick = { this.likePost }
                    onMouseEnter = { () => this.setShowLikersState(true) }
                    onMouseLeave = { () => this.setShowLikersState(false) }>
                    {likes.length}
                </div>
                { likersList }
            </section>
        );
    }
};
