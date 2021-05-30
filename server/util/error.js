
const error = {
    'ER001' : 'No information provided in request , Please enter basic user details to register',
    'ER002' : 'This email id is already registered , please sign up with a new email id',
    'ER003' : 'this mobile number is already present , please sign up with new mobile number',
    'ER004' : 'This loginId is already taken please try a new one',
    'ER005' : 'Please enter loginId/emailId and password',
    'ER006' : 'Incorrect Login Id',
    'ER007' : 'Incorrect Password',
    'ER008' : 'User Not Logged In . Please login',
    'ER009' : 'error occured',
    'ER010' : 'No information provided in request, Please enter product details',
    'ER011' : 'No product found with this ID',
    'ER012' : 'No information provided in request',
    'ER013' : 'No items present in the cart. Please add books',
    'ER014' : 'Signature validation failed',
    'ER015' : 'Missing razorpay payment id or signature'
}

function getError(errorCode){
    return {
        errorCode : errorCode,
        message : error[errorCode],
        status : 'FAILED'
    }
}

module.exports.getError = getError;