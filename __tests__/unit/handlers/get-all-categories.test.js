// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from get-by-id.js
const lambda = require('../../../src/handlers/category/get-all-categories');

describe('Test getAllCategories', () => {
    let getSpy;
    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB scan method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        scanSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'scan');
    });

    // Clean up mocks
    afterAll(() => {
        scanSpy.mockRestore();
    });

    // This test invokes getCategoriesHandler and compares the result
    it('should return ids', async () => {
        const items = [{ id: 'id1' }, { id: 'id2' }];

        // Return the specified value whenever the spied scan function is called
        scanSpy.mockReturnValue({
            promise: () => Promise.resolve({ Items: items }),
        });

        const event = {
            httpMethod: 'GET',
        };

        // Invoke getAllItemsHandler
        const result = await lambda.getAllCategories(event);

        const expectedResult = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            body: JSON.stringify(items),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
})