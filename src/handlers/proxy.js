exports.handler = function(event, context, callback) {
    callback(null, {
        statusCode: '200',
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE'
        }
    });
}
