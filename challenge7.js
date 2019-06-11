require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var By = webdriver.By;

describe("Challenge 7 Suite", function() {
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

    it("should open the Copart website", function(done) {
        driver.get("https://www.copart.com/");
        setTimeout(function() {
            driver.getTitle().then(function(title) {
                console.log("Title: " + title);
                expect(title).to.contain('Auto Auction');
                done();
            })
            .catch(err => {
                done(err);
            })
        }, 2000);
    });

    it("should validate the URLs to popular MAKES", function(done) {
        this.timeout(100000);
        setTimeout(function() {
            driver.findElements(By.xpath("//div[@ng-if='popularSearches']//a[contains(@href,'make')]"))
            .then(function(elems) {
                var makes = [];
                var makeLinks = [];
                for (let i = 0; i < elems.length; i++) {
                    makes.push(elems[i].getText());
                    makeLinks.push(elems[i].getAttribute('href'));
                }
                return Promise.all([Promise.all(makes), Promise.all(makeLinks)])
            })
            .then(async function(makeResults) {
                for (let i = 0; i < makeResults[0].length; i++) {
                   await navigateToUrl(makeResults[1][i], "for " + makeResults[0][i].toLowerCase());
                }
                done();
            })
            .catch(err => {
                done(err);
            })
        }, 3000);
    });
    
    it("should validate the URLs to popular MODELS", function(done) {
        this.timeout(100000);
        setTimeout(function() {
            driver.get("https://www.copart.com/");
            driver.findElements(By.xpath("//div[@ng-if='popularSearches']//a[contains(@href,'model')]"))
            .then(function(elems) {
                var models = [];
                var modelLinks = [];
                for (let i = 0; i < elems.length; i++) {
                    models.push(elems[i].getText());
                    modelLinks.push(elems[i].getAttribute('href'));
                }
                return Promise.all([Promise.all(models), Promise.all(modelLinks)])
            })
            .then(async function(modelResults) {
                for (let i = 0; i < modelResults[0].length; i++) {
                   await navigateToUrl(modelResults[1][i], "for " + modelResults[0][i].toLowerCase());
                }
                done();
            })
            .catch(err => {
                done(err);
            })
        }, 5000);
    });

    async function navigateToUrl(url, validation) {
        driver.get(url);
        sleep(2000);
        var valText = await driver.findElement(By.xpath("//span[@ng-if='searchText']")).getText();
        if (valText.includes(validation)) {
            console.log("URL, " + url + ", validated successfully.");
            return true;
        } else {
            console.log("URL, " + url + ", failed validation.");
            return false;
        }
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

});
