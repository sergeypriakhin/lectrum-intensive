import React from 'react';
import { shallow } from 'enzyme';
import Composer from './';
import Feed from '../../components/Feed';
import { options } from '../../containers/App';

const { firstName, lastName, avatar } = options;

const message = 'Hello';

const state = {
    textAreaValue: '',
    color:         ''
};

const mutatedState = {
    textAreaValue: message,
    color:         ''
};

const result = shallow(<Composer createPost = { new Feed().createPost } />, {
    context: {
        firstName,
        lastName,
        avatar
    }
});

describe('Composer component:', () => {
    test('Should have 1 \'section\' element', () => {
        expect(result.find('section').length).toBe(1);
    });

    test('Should have 1 \'form\' element', () => {
        expect(result.find('form').length).toBe(1);
    });

    test('Should have 1 \'textarea\' element', () => {
        expect(result.find('textarea').length).toBe(1);
    });

    test('Should have 1 \'input\' element', () => {
        expect(result.find('input').length).toBe(1);
    });

    test('Should have 1 \'img\' element', () => {
        expect(result.find('img').length).toBe(1);
    });

    test('Should have valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('Should respond to state change properly', () => {
        result.setState({
            textAreaValue: message
        });

        expect(result.state()).toEqual(mutatedState);

        result.setState({
            textAreaValue: ''
        });

        expect(result.state()).toEqual(state);
    });

    test('textarea value should empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('component state and textarea value should reflect...', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').get(0).props.value).toBe(message);
    });

    test('component state and textarea value should reflect according changes if th form is submit', () => {
        result.find('input').simulate('submit');
        expect(result.state()).toEqual(state);
        // console.log(result);
    });

});
