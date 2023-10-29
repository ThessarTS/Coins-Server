function errorHandler(err, req, res, next) {
    let stat = 500
    let message = 'Internal server error'

    console.log(err);

    if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        stat = 400
        message = err.errors[0].message
    }
    else if (err.name == 'blankEmail') {
        stat = 400
        message = 'Email required'
    }
    else if (err.name == 'blankPass') {
        stat = 400
        message = 'Password required'
    }
    else if (err.name == 'invalidEmailPass') {
        stat = 401
        message = 'Invalid Email / Password'
    }
    else if (err.name == 'invalidToken' || err.name == 'JsonWebTokenError') {
        stat = 401
        message = 'Invalid token'
    }
    else if (err.name == 'MidtransError') {
        stat = err.httpStatusCode
        message = err.ApiResponse.error_messages[0]
    }

    res.status(stat).json({ message })
}

module.exports = errorHandler