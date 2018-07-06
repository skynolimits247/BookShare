const route = require('express').Router()
const Product = require('../db').Product
//route.use('/login',require('./login'))






route.get('/',(req, res) =>{
        Product.findAll().then((products)=>{
                res.send(products)}).catch((products)=>{
                                        res.send(products)
                                                        })
                            })
exports = module.exports = route