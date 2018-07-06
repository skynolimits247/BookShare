const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User
const Wishlist = require('../db').Wishlist
const Cart = require('../db').Cart

route.post('/:id/:id2',(req, res) =>{
    var pid = req.params.id
    var uid = req.params.id2
    console.log("in get func() Wishlist pid = "+pid+"in get func() Wishlist uid = "+uid)
    Wishlist.findOne({where:{orderid : "order"+uid,productkey:pid}}).then((wishlist)=>{
        console.log("wishlist = ")
        console.log(wishlist)
        if(wishlist == null){
            Cart.findOne({where:{orderid : "order"+uid,productkey:pid}}).then((cart)=>{
                console.log("cart = ")
                console.log(cart)
                if(cart == null){
                    console.log("duplicate not found..!!")
                    Wishlist.create({
                        orderid: "order"+uid,
                        productkey : pid
                    }).then((Wishlist)=>{
                        User.findOne({where:{id:uid}}).then((users)=>{
                                    Product.findOne({where:{id:pid}}).then((products)=>{
                                    //console.log("products = ")
                                    // console.log(products)
                                    // console.log(Wishlist)
                                    // console.log("Wishlist = ")
                                    products.addWishlist(Wishlist)
                                    //  console.log("userr = ")
                                    //  console.log(users)
                                     users.addWishlist(Wishlist)})
                                                            })
                            })
                            res.json({status:1})
                }else{
                    console.log("duplicate found..!!")
                    res.json({status:2})
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
    console.log("in get func() Wishlist count uid = "+uid)
            Wishlist.findAndCountAll({
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
    console.log("in get func() Wishlist get uid = "+uid)
            Wishlist.findAll({
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