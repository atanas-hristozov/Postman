'use strict';


var server = require('server');
var Transaction = require('dw/system/Transaction');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var UUIDUtils = require('dw/util/UUIDUtils');

/**
 * Create sustom object
 */
server.post('Create', server.middleware.https, function (req, res, next) {
    var form = req.form;
    var error = false;

    if(!form) {
        error = true;
    }
    var type = "NewsLetterSubscription";
    var keyValue = UUIDUtils.createUUID();

    try{
        Transaction.wrap(function() {
            var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
            newsletter.custom.name = form.name;
            newsletter.custom.email = form.email;
        });
    } catch (error) {
        error = true;
    }
    if(error) {
        res.json({
            error: false,
            id: keyValue
        });
    }
    return next();
});

module.exports = server.exports();