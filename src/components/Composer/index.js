/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//styles
import Styles from './styles.scss';
import { getCurrentTime, getRandomColor, getUniqueID } from '../../helpers/index';

export default class Composer extends Component {

    static contextTypes={
        firstName: PropTypes.string.isRequired,
        lastName:  PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired
    };

    static propTypes = {
        createPost: PropTypes.func
    };

    constructor () {
        super();

        this.handleTextAreaChange = ::this._handleTextAreaChange;
        this.textAreaSubmit = ::this._textAreaSubmit;
        this.handleCopy = ::this._handleCopy;
        this.handleKeyPress = ::this._handleKeyPress;
    }

    state = {
        textAreaValue: '',
        // error:         '',
        color:         ''
    };

    _handleTextAreaChange (e) {
        this.setState({
            textAreaValue: e.target.value
        });
    }

    _textAreaSubmit (e) {
        e.preventDefault();

        const { firstName, lastName, avatar } = this.context;

        if (this.state.textAreaValue.length < 1) {
            // this.setState({
            //     error: 'Поле не должно быть пустым!!!'
            // });

            return false;
        }
        this.setState({
            textAreaValue: ''
        });

        const formData =  {
            _id:     getUniqueID(15),
            comment: this.state.textAreaValue,
            created: getCurrentTime(),
            firstName,
            lastName,
            avatar,
            likes:   []
        };

        this.props.createPost(formData);
    }

    _handleCopy (e) {
        e.preventDefault();
    }

    _handleKeyPress () {
        this.setState({
            color: getRandomColor()
        });
    }

    render () {
        const { firstName, avatar } = this.context;
        const { textAreaValue, error, color } = this.state;

        return (<section className = { Styles.composer }>
            <img src = { avatar } />
            <form onSubmit = { this.textAreaSubmit } ref='form'>
                <textarea
                    placeholder = { `What's on your mind, ${firstName}?` }
                    style = { { color: `${color}` } }
                    value = { textAreaValue }
                    onChange = { this.handleTextAreaChange }
                    onCopy = { this.handleCopy }
                    onKeyPress = { this.handleKeyPress }
                />
                <input type = 'submit' value = 'Post' />
            </form>
            {/*{error && <span className = { Styles.error }>{error}</span>}*/}
        </section>
        );
    }
}
