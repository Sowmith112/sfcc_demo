"use strict";

var Transaction = require("dw/system/Transaction"); 
var ProductListMgr = require("dw/customer/ProductListMgr");
var ProductMgr = require("dw/catalog/ProductMgr");

function getRecentlyViewedProductList(customer, pid, type) { 
var list;
var apiProduct = ProductMgr.getProduct(pid); //pid of current product
list = ProductListMgr.getProductLists (customer, type);

if (list.empty == true) {

Transaction.wrap (function () {
list = ProductListMgr.createProductList(customer, type);
list.createProductItem(apiProduct);
});
return list;
}

function itemExists(list, pid) {
var found = false;

if (List[0].items.empty == false) {
var listItems = List[0].items.toArray();
listItems.forEach(function (item) { 
if (item.productID === pid) {
found = true; // product found true
Transaction.wrap (function(){
});
List[0].removeItem(item);
return found;
}
});
}
return found;
}


Transaction.wrap (function () {
if ((itemExists(list, pid)) == false) {
if (list[0].items.length == 5) {
var first=list[0].items[0];
list[0].removeItem(first);
var productlistItem = list[0].createProductItem(apiProduct);
}else{
    var productlistItem=list[0].createProductItem(apiProduct);
}
    } else {
    var productlistItem=list[0].createProductItem(apiProduct);
    };
    })
    return list[0];
    }

    function getRecentProductLits(customer, type) {
    var list = ProductListMgr.getProductLists (customer, type);
    if(list.empty == false){
     return list[0];
    }
    return null;
    }
    
    module.exports = {
    getRecentlyViewedProductList: getRecentlyViewedProductList,
    getRecentProductLits: getRecentProductLits
    
    };
