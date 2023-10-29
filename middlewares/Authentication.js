const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        if (!access_token) {
            throw { name: 'invalidToken' }
        }
        let payload = await verifyToken(access_token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: 'invalidToken' }
        }
        req.user = { id: user.id, email: user.email, username: user.username }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication