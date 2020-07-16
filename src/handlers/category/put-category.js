const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const categoryTableName = process.env.CATEGORY_TABLE;

exports.putCategory = async (event) => {
    const {body, httpMethod, path, pathParameters} = event;
    if(httpMethod !== 'PUT'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a PUT method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const { name, color, description } = JSON.parse(body);
    const params = {
        TableName: categoryTableName,
        Key: {
            "id": pathParameters.id
        },
        UpdateExpression: "set name=:n, color=:c, description=:d",
        ExpressionAttributeValues: {
            ":n": name,
            ":c": color,
            ":d": description
        },
        ReturnValues: "UPDATED_NEW"
    }
    const updated = await docClient.update(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(updated.$response.data)
    };
    console.log(`${httpMethod} ${path} response: ${response.statusCode} ${response.body}`);
    return response;
}