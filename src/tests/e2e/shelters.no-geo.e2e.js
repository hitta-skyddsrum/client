const { mockGeoLocationSuccess, mockGeoLocationError } = require('./helpers.js');

module.exports = {
  
  'Shelters: Get suggestion based on typed address' : function (browser) {
    let inputField = '.input-text';
    let searchBoxWithBouncer = '.search_box.showBouncer';
    
    browser
      .url(browser.launchUrl + '/skyddsrum');
    
    browser
      .waitForElementVisible(inputField, 2000)
      .waitForElementNotPresent(searchBoxWithBouncer, 10000);
    
    browser
      .setValue(inputField, 'Stockholmsvägen')
      .waitForElementVisible('.pac-container', 5000)
      .sendKeys(inputField, [browser.Keys.ARROW_DOWN, browser.Keys.ARROW_DOWN, browser.Keys.ENTER])
      .pause(500)
      .expect.element(searchBoxWithBouncer).to.be.present;
    
    browser
      .waitForElementNotPresent(searchBoxWithBouncer, 100000)
      .assert.urlContains('skyddsrum/');
    
    browser.end();
  },
};
