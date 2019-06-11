require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var By = webdriver.By;

describe("Challenge 2 Suite", function() {
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
            }).catch(err => {
                done(err);
            })
        }, 5000);
    });

    it("should search for exotic cars", function(done) {
        setTimeout(function() {
            var exoticsLink = driver.findElement(By.xpath("//a[text()='Exotics']"))
            exoticsLink.click();
            done();        
        }, 2000);
    });

    it("should retrieve a list of exotic cars", function(done) {
        setTimeout(function() {
            driver.findElements(By.xpath("//span[@data-uname='lotsearchLotmake']"))
            .then(function(elems) {
                var cars = [];
                for (let i = 0; i < elems.length; i++) {
                    cars.push(elems[i].getText());
                }
                return Promise.all(cars);
            })
            .then(function(resolvedList) {
                for (let x = 0; x < resolvedList.length; x++) {
                    console.log(resolvedList[x]);
                }
                expect(resolvedList).to.include('PORSCHE');
                done();
            })
            .catch(err => {
                done(err);
            });
        }, 2000);
    });


})