module.exports = {
  'Home page' : function (browser) {
    let button = '.mat-sidenav-content a.button';
    browser
      .url(browser.launchUrl)
      .waitForElementVisible(button, 1000)
      .click(button)
      .assert.urlContains('skyddsrum')
      .end();
  }
};
