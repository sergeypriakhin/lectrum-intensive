// import React from 'react';
import { getFullName, getUniqueID, getRandomColor, getCurrentTime } from './';

const firstName = 'Brad';
const lastName = 'Pit';

describe('Helpers: ', () => {

    test('getCurrentTime should be a function', () => {
        expect(typeof getCurrentTime).toBe('function');
    });

    test('getCurrentTime should be return string', () => {
        expect(typeof getCurrentTime()).toBe('number');
    });

    test('getUniqueID should be a function', () => {
        expect(typeof getUniqueID).toBe('function');
    });

    test('getUniqueID must have argument', () => {
        function getUniqueIDWithNotArg () {
            getUniqueID();
        }

        expect(getUniqueIDWithNotArg).toThrowError(
            'you should be pass an argument'
        );
    });

    test('getUniqueID arguments passed should be number', () => {
        function getUniqueIDWithError () {
            getUniqueID('string');
        }

        expect(getUniqueIDWithError).toThrowError(
            'length argument passed should be a number'
        );
    });

    test('getUniqueID should be return length 15', () => {
        expect(getUniqueID(15).length).toBe(
            15
        );
    });

    test('getRandomColor should be a function', () => {
        expect(typeof getRandomColor).toBe('function');
    });

    test('getRandomColor should be #', () => {
        expect(getRandomColor()[0]).toBe(
            '#'
        );
    });

    test('getRandomColor should be return length 7', () => {
        expect(getRandomColor().length).toBe(
            7
        );
    });

    test('getFullName should be a function', () => {
        expect(typeof getFullName).toBe('function');
    });


    test('getFullName should return a valid output', () => {
        expect(getFullName(firstName, lastName)).toBe(
            `${firstName} ${lastName}`
        );
    });

    test('getFullName function should throw an error if non-string arguments were passed', () => {
        function getFullNameWithError () {
            getFullName(null, 1);
        }

        expect(getFullNameWithError).toThrowError(
            'firstName and lastName arguments passed should be a string'
        );
    });

});
