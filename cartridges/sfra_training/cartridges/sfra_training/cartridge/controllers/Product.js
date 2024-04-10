"use strict";
var page = module.superModule;
var server = require("server");

server.extend(page);
 server.append("Show", function (req, res, next){   
    var recentProductHelper= require("*/cartridge/scripts/helpers/recentProductHelper");
    var currentCustomer=req.currentCustomer.raw;
    var pid=req.querystring.pid;
var config ={
    qty: 1,
    type: 100,
};
var productList= recentProductHelper.getRecentlyViewedProductList( 
        currentCustomer,
        pid,
        config.type
);
var listProducts = productList.items.iterator(); 
var URLUtils = require("dw/web/URLUtils"); 
res.setViewData({listProducts:listProducts});
next();

});
module.exports = server.exports();