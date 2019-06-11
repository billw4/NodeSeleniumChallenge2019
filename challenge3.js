require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var By = webdriver.By;

describe("Challenge 3 Suite", function() {
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

    it("should get the list of popular makes and model names and links", function(done) {
        driver.findElements(By.xpath("//div[@ng-if='popularSearches']//a"))
        .then(function(elems) {
            var cars = [];
            var links = [];
            for (let i = 0; i < elems.length; i++) {
                cars.push(elems[i].getText());
                links.push(elems[i].getAttribute('href'));
            }
            return Promise.all([Promise.all(cars), Promise.all(links)]);
        })
        .then(function(results) {
            for (let x = 0; x < results[0].length; x++) {
                console.log(results[0][x] + " - " + results[1][x]) ;
            }
            done();
        })
        .catch(err => {
            done(err);
        })
    });

});