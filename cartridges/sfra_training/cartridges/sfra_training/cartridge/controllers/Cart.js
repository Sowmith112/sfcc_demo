'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
  var viewData = res.getViewData();
  var ProductFactory = require('*/cartridge/scripts/factories/product');
  var productListHelper = require('*/cartridge/scripts/helpers/recentProductHelper');
  var type = 100;
  var currentCustomer = req.currentCustomer.raw;
  var list = productListHelper.getRecentProductList(currentCustomer, type);
  var allproductDetails = [];
  if (list != null) {
    var items = (list.items);
    items = items.iterator();
    var recentProductArr = {};
    var ProductDetail;
    while (items.hasNext()) {
      var pidObj = {
        pid: (items.next()).productID
      };
      recentProductArr = {
        ProductDetail: ProductFactory.get(pidObj)
      };
      allproductDetails.push(recentProductArr.ProductDetail);
    }
  }
  var allproductDetails = allproductDetails.reverse();
  viewData = {
    allProductDetails: allproductDetails
  }
  res.setViewData(viewData);
  next();
});

module.exports = server.exports();
