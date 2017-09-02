/* eslint-disable no-console */
import React, { Component } from 'react';

// styles
import Styles from './styles.scss';
import PropsTypes from 'prop-types';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import TweenMax from 'gsap';

// components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';
import Postman from '../../components/Postman';
import Spiner from '../../components/Spiner';

// const updatePost = setInterval(() => this.getPosts(), 5000);


export default class Feed extends Component {

    static contextTypes = {
        api:       PropsTypes.string.isRequired,
        firstName: PropsTypes.string.isRequired,
        lastName:  PropsTypes.string.isRequired,
        avatar:    PropsTypes.string.isRequired

    };

    constructor () {
        super();

        this.deletePost = ::this._deletePost;
        this.getPosts = ::this._getPosts;
        this.handleComposerAppear = ::this._handleComposerAppear;
        this.handleCounterAppear = ::this._handleCounterAppear;
        this.likePost = ::this._likePost;
    }

    state = {
        posts:         [],
        isPostLoading: false
    };


    componentWillMount () {
        this.getPosts();

        this.updatePost = setInterval(() => this.getPosts(), 5000);

    }

    componentDidMount () {
        clearInterval(this.updatePost);
    }

    createPost = (post) => {
        const { firstName, lastName, avatar, comment } = post;
        const { api } = this.context;

        // this.setState(({ posts }) => ({
        //     posts: [post, ...posts]
        // }));

        // console.log('post', post);

        fetch(api, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body:   JSON.stringify({
                firstName,
                lastName,
                avatar,
                comment
            })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Post was not created');
                }

                return response.json();
            })
            .then(() => this.setState(({ posts }) => ({
                posts: [post, ...posts]
            })));
            // .catch(({error}) => console.log('Error')); //eslint-disable-line

    };

    _getPosts () {
        fetch(this.context.api, { method: 'GET' })
            .then((response) => {
                this.setState({
                    isPostLoading: true
                });

                return response;
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Posts was not loaded');
                }

                return response.json();
            })
            .then(({ data }) => this.setState({
                posts: data
            }))
            .then(() => this.setState({ isPostLoading: false }));
            // .catch(({ message }) => console.log(message));
    }

    _deletePost (id) {
        const { posts } = this.state;
        const { api } = this.context;

        // this.setState({
        //     posts: posts.filter((post) => post._id !== id)
        // });
        fetch(`${api}/${id}`, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then(() => this.setState({
                posts: posts.filter((post) => post._id !== id)
            }));
    }

    _handleComposerAppear () {
        const { composer } = this;

        TweenMax.from(
            composer,
            0.5,
            { y: -200 },
            { y: 0 }
        );
    }

    _handleCounterAppear () {
        const { counter } = this;

        TweenMax.from(
            counter,
            0.5,
            { x: -200 },
            { x: 0 }
        );
    }

    _likePost (id, firstName, lastName) {

        console.log('_likePost', id, firstName, lastName);

        fetch(`${this.context.api}/${id}`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                firstName,
                lastName
            })
        })
            .then((response) => {
                this.setState({
                    isPostLoading: true
                });

                return response;
            })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Posts was not loaded');
                }

                this.getPosts();

                return response.json();
            })
            .then(() => {
                this.setState({
                    isPostLoading: false
                });
            });
            // .catch(({ message }) => console.log(message));
    }

    render () {
        const { isPostLoading } = this.state;
        const postsList = this.state.posts.map(
            ({ comment, _id, firstName, lastName, avatar, created, likes }) =>
                (
                    <CSSTransition
                        classNames = { {
                            enter:       Styles.postEnter,
                            enterActive: Styles.postEnterActive,
                            exit:        Styles.postExit,
                            exitActive:  Styles.postExitActive
                        } }
                        key = { _id }
                        timeout = { {
                            enter: 300,
                            exit:  500
                        } } >
                        <Post
                            avatar = { avatar }
                            comment = { comment }
                            created = { created }
                            deletePost = { this.deletePost }
                            firstName = { firstName }
                            id = { _id }
                            lastName = { lastName }
                            likePost = { this.likePost }
                            likes = { likes }
                        />
                    </CSSTransition>
                )
        );

        const spinner = isPostLoading
            ? <Spiner />
            : null;

        // console.log('postsList', postsList);
        return (
            <section className = { Styles.feed }>
                {spinner}
                <Postman />
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handleComposerAppear }>
                    <div
                        ref = { (composer) => this.composer = composer }>
                        <Composer
                            createPost = { this.createPost }
                        />
                    </div>
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handleCounterAppear }>
                    <div ref = { (counter) => this.counter = counter }>
                        <Counter postCount = { postsList.length } />
                    </div>
                </Transition>
                <TransitionGroup>
                    { postsList }
                </TransitionGroup>
            </section>
        );
    }
}
