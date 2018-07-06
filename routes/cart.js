const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Cart = require('../db').Cart
const Wishlist = require('../db').Wishlist
route.post('/:id/:id2',(req, res) =>{
    var pid = req.params.id
    var uid = req.params.id2
    console.log("in get func() cart pid = "+pid+"in get func() cart uid = "+uid)
    Cart.findOne({where:{orderid : "order"+uid,productkey:pid}}).then((cart)=>{
        if(cart == null){

            Wishlist.findOne({where:{orderid : "order"+uid,productkey:pid}}).then((wishlist)=>{
                if(wishlist == null){
                    console.log("duplicate not found..!!")
                    Cart.create({
                        orderid: "order"+uid,
                        productkey : pid
                    }).then((cart)=>{
                        User.findOne({where:{id:uid}}).then((users)=>{
                                    Product.findOne({where:{id:pid}}).then((products)=>{
                                    //console.log("products = ")
                                    // console.log(products)
                                    // console.log(cart)
                                    // console.log("cart = ")
                                    products.addCart(cart)
                                    //  console.log("userr = ")
                                    //  console.log(users)
                                     users.addCart(cart)})
                                                            })
                            })
                            res.json({status:1})
                }else{
                    Wishlist.destroy({where:{orderid : "order"+uid,productkey:pid}}).then((wishlist)=>{
                            console.log("duplicate not found..!!")
                            Cart.create({
                                orderid: "order"+uid,
                                productkey : pid
                            }).then((cart)=>{
                                User.findOne({where:{id:uid}}).then((users)=>{
                                            Product.findOne({where:{id:pid}}).then((products)=>{
                                            //console.log("products = ")
                                            // console.log(products)
                                            // console.log(cart)
                                            // console.log("cart = ")
                                            products.addCart(cart)
                                            //  console.log("userr = ")
                                            //  console.log(users)
                                             users.addCart(cart)})
                                                                    })
                                    })
                                    res.json({status:1})       
            })
            
        }
        
    })

        }else{
            console.log("duplicate found..!!")
            res.json({status:0})
        }
    })
})

route.get('/count/:id',(req, res) =>{
    var uid = req.params.id
    console.log("in get func() cart count uid = "+uid)
            Cart.findAndCountAll({
                where: {
                   orderid: "order"+uid
                },
             })
             .then(result => {
                 console.log("count = ")
               console.log(result.count);
               //console.log(result.rows);
               res.send(result)
             });
})

route.get('/get/:id',(req, res) =>{
    var uid = req.params.id
    console.log("in get func() cart get uid = "+uid)
            Cart.findAll({
                        where:
                        {
                            orderid:"order"+uid
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
                                    })
exports = module.exports = route