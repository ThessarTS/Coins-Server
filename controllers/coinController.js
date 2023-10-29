const axios = require('axios')
const { MyCoin } = require('../models/index')

class CoinController {
    static async getAllAssets(req, res, next) {
        try {
            let { data } = await axios({
                method: 'GET',
                url: 'https://api.coincap.io/v2/assets'
            })
            let assets = data.data
            assets.forEach(el => {
                el.icon = `https://assets.coincap.io/assets/icons/${el.symbol.toLowerCase()}@2x.png`
                el.changePercent24Hr = Number(el.changePercent24Hr).toFixed(2)
                el.priceIdr = Math.round(el.priceUsd * 15508)
            });
            res.json(assets)
        } catch (error) {
            next(error)
        }
    }

    static async addToMyCoins(req, res, next) {
        try {
            let { name, symbol, quantity, price, icon } = req.body
            let myNewCoin = await MyCoin.create({ name, symbol, quantity, price, icon, UserId: req.user.id })
            res.status(201).json(myNewCoin)
        } catch (error) {
            next(error)
        }
    }

    static async getAllMyCoins(req, res, next) {
        try {
            let myCoins = await MyCoin.findAll({ where: { UserId: req.user.id }, order: [['createdAt', 'Desc']] })
            res.json(myCoins)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CoinController