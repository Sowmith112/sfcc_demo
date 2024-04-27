'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Show', function (req, res, next) {
  var viewData = res.getViewData();
  var carousel_length = dw.system.Site.getCurrent().getCustomPreferenceValue('carousel');
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
    var remainingItems = list.items.size() - carousel_length;
    var i = 0;
    while (items.hasNext()) {
      i++;
      var pidObj = {
        pid: (items.next()).productID
      };
      recentProductArr = {
        ProductDetail: ProductFactory.get(pidObj)
      };
      if (i > remainingItems) {
        allproductDetails.push(recentProductArr.ProductDetail);
      }
    }
  }
  var allproductDetails = allproductDetails.reverse();
  viewData = {
    allProductDetails: allproductDetails
  };
  res.setViewData(viewData);
  next();
});

module.exports = server.exports();
