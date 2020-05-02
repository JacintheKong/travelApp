var requestPost = require('../server/handleRequest')
var validateRequest = requestPost.validateInputRequest;
var httpMocks = require('node-mocks-http');

describe('Test function "validateRequest()" exist', () => {
    test('It should return true', async () => {
        expect(validateRequest).toBeDefined();
    });
});

describe('Test validateRequest() is a function', () => {
    test('It should be a function', async () => {
        expect(typeof validateRequest).toBe("function");
    });
});

describe('Test validateRequest throw error with incorrect inputs', () => {
    test('validateRequest should throw error with incorrect inputs', () => {
    const next = jest.fn();
    const req = httpMocks.createRequest({ 
        body: { 
        url: "https://review.udacity.com/#!/rubrics/2668/view"
        }
    });
    const res = httpMocks.createResponse();
    validateRequest(req, res, next);
    // validate HTTP result
    expect(res.statusCode).toBe(400);
    expect(res._isJSON()).toBeTruthy();
    // validate message
    const json = JSON.parse(res._getData());
    expect(json.message).toBe('Invalid input');
});
})