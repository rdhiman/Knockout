(function (ns) {
    //better exceptions, less tomfoolery allowed
    "use strict";
 
    ns.webApiClient = (function () {
 
        var testResult = [];
 
        var ajaxGet = function (method, input, callback, query) { //ignore jslint
            callback(this.testResult);
        };
 
        var ajaxPost = function (method, input, callback) { //ignore jslint
            callback(this.testResult);
        };
 
        var ajaxPut = function (method, id, input, callback) { //ignore jslint
            callback(this.testResult);
        };
 
        var ajaxDelete = function (method, id, callback) { //ignore jslint
            callback(this.testResult);
        };
 
        //return a new object with the above items
        //bound as defaults for its properties
        return {
            ajaxGet: ajaxGet,
            ajaxPut: ajaxPut,
            ajaxPost: ajaxPost,
            ajaxDelete: ajaxDelete,
            testResult: testResult
        };
    }());
 
    //pass in namespace prefix (from namespace.js)
}(yt));