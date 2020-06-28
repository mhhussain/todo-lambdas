
exports.successResponseFormatter = (d) => {
    return {
        'statusCode': 200,
        'isBase64Encoded': false,
        'body': JSON.stringify(d)
    };
}
