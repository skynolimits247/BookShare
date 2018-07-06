const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Cart = require('../db').Cart
const Message = require('../db').Message
const Sequelize = require('sequelize')
const op = Sequelize.Op

route.post('/',(req, res) =>{
    console.log("in post func() message = ")
    console.log(req.body)
    
    Message.create({
        text:req.body.text,
        productkey : req.body.productkey
    }).then((message)=>{
        User.findOne({where:{id:req.body.postedby}}).then((users)=>{
                    Product.findOne({where:{id:req.body.productkey}}).then((products)=>{
                    console.log("products = ")
                     console.log(products)
                     console.log(users)
                     console.log("cart = ")
                     products.addMessage(message)
                    //  console.log("userr = ")
                    //  console.log(users)
                     users.addMessage(message)})
                                            })
            })
           res.send({status:0})
})
route.get('/:id',(req, res) =>{
    var pid = req.params.id
    console.log("in get message  func() pid = "+pid)
            Message.findAll({
                order:Sequelize.literal('(message.createdAt) DESC'),
                //order:Sequelize.literal('message.createdAt DESC'),
                where:{productkey:pid},
                include:[{
                    model:User
                    
                },{
                    model:Product
                }]
            }).then(result => {
                        console.log("count = ")
                        console.log(result);
                        console.log(result.rows);
                        res.send(result)
                                          });
                            })
exports = module.exports = route