const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const categoryTableName = process.env.CATEGORY_TABLE;

exports.getCategory = async (event) => {
    const {httpMethod, path, pathParameters} = event;
    if(httpMethod !== 'GET'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a GET method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const {id} = pathParameters;
    const params = {
        TableName: categoryTableName,
        Key: {
            id
        }
    }

    const { Item } = await docClient.get(params).promise();
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        body: JSON.stringify(Item)
    };
    console.log(`${httpMethod} ${path} response: ${response.statusCode} ${response.body}`);
    return response;
}