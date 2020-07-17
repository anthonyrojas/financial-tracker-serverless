const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const categoryTableName = process.env.CATEGORY_TABLE;

exports.deleteCategory = async (event) => {
    const {httpMethod, path, pathParameters} = event;
    if(httpMethod !== 'DELETE'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a DELETE method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const params = {
        TableName: categoryTableName,
        Key: {
            "id": pathParameters.id
        }
    };
    await docClient.delete(params).promise();
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
        },
        body: JSON.stringify({
            statusMessage: 'Category deleted.'
        })
    };
    console.log(`${httpMethod} ${path} response: ${response.statusCode} ${response.body}`);
    return response;
}