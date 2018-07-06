const route = require('express').Router()
const Product = require('../db').Product
const User = require('../db').User


route.post('/', function (req, res) {
    //req.body.photo = req.body.filename;
    console.log("in post function add product")   
    console.log(  req.body) 
    //console.log(req.file)
    Product.create({
      name:req.body.name,
      authorName:req.body.authorName,
      image:req.body.image,
      condition:req.body.condition,
      actualPrice: parseFloat(req.body.actualPrice),
      resellPrice:parseFloat(req.body.resellPrice),
      //postedby:req.body.postedby
      }).then((product)=>{
        User.findOne({where:{id:req.body.postedby}}).then((users)=>{
                                                            console.log("userr = ")
                                                            console.log(users)
                                                            users.addProduct(product)
                                                                    })
                          })
     res.redirect('/')
                                    }) 
  route.get('/', function (req, res) {
    console.log("in get function add product")  
    res.redirect('/')
  }) 


exports = module.exports = route