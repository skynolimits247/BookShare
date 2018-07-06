const route = require('express').Router();


route.get('/', (req, res) => {
        console.log('in logout')
        req.session.destroy();
        res.redirect('/')

});


exports = module.exports = route