/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

import { getFullName } from "../../helpers/index";
// styles
import Styles from './styles.scss';
import Like from '../Like';

export default class Post extends Component {

    static propTypes = {
        avatar:     PropTypes.string,
        comment:    PropTypes.string,
        created:    PropTypes.number,
        deletePost: PropTypes.func,
        firstName:  PropTypes.string,
        id:         PropTypes.string,
        lastName:   PropTypes.string,
        likePost:   PropTypes.func,
        likes:      PropTypes.array
    };

    static contextTypes = {
        firstName: PropTypes.string,
        lastName:  PropTypes.string
    };

    constructor () {
        super();

        this.deleteP = ::this._deleteP;
        // this.likePost = ::this._likePost;
    }

    _deleteP () {
        this.props.deletePost(this.props.id);
    }

    render () {
        const {
            id,
            comment,
            created,
            firstName,
            lastName,
            avatar,
            likePost,
            likes
        } = this.props;

        const {
            firstName: ownFirstName,
            lastName:  ownLastName
        } = this.context;

        const isAbleToDelete =
            `${firstName} ${lastName}`
            ===
            `${ownFirstName} ${ownLastName}`
                ||
                !comment
                ||
                !firstName
                ||
                !lastName
                ||
                !avatar
                ||
                !created
                ? <span onClick = { this.deleteP } /> : null;

        // console.log('LIKES', likes);

        const liked = likes.some(
            (like) => like === null ? false : like.firstName === ownFirstName
        );

        return (<section className = { Styles.post }>
            {isAbleToDelete}
            <img src = { avatar } />
            <div className = { Styles.header }>
                <h2>{ getFullName(firstName, lastName) }</h2>
                <time>{moment.unix(created).format('LLL')}</time>
            </div>
            <div className = { Styles.text }>
                {comment}
            </div>
            <Like
                id = { id }
                liked = { liked }
                likePost = { likePost }
                likes = { likes }
            />
        </section>);
    }
}
