var request = require('request');
var Cookie = require('request-cookies').Cookie;

function WebServices() {};

// WebServices.prototype.getCookies = async function(url, cb) {
//     var rawcookies;
//     var cookies = new Map();
//     await request.get(url, function(err, response, body) {
//         rawcookies = response.headers['set-cookie'];
//         for (var i in rawcookies) {
//             var cookie = new Cookie(rawcookies[i]);
//             cookies.set(cookie.key, cookie.value);
//             // console.log(`Cookie: ${cookie.key}, Value: ${cookie.value}, Expiration: ${cookie.expires}`);
//         }
//         return Promise.all(cookies);
//     });
//     console.log(cookies.size);
//     for (let [k,v] of cookies) {
//         console.log(`Key: ${k}, Value: ${v}`);
//     }
// };

WebServices.prototype.getCookies = function(url) {
    var promise = new Promise((resolve, reject) => {
        request.get(url, function(err, resp) {
            if (!err && resp.statusCode == 200) {
                resolve(resp.headers['set-cookie']);
            } else {
                return reject(err);
            }
        })
    });
    return promise;
};

WebServices.prototype.getCookieMap = function(url) {
    var cookieMap = new Map();
    var cookies = [];
    cookies = this.getCookies(url, function(err, res) {
        if (!err) {
            return res;
        }
    });
    console.log("Cookies: " + cookies);
    for (var i in cookies) {
        var cookie = new Cookie(cookies[i]);
        cookieMap.set(cookie.key, cookie.value);
    }
    console.log(cookieMap.size);
    return cookieMap;
};


module.exports = WebServices;