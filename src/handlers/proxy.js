exports.handler = async(event) => {
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,HEAD,POST,GET,PUT,DELETE',
            'Content-Type': 'application/json'
        }
    }
    return response;
}
