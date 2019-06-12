require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var By = webdriver.By;
var Base = require('./base.js');

describe("Challenge 5 Suite", function() {
    this.timeout(20000);
    let driver;

    before(function () {
        driver = Base.getDriver();
        driver.manage().window().maximize();
    });

    after(function(done) {
        driver.quit();
        done();
    });

    it("should open the Copart website", function(done) {
        driver.get("https://www.copart.com/");
        setTimeout(function() {
            driver.getTitle().then(function(title) {
                console.log("Title: " + title);
                expect(title).to.contain('Auto Auction');
            })
            .then(function() {
                done();
            })
            .catch(err => {
                done(err);
            });
        }, 1000);
    });

    it("should search for 'Nissan'", function(done) {
        setTimeout(function() {
            Base.searchFor('nissan', driver.findElement(By.id("input-search")));
            driver.findElement(By.xpath("//button[@data-uname='homepageHeadersearchsubmit']")).click()
            Base.sleep(2000)
            .then(function() {
                driver.getTitle()
                .then(function(title) {
                    expect(title).to.contain("nissan")
                })
            })
            .then(function() {
                done();
            })
            .catch((err) => {
                done(err);
            });
        }, 2000);
    });

    it("should search for the Nissan Skyline", function(done) {
        setTimeout(function() {
            driver.findElement(By.xpath("//a[@data-uname='ModelFilter']")).click();
            Base.sleep(2000)
            .then(function() {
                 Base.searchFor('Skyline', driver.findElement(By.xpath("//div[@id='collapseinside4']//input[@placeholder='Search']")));
                return driver.findElement(By.xpath("//input[@type='checkbox' and @value='Skyline']")).click();
            })
            .then(function() {
                done();
            })
            .catch((err) => {
                console.log("Nissan Skyline not found in search results, taking screenshot.");
                driver.takeScreenshot()
                .then(function(data) {
                    Base.saveScreenshot(data, 'searchFail.png');
                })
                done(err);
            });
        }, 4000);
    });

})