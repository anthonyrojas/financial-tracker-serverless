// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');
const lambda = require('../../../src/handlers/category/get-category');

// This includes all tests for getCategory
describe('Test getCategory', () => {
    let getSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB get method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    // Clean up mocks
    afterAll(() => {
        getSpy.mockRestore();
    });

    it('should get category by id', async () => {
        const item = { id: 'id1' };

        // Return the specified value whenever the spied get function is called
        getSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: item }),
        });

        const event = {
            httpMethod: 'GET',
            pathParameters: {
                id: 'id1',
            },
        };

        // Invoke getByIdHandler
        const result = await lambda.getCategory(event);

        const expectedResult = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
            },
            body: JSON.stringify(item),
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});