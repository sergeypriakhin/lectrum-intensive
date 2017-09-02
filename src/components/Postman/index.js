/* eslint-disable no-console */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles.scss';

import { Transition } from 'react-transition-group';
import TweenMax from 'gsap';

export default class Postman extends Component {
    static contextTypes={
        firstName: PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.handlePostmanEnter = ::this._handlePostmanEnter;
        this.handlePostmanExit = ::this._handlePostmanExit;
        this.changeState = ::this._changeState;
    }

    state = {
        isPostman: true
        // showPostman: false
    };

    componentWillMount () {
        // if (localStorage.getItem('postman') !== true) {
        //     this.updatePostMan = setTimeout(() => this.changeState(), 5000);
        // } else {
        //     clearInterval(this.updatePostMan);
        // }
        this.updatePostMan = setTimeout(() => this.changeState(), 5000);
    }

    // componentDidMount () {
    //     if (localStorage.getItem('postman') === false) {
    //         this.updatePostMan = setTimeout(() => this.changeState(), 5000);
    //     }
    // }

    _changeState () {
        console.log('_changeState');
        this.setState({
            isPostman: !this.state.isPostman
        });
        // localStorage.setItem('postman', false);
    }

    _handlePostmanEnter () {
        console.log('_handlePostmanEnter');
        const { refPostMan } = this;

        TweenMax.fromTo(
            refPostMan,
            1,
            { opacity: 0 },
            { opacity: 1, delay: 2 }
            // { onComplete: () => this.handlePostmanExit }
        );
        // localStorage.setItem('postman', true);
    }

    _handlePostmanExit () {
        console.log('_handlePostmanExit');
        const { refPostMan } = this;

        TweenMax.fromTo(
            refPostMan,
            1,
            { opacity: 1 },
            { opacity: 0 }
        );
        // localStorage.setItem('postman', false);
    }

    render () {
        const { firstName, avatar } = this.context;

        return (
            <div>
                {/*{ this.state.showPostman ? 'true' : 'false' }*/}
                <Transition
                    appear
                    in = { this.state.isPostman }
                    timeout = { 1000 }
                    onEnter = { this.handlePostmanEnter }
                    onExit = { this.handlePostmanExit }>
                    <div
                        className = { Styles.postman }
                        ref = { (refPostMan) => this.refPostMan = refPostMan }>
                        <img alt = 'Avatar' src = { avatar } />
                        <span>hello, I am {firstName}!</span>
                    </div>
                </Transition>
            </div>
        );
    }
}
