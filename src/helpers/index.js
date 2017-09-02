// Core
import moment from 'moment';

export const getCurrentTime = () => moment().unix();

export const getUniqueID = (length) => {
    if (!length) {
        throw new Error('you should be pass an argument');
    }

    if (typeof length !== 'number') {
        throw new Error('length argument passed should be a number');
    }

    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};

export const getFullName = (firstName, lastName) => {

    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
        throw new Error('firstName and lastName arguments passed should be a string');
    }

    return `${firstName} ${lastName}`;
};
