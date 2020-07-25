const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const expenseEntryTableName = process.env.EXPENSE_ENTRY_TABLE;

exports.putExpenseEntry = async (event) => {
    const {body, httpMethod, path, pathParameters} = event;
    if(httpMethod !== 'PUT'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a PUT method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const {categoryId, expenseDate, note, amount, business, location} = JSON.parse(body);
    const params = {
        TableName: expenseEntryTableName,
        Key: {
            "id": pathParameters.id
        },
        UpdateExpression: "set categoryId=:c, expenseDate=:e, note=:n,amount=:a, business=:b, location=:l",
        ExpressionAttributes: {
            ":c": categoryId,
            ":e": expenseDate,
            ":n": note,
            ":a": amount,
            ":b": business,
            ":l": location
        },
        ReturnValues: "UPDATED_NEW"
    };
    const updated = await docClient.update(params).promise();
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updated.$response.data)
    };
    console.log(`${httpMethod} ${path} response: ${response.statusCode} ${response.body}`);
    return response;
}