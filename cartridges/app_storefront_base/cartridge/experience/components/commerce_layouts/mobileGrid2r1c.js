'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the storefront layout 2 Row x 1 Col (Mobile) 1 Row x 2 Col (Desktop).
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/commerce_layouts/mobileGrid2r1c').render(model).text;
};