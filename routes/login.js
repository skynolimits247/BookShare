const route = require('express').Router()
const User = require('../db').User

route.post('/',(req, res) =>{
    console.log("in post login")
    console.log(req.body)
    User.findOne({
        where:{
            email:req.body.email,
              }
                }).then((users)=>{
                     res.status(200).send(users)
                                 }).catch((err)=>{
                                        res.send('')
                                                 })
                            })

route.get('/:id',(req, res) =>{
    console.log("in get user by id")
    var pid = req.params.id
    console.log("in get func() /list id = "+pid)
         User.findAll({where:{id:pid}}).then((users)=>{
                                            res.send(users)
                                        }).catch((users)=>{
                                            console.log("in catch")
                                            res.send(users)
                                                          })
                             })
exports = module.exports = route