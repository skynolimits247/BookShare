const route = require('express').Router()
const Product = require('../db').Product
//route.use('/login',require('./login'))






route.get('/',(req, res) =>{
   console.log("in get func() list")
        Product.findAll().then((products)=>{
                console.log("in product find success then")
                res.send(products)}).catch((products)=>{
                                        console.log("in catch")
                                        res.send(products)
                                                        })
                            })
exports = module.exports = route