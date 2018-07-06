const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Cart = require('../db').Cart

route.post('/:id/:id2',(req, res) =>{
    var id = req.params.id
    var user_id = req.params.id2
    console.log("uid = ")
    console.log(user_id)
    console.log("in get func() cart remove item = "+user_id)
            Product.destroy({
                where: {
                   id: id
                        }
                            }).then(re=>{
                                    Cart.destroy({
                                        where:{
                                            productkey:id
                                              }
                                                })
                                        }).then(result => {
                                            Product.findAll({
                                                include:[{model:User }]
                                                            }).then(result => {
                                                                console.log("result = ")
                                                                console.log(result[0]);
                                                                res.send(result)
                                                                              });
                                                        });
                                     })
exports = module.exports = route