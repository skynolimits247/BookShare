const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User


route.post('/', function (req, res) {
    console.log("in post function add product")   
    console.log(  req.body) 
    Product.create({
      name:req.body.name,
      authorName:req.body.authorName,
      image:req.body.image,
      condition:req.body.condition,
      actualPrice: parseFloat(req.body.actualPrice),
      resellPrice:parseFloat(req.body.resellPrice),
      }).then((product)=>{
        User.findOne({where:{id:req.body.postedby}}).then((users)=>{
                                                            //console.log("userr = ")
                                                            //console.log(users)
                                                            users.addProduct(product)
                                                                    })
                          })
      res.send({status:1})
                                    }) 
  route.get('/', function (req, res) {
    console.log("in get function add product")  
    return res.send({status:1})
  }) 


exports = module.exports = route