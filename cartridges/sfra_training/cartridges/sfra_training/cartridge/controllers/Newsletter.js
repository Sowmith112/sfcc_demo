'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');

server.get(
    'Show',
    server.middleware.https,
    function (req, res, next) {
        var actionUrl = dw.web.URLUtils.url('Newsletter-Handler');
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('/newsletter/newslettersignup', {
            actionUrl: actionUrl,
            newsletterForm: newsletterForm
        });

        next();
    }
);

server.post(
    'Handler',
    server.middleware.https,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        var continueUrl = dw.web.URLUtils.url('Newsletter-Show');


        if (newsletterForm.valid) {
            var CustomObjectMgr = require('dw/object/CustomObjectMgr');
            var Transaction = require('dw/system/Transaction');
            
            try {
                Transaction.wrap(function () {
                    var co = CustomObjectMgr.createCustomObject('NewsletterSubscription', newsletterForm.email.value);
                    co.custom.firstName = newsletterForm.fname.value;
                    co.custom.lastName = newsletterForm.lname.value;

                    dw.system.HookMgr.callHook('newsletter.email', 'send', newsletterForm.email.value);
                });
        
                res.json({
                    success: true,
                    redirectUrl: URLUtils.url('Newsletter-Success').toString()
                });
            } catch (e) {
                var err = e;
                res.setStatusCode(500);
                res.json({
                    error: true,
                    redirectUrl: URLUtils.url('Error-Start').toString()
                });
            }
        }  else {
            if (newsletterForm.valid) {
                // Show the success page
                res.json({
                    success: true,
                    redirectUrl: URLUtils.url('Newsletter-Success').toString()
                });
            } else {
                // Handle server-side validation errors here: this is just an example
                res.setStatusCode(500);
                res.json({
                    error: true,
                    redirectUrl: URLUtils.url('Error-Start').toString()
                });
            }
    
            next(); 
        }
    }
);

server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettersuccess', {
            continueUrl: URLUtils.url('Newsletter-Show'),
            newsletterForm: server.forms.getForm('newsletter')
        });

        next();
    }
);

module.exports = server.exports();