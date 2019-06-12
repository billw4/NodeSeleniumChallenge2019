require('chromedriver');
var webdriver = require('selenium-webdriver');
var chai = require('chai');

describe("Challenge 8 Suite", function() {
    this.timeout(20000);
    let driver;

    before(function () {
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .forBrowser('chrome')
        .build();
    });

    after(function (done) {
        driver.quit();
        done();
    });

    it("should get website cookies", function(done) {
        this.timeout(200000);
        driver.get('https://www.copart.com/');
        driver.manage().getCookies().then(function(cookies) {
            console.log(cookies);
        }); 
    });

})