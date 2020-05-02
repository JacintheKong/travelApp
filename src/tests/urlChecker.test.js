import {validURL} from '../client/js/urlChecker'

describe('Test the function validURL() is exist', () => {
    test('It should return true', async () => {
        expect(validURL).toBeDefined();
    });
});

describe('Test the function validURL() is a function', () => {
    test('It should be a function', async () => {
        expect(typeof validURL).toBe("function");
    });
});

describe('Test validURL() for valid url' , () => {
    var url = "https://www.udacity.com/";
    test('It should return true', async () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(true);
    });
});

describe('Test validURL() for invalid url' , () => {
    var url = "kyj";
    test('It should return false', async () => {
        const response = validURL(url);
        expect(response).toBeDefined();
        expect(response).toBe(false);
    });
});





