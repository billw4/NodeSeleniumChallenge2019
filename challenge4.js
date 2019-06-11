require('chromedriver');

var fibNum = 14;

describe("Challenge 4 Suite", function() {
    
    it("should display the Fibonacci sequence in string form", function() {
        for(let i = 0; i < fibNum + 1; i++) {
            console.log('F('+ i +') = ' + fib(i) + ', ' + convertToText(fib(i)));
        }

        function fib(n) { 
            if (n <= 1) 
                return n;
            else
                return fib(n - 1) + fib(n - 2); 
         } 
     
         function convertToText(num) {
             var ones = ['one','two','three','four','five','six','seven','eight','nine'];
             var teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eightteen','nineteen'];
             var tens = ['ten','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
     
             if(num == 0) {
                 return 'zero';
             }
             else if(num <= 9) {
                 return ones[num - 1];
             }
             else if(9 < num && num <= 19) {
                 return teens[num - 10];
             }
             else if(19 < num && num <= 99) {
                 var first = num.toString()[0];
                 var second = num.toString()[1];
     
                 if(second==0) {
                     return tens[first - 1];
                 } else {
                     return tens[first - 1] + '-' + ones[second - 1];
                 }
             }
             else if(99 < num && num <= 999) {
                 var first = num.toString()[0];
                 var second = num.toString()[1];
                 var third = num.toString()[2];
     
                 if(second==0 && third==0) {
                     return ones[first - 1] + ' hundred';
                 } else if(second==0 && third>0) {
                     return ones[first - 1] + ' hundred and ' + ones[third - 1];
                 } else if(second>0 && third==0) {
                     return ones[first - 1] + ' hundred and ' + tens[second - 1];
                 } else {
                     return ones[first - 1] + ' hundred and ' + tens[second - 1] + '-' + ones[third - 1];
                 }
             }
             else if(999 < num && num <= 9999) {
                 var first = num.toString()[0];
                 var second = num.toString()[1];
                 var third = num.toString()[2];
                 var fourth = num.toString()[3];
     
                 if(second==0 && third==0 && fourth==0) {
                     return ones[first - 1] + ' thousand';
                 }else if(second>0 && third==0 && fourth==0) {
                     return ones[first - 1] + ' thousand ' + ones[second - 1] + ' hundred';
                 } else if(second==0 && third>0 && fourth==0) {
                     return ones[first - 1] + ' thousand and ' + tens[third - 1];
                 } else if (second==0 && third==0 && fourth>0) {
                     return ones[first - 1] + ' thousand and' + ones[fourth - 1];
                 } else if (second>0 && third>0 && fourth==0) {
                     ones[first - 1] + ' thousand ' + ones[second - 1] + ' hundred and ' + tens[third - 1];
                 } else if(second>0 && third==0 && fourth>0) {
                     ones[first - 1] + ' thousand ' + ones[second - 1] + ' hundred and ' + ones[fourth - 1];
                 } else if(second==0 && third>0 && fourth>0) {
                     ones[first - 1] + ' thousand ' + tens[third -1] + '-' + ones[fourth - 1];
                 }
                 else {
                     return ones[first - 1] + ' thousand ' + ones[second - 1] + ' hundred and ' + tens[third - 1] + '-' + ones[fourth - 1];
                 }
             }
         }
    });

})