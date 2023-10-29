const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
    return bcrypt.hashSync(password)
}

const checkPassword = (password, hashed) => {
    return bcrypt.compareSync(password, hashed)
}

module.exports = {
    hashPassword,
    checkPassword
}