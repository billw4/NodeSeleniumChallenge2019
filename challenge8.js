require('chromedriver');
var WebServices = require('./WebServices.js');
var request = require('request');
var Cookie = require('request-cookies').Cookie;
var https = require('https');
var DriverInit = require('./DriverInit.js');

describe("Test", function() {
    this.timeout(20000);
    let driver;

    before(function () {
        driver = DriverInit.getDriver();
        webServices = new WebServices();
    });

    // after(function (done) {
    //     driver.quit();
    //     done();
    // });

    it("should send a search request", function() {
        var url = 'https://www.copart.com/public/lots/search';
        var data = {"query": "toyota camry"};
        var cookieMap = new Map();
        driver.get('https://www.copart.com')
        .then(async function() {
            await driver.manage().getCookies()
            .then(async function(cookies) {
                await console.log(cookies);
                for (var i in cookies) {
                    cookieMap.set(cookies[i].name, cookies[i].value)
                }
                return Promise.all(cookieMap)
                .then(function(map) {
                    var headers = {
                        'Content-Type' : 'application/x-www-form-urlencoded',
                        'Cookie' : map
                    }
                    request.post({url:url, data:data, headers:headers}, function(e, r, body){
                        console.log(r.toJSON());
                    });
                    
                })
            })
        })
       

        
    
        
        // webServices.getCookies(url)
        // .then(function(response) {
        //     var cookie;
        //     var cookies = new Map();
        //     var cookieArray = []; 
        //     for (var i in response) {
        //         cookie = new Cookie(response[i]);
        //         cookieArray.push(cookie);
        //         cookies.set(cookie.key, cookie.value);
        //     }
        //     for (let [k,v] of cookies) {
        //         console.log(`Key: ${k}, Value: ${v}`);
        //     }
        //     console.log(response)

            // var rez = request.post({url:url, data:data, cookies:cookies});
            // console.log(rez.toJSON())

        //     var options = {
        //         hostname: 'www.copart.com',
        //         body: data,
        //         port: 443,
        //         path: '/public/lots/search',
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Cookie': "userLang=en; _ga=GA1.2.1940163285.1555107387; copartTimezonePref=%7B%22displayStr%22%3A%22MDT%22%2C%22offset%22%3A-6%2C%22dst%22%3Atrue%2C%22windowsTz%22%3A%22America%2FDenver%22%7D; timezone=America%2FDenver; s_fid=17ED1DEE75266771-0795BDAA64C1A0CD; s_cc=true; s_vi=[CS]v1|2E58871D850336FB-60001191800029FD[CE]; _fbp=fb.1.1555107390261.634423510; __cfduid=dbedff2264dafa4377e0d427cc37372a31555368932; g2app.searchResultsPageLength=100; incap_ses_1182_242093=mioJbgaySAZA10zIyk5nEAMPBF0AAAAAaHKxJUwaAzUbl8m4y6NuYw==; incap_ses_444_242093=R5tSAqa8H2pYuxm3AGkpBv5QCF0AAAAAInZX+XP89Wybr0sL5WHoNg==; visid_incap_242093=fyeuNjaQQh6zfK/sPxBUKjcOsVwAAAAAQkIPAAAAAACASPCMAWLKCfqxUGNN2Rte7KF/9Ze9tbWn; g2usersessionid=c901d8adfa52c9b09d14dc2739a50a69; G2JSESSIONID=BF655359420DEAFE74E8FD3CA3A65FA7-n1; incap_ses_209_242093=qo57ANZM2w9qJZ33pYbmAre2C10AAAAAfJrlQDk64A/0BnihC/P2TQ==; g2app.locationInfo=%7B%22countryCode%22%3A%22USA%22%2C%22countryName%22%3A%22United%20States%22%2C%22stateName%22%3A%22Utah%22%2C%22stateCode%22%3A%22UT%22%2C%22cityName%22%3A%22Salt%20Lake%20City%22%2C%22latitude%22%3A40.7761%2C%22longitude%22%3A-111.8899%2C%22zipCode%22%3A%2284114%22%2C%22timeZone%22%3A%22-06%3A00%22%7D; _gid=GA1.2.1979654323.1561048763; incap_ses_978_242093=e6gKG6fo5FlXzkXAmY6SDVUIDF0AAAAAW/XZtrdurx3Y+urcE4rzng==; s_depth=1; s_pv=public%3Ahomepage; s_vnum=1562608108362%26vn%3D14; s_invisit=true; s_lv_s=Less%20than%201%20day; _gat=1; s_ppvl=public%253Ahomepage%2C32%2C32%2C938%2C1201%2C937%2C1920%2C1080%2C1%2CP; s_nr=1561069667639-Repeat; s_lv=1561069667643; s_sq=copart-g2-us-prod%3D%2526c.%2526a.%2526activitymap.%2526page%253Dpublic%25253Ahomepage%2526link%253D%25252Fimages%25252Ficons%25252Ficon_Search_Desktop.svg%2526region%253Dsearch-form%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253Dpublic%25253Ahomepage%2526pidt%253D1%2526oid%253D%25250A%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%25250A%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%252520%2526oidt%253D3%2526ot%253DSUBMIT; s_ppv=public%253Ahomepage%2C77%2C29%2C938%2C1201%2C937%2C1920%2C1080%2C1%2CP"
        //         }
        //     }

        //     var req = https.request(options, (res) => {
        //         console.log(res.statusCode)
        //         res.setEncoding('utf8');
        //         res.on('data', (response) => {
        //             console.log(response);
        //         })
        //     })

        //     req.on('error', (error) => {
        //         console.error(error)
        //     })

        //     req.end();
        //     done();
        // }, function(err) {
        //     console.log(err);
        // });



        // var myCookies = await webServices.getCookieMap(url);
        // console.log(myCookies.size);
        // for (let [k,v] of myCookies) {
        //     console.log(`Key: ${k}, Value: ${v}`);
        // }

        
        // for (let [k,v] of cookies) {
        //     console.log(k, v);
        // };

        // .then(function(cookies) {
        //     for (let [k,v] of cookies) {
        //         console.log(k, v);
        //     }
        //     console.log(cookies);
        // });
        
        
        // for (let [k, v] of cookies) {
        //     console.log(`Key: ${k}, Value: ${v}`);
        // }
        // var response = request.post({url:url, data:data, cookies:cookies});
        // request.post({url:url, data:data, cookies:cookies}, function(err, res, body) {
        //     // let json = JSON.parse(body);
        //     console.log(json);
        // })



        // var url = "https://www.copart.com/public/lots/search";
        // var cookie = WebServices.getCookies(url);
        // var options = {
        //     url: url,
        //     method: 'POST',
        //     headers: {
        //         'authority': 'www.copart.com',
        //         'method': 'POST',
        //         'path': '/public/lots/search',
        //         'scheme': 'https',
        //         'accept': 'application/json',
        //         'accept-encoding': 'gzip',
        //         'accept-language': 'en-US',
        //         'cache-control': 'no-cache',
        //         'content-length': 3496,
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'cookie': cookie
        //     }
        // }

        // request(options, function(err, res, body) {  
        //     // let json = JSON.parse(res);
        //     console.log(res);
        // });
    });


})
