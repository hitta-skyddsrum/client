const { mockGeoLocationSuccess, mockGeoLocationError } = require('./helpers.js');

module.exports = {
  'Shelters: Suggest address from geolocation' : function (browser) {
    let inputField = '.input-text';
    let searchBoxWithBouncer = '.search_box.showBouncer';

    browser
      .execute(mockGeoLocationSuccess(59.0025792, 17.756750900000043))
      .url(browser.launchUrl + '/skyddsrum');

    browser
      .waitForElementVisible(inputField, 1000)
      .waitForElementNotPresent(searchBoxWithBouncer, 10000)
      .pause(500)
      .waitForElementNotPresent(searchBoxWithBouncer, 10000)
    
    browser
      .expect.element(inputField).to.have.value.which.contains('Lövängs');
    
    browser
      .pause(200)
      .sendKeys(inputField, [browser.Keys.ARROW_DOWN, browser.Keys.ENTER]);
    
    browser
      .pause(500)
      .expect.element(searchBoxWithBouncer).to.be.present;
    
    browser
      .waitForElementNotPresent(searchBoxWithBouncer, 100000)
      .assert.urlContains('skyddsrum/');
    
    browser.end();
  },
};
