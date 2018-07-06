const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Cart = require('../db').Cart

route.post('/:id/:id2',(req, res) =>{
    var cart_id = req.params.id
    var user_id = req.params.id2
    console.log("uid = ")
    console.log(user_id)
    console.log("in get func() cart remove item = "+user_id)
            Cart.destroy({
                where: {
                   id: cart_id
                        },
                        }).then(result => {
                                            Cart.findAll({
                                                where:
                                                {
                                                    orderid:"order"+user_id
                                                },
                                                include:[{
                                                    model:User
                                                    
                                                },{
                                                    model:Product
                                                }]
                                                        }).then(result => {
                                                            console.log("result = ")
                                                            console.log(result[0]);
                                                            res.send(result)
                                                                          });
                                          });
                                    })
exports = module.exports = route