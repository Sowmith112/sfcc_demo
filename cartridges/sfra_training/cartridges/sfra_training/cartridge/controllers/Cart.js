"use strict";

var server = require("server"); 
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var viewData = res.getViewData();
    var ProductFactory = require("*/cartridge/scripts/factories/product");
    var productListHelper = require("*/cartridge/scripts/helpers/recentProductHelper");
    var type = 100;
    var currentCustomer = req.currentCustomer.raw;
    var list =  productListHelper.getRecentlyViewedProductList(currentCustomer, type);
    var allProductDetails= [];

    if (list != null) {
        var items = list.items.iterator();
        while (items.hasNext()) {
            var product = items.next();
            var pidsObj = {
                pid: product.productID
            };
            var ProductDetail = ProductFactory.get(pidsObj);
            allProductDetails.push(ProductDetail);
        }
    }

    allProductDetails = allProductDetails.reverse();

    res.render('cart/cart', {
        allProductDetails: allProductDetails
    });
    next();
});

module.exports = server.exports();
