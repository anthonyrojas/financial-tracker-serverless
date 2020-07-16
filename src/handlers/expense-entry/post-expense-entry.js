const dynamodb = require('aws-sdk/clients/dynamodb');
const {v4: uuidv4} = require('uuid');
const docClient = new dynamodb.DocumentClient();
const expenseEntryTableName = process.env.EXPENSE_ENTRY_TABLE;

exports.postExpenseEntry = async (event) => {
    const {body, httpMethod, path} = event;
    if(httpMethod !== 'POST'){
        throw new Error(`Invalid http method. You tried a ${httpMethod} method when you must use a POST method.`);
    }
    console.log('received: ', JSON.stringify(event));
    const {categoryId, expenseDate, note, amount, business, location} = JSON.parse(body);
    const params = {
        TableName: expenseEntryTableName,
        Item: {
            id: uuidv4(),
            categoryId,
            expenseDate,
            note,
            amount,
            business,
            location
        }
    };
    const saved = await docClient.put(params).promise();
    const response = {
        statusCode: 200,
        body: saved.$response.data
    };
    console.log(`${httpMethod} ${path}: ${response.statusCode} ${response.body}`);
    return response;
}