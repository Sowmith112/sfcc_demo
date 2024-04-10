'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');


server.get('Show', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentBasket();

    res.render('basket', {
        basket: currentBasket
    });

    next();
});

module.exports = server.exports();
