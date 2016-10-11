'use strict';

import { assert } from 'chai';
import * as productDetailPage from '../../mocks/testDataMgr/pageObjects/productDetail';
import * as testDataMgr from '../../mocks/testDataMgr/main';
import * as cartPage from '../../mocks/testDataMgr/pageObjects/cart';


describe('Product Details - Product Item', () => {
    const variantId = '708141676190';
    const expectedPrimaryImage = 'PG.15J0037EJ.WHITEFB.PZ.jpg';
    const expectedSecondaryImage = 'PG.15J0037EJ.WHITEFB.BZ.jpg';
    const nextButton = '.right.carousel-control .icon-next';
    const elementPrimaryImage = '.carousel-item.active .img-fluid';
    const elementImage = '.img-fluid';


    before(() => {
        // TODO: should empty Cart before test starts
        var variant = testDataMgr.getProductById(variantId);
        return browser.url(variant.getUrlResourcePath());
    });

    after(() => {
        return cartPage.navigateTo()
            .then(() => cartPage.emptyCart());
    });

    it('should display its product ID', () => {
        return browser.getText('.product-id')
            .then(itemNumber => {
                return assert.equal(itemNumber, variantId);
            });
    });

    it('should display its product name', () => {
        return browser.waitUntil(() => browser.element(productDetailPage.PRODUCT_NAME))
            .then(() => browser.getHTML(productDetailPage.PRODUCT_NAME))
            .then(name => assert.include(name, 'No-Iron Textured Dress Shirt'));
    });

    it('should display its product image', () => {
        return browser.isExisting(elementImage)
            .then(exists => assert.isTrue(exists));
    });

    it('should display the default variant primary image', () => {
        return browser.element(elementPrimaryImage)
            .then(el => browser.elementIdAttribute(el.value.ELEMENT, 'src'))
            .then(displayedImgSrc => assert.isTrue(displayedImgSrc.value.endsWith(expectedPrimaryImage)));
    });

    it('should display the secondary default variant primary image after click', () => {
        return browser.element(nextButton)
            .click()
            .waitForVisible(elementImage, 1000, true)
            .then(() => browser.element(elementPrimaryImage))
            .then(el => browser.elementIdAttribute(el.value.ELEMENT, 'src'))
            .then(displayedImgSrc => assert.isTrue(displayedImgSrc.value.endsWith(expectedSecondaryImage)));
    });

    it('should enable the "Add to Cart" button', () => {
        return browser.isEnabled('.add-to-cart')
            .then(enabled => assert.isTrue(enabled));
    });

    it('should add product to Cart', () => {
        return browser.element('.add-to-cart')
            .click()
            .waitForVisible(productDetailPage.MINI_CART)
            .then(() => browser.getText('.minicart-quantity'))
            .then(quantity => assert.equal(quantity, '1'));
    });
});