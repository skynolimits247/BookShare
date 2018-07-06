const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Cart = require('../db').Cart
const Sequelize = require('sequelize')
const op = Sequelize.Op

route.get('/:id',(req, res) =>{
    var search_query = req.params.id
    console.log("in get func() cart get uid = "+search_query)
            Product.findAll({
                        where:
                        {
                            [op.or]: [{authorName:{[op.like]: '%'+search_query+'%'}}, {name:{[op.like]: '%'+search_query+'%'}}, {condition: search_query}]
                        },
                        include:{
                            model:User
                            
                        }
                        }).then(result => {
                            console.log("result = ")
                            console.log(result);
                            res.send(result)
                                          })
                                    })
route.get('/price/:id',(req, res) =>{
    var flag = req.params.id
    console.log("in get func() cart get min [price= "+flag)
    if(flag == 12){
        Product.findAll({
            order:Sequelize.literal('(resellPrice) DESC'),
            include:{
                model:User
                
            }
            }).then(result => {
                console.log("result = ")
                console.log(result[0]);
                res.send(result)
                                });
    }else{
        Product.findAll({
            order:Sequelize.literal('(resellPrice)'),
            include:{
                model:User
                
            }
            }).then(result => {
                console.log("result = ")
                console.log(result[0]);
                res.send(result)
                                });
    }
                                        })
route.get('/',(req, res) =>{
    console.log("in get func() cart get uid = ")
    Product.max('resellPrice').then((max) => {
                        Product.min('resellPrice').then((min) => {
                            console.log('min = '+min)
                            console.log('max = '+max)
                            res.json({min:min,max:max})
                        })
                                    })
                            })
exports = module.exports = route
// route.get('/price/:id/:id2',(req, res) =>{
//     var min_price = req.params.id
//     var max_price = req.params.id2
//     console.log("in get func() cart get min [price= "+min_price)
//     console.log("in get func() cart get max [price= "+max_price)
//             Product.findAll({
//                         where:
//                         {
//                          resellPrice :{[op.between]: [min_price,max_price] }
//                         },
//                         include:{
//                             model:User
                            
//                         }
//                         }).then(result => {
//                             console.log("result = ")
//                             console.log(result[0]);
//                             res.send(result)
//                                             });
//                                         })