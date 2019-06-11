require('chromedriver');
var webdriver = require('selenium-webdriver');
var expect = require('chai').expect;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var By = webdriver.By;

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

    it("should search for 'Porsche'", function(done) {
        setTimeout(function() {
                return driver.findElement(By.id("input-search")).sendKeys("porsche")
                .then(function() {
                    return driver.findElement(By.xpath("//button[@data-uname='homepageHeadersearchsubmit']")).click()
                    .then(async function() {
                        await sleep(2000)
                        .then(function() {
                            return driver.getTitle()
                            .then(function(title) {
                                return expect(title).to.contain("porsche")
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

    it("should display 100 results", function(done) {
        setTimeout(function() {
            return driver.findElement(By.xpath("(//select[@name='serverSideDataTable_length'])[1]")).click()
            .then(function() {
                return driver.findElement(By.xpath("//select/option[@value='100']")).click()
                .then(async function() {
                    await sleep(3000);
                })
            })
            .then(function() {
                done();
            })
            .catch((err) => {
                done(err);
            });
        }, 3000)
    });

    it("should retrieve all the Porsche models and damage types", function(done) {
        setTimeout(function() {
            return driver.findElements(By.xpath("//span[@data-uname='lotsearchLotmodel']"))
            .then(function(elems) {
                var models = [];
                for (let i = 0; i < elems.length; i++) {
                    models.push(elems[i].getText());
                }
                return Promise.all(models)
                .then(function(modelArray) {
                    const modelSet = new Set(modelArray);
                    console.log("Porsche models found: " + modelSet.size);
                })
                .then(function() {
                    return driver.findElements(By.xpath("//span[@data-uname='lotsearchLotdamagedescription']"))
                    .then(function(elems) {
                        var damages = [];
                        for (let i = 0; i < elems.length; i++) {
                            damages.push(elems[i].getText());
                        }
                        return Promise.all(damages)
                        .then(function(damageArray) {
                            var rearEnd = 0;
                            var frontEnd = 0;
                            var minorDent = 0;
                            var undercarriage = 0;
                            var misc = 0;
                            for (x = 0; x < damageArray.length; x++) {
                                if (damageArray[x] == "REAR END") {
                                    rearEnd += 1;
                                } else if (damageArray[x] == "FRONT END") {
                                    frontEnd += 1;
                                } else if (damageArray[x] == "MINOR DENT/SCRATCHES") {
                                    minorDent += 1;
                                } else if (damageArray[x] == "UNDERCARRIAGE") {
                                    undercarriage += 1;
                                } else {
                                    misc += 1;
                                }
                            }
                            console.log("Rear end damage count: " + rearEnd);
                            console.log("Front end damage count: " + frontEnd);
                            console.log("Minor dent or scratch damage count: " + minorDent);
                            console.log("Undercarriage damage count: " + undercarriage);
                            console.log("MIscellaneous damage count: " + misc);
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
        }, 4000);
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

})