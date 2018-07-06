const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Cart = require('../db').Cart

route.post('/:id',(req, res) =>{
    var user_id = req.params.id
    console.log("uid = ")
    console.log(user_id)
    console.log("in get func() cart remove item = "+user_id)
            Cart.destroy({
                where :{
                    orderid:"order"+user_id
                },include:{
                    model:Product
                }
                        }).then((cart)=>{
                            res.send({status:1})
                                        })
                                })
exports = module.exports = route