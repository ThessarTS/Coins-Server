const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models/index')

class UserController {
    static async register(req, res, next) {
        try {
            let { username, email, password } = req.body
            let newUser = await User.create({ username, email, password })
            res.status(201).json({ id: newUser.id, email: newUser.email })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) {
                throw { name: 'blankEmail' }
            }
            if (!password) {
                throw { name: 'blankPass' }
            }
            let user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'invalidEmailPass' }
            }
            let isValidPass = checkPassword(password, user.password)
            if (!isValidPass) {
                throw { name: 'invalidEmailPass' }
            }
            const access_token = signToken({ id: user.id })
            res.json({ access_token, username: user.username })
        } catch (error) {
            next(error)
        }
    }

    static async findUser(req, res, next) {
        try {
            res.json({ username: req.user.username })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController