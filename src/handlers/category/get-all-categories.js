const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const categoryTableName = process.env.CATEGORY_TABLE;

exports.getAllCategories = async (event) => {
    const {httpMethod, path} = event;
    if(httpMethod !== 'GET'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a GET method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const params = {
        TableName: categoryTableName
    };
    const {Items} = await docClient.scan(params).promise();

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        body: JSON.stringify(Items)
    }
    console.log(`${httpMethod} ${path} response: ${response.statusCode} ${response.body}`);
    return response;
}