require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var By = webdriver.By;
var fs = require('fs');

describe("Challenge 5 Suite", function() {
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
                return driver.findElement(By.id("input-search")).sendKeys("nissan")
                .then(function() {
                    return driver.findElement(By.xpath("//button[@data-uname='homepageHeadersearchsubmit']")).click()
                    .then(async function() {
                        await sleep(2000)
                        .then(function() {
                            return driver.getTitle()
                            .then(function(title) {
                                return expect(title).to.contain("nissan")
                            })
                        })
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
            return driver.findElement(By.xpath("//a[@data-uname='ModelFilter']")).click()
            .then(function() {
                return driver.findElement(By.xpath("//div[@id='collapseinside4']//input[@placeholder='Search']")).sendKeys("Skyline")
                .then(function() {
                    return driver.findElement(By.xpath("//input[@type='checkbox' and @value='Skyline']")).click()
                })
            })
            .then(function() {
                done();
            })
            .catch((err) => {
                console.log("Nissan Skyline not found in search results, taking screenshot.");
                driver.takeScreenshot().then(function(data){
                    var base64Data = data.replace(/^data:image\/png;base64,/,"")
                    fs.writeFile("out.png", base64Data, 'base64', function(err) {
                        if(err) console.log(err);
                        done();
                    });
                });
                done(err);
            });
        }, 3000);
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

})