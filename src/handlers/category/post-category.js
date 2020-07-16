const dynamodb = require('aws-sdk/clients/dynamodb');
const {v4: uuidv4 } = require('uuid');
const docClient = new dynamodb.DocumentClient();
const categoryTableName = process.env.CATEGORY_TABLE;

exports.postCategory = async (event) => {
    const {body, httpMethod, path} = event;
    if(httpMethod !== 'POST'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a POST method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const {name, color, description} = JSON.parse(body);
    const params = {
        TableName: categoryTableName,
        Item: {
            id: uuidv4(),
            name,
            color,
            description
        },
        ReturnValues: "ALL_NEW"
    };
    const saved = await docClient.put(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
    }
    console.log(`${httpMethod} ${path}: ${response.statusCode} ${response.body}`);
    return response;
}