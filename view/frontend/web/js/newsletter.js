define([
    'jquery',
    'underscore',
    'Magento_Ui/js/form/form',
    'ko',
    'Magento_Customer/js/model/customer'
], function ($, _, Component, ko, customer) {
    'use strict';

    return Component.extend({
        subscribe: ko.observable(),
        subscribe_url: '/rest/V1/eg-newsletter/subscribe',
        unsubscribe_url: '/rest/V1/eg-newsletter/unsubscribe',
        updatesubscribe_url: '/rest/V1/eg-newsletter/updatesubscribe',


        initialize: function () {
            this._super();
            this._initCheckboxState();
            return this;
        },

        _initCheckboxState: function () {
            if (customer.isLoggedIn()) {
                let isCustomerSubscribed = checkoutConfig.customerData.extension_attributes.is_subscribed;
                this.subscribe(isCustomerSubscribed);
            } else {
                this.subscribe(false);
            }
        },

        updateSubscribe: function () {
            let isChecked = $('#newsletter_checkout').prop('checked');
            if (isChecked) {
                this.saveSubscriber()
            } else {
                this.unsubscribe()
            }
            return true;
        },

        /**
         * set status as subscriber.
         */
        saveSubscriber: function () {

            if (customer.isLoggedIn()) {
                var email = checkoutConfig.customerData.email;
            } else {
                var email = $('#customer-email').val();
            }

            $.ajax(this.subscribe_url, {
                data: ko.toJSON({'email': email}),
                type: "post", contentType: "application/json",
                success: function () {
                },
                complete: function () {
                    $('body').trigger('processStop');
                }.bind(this)
            });
        },

        /**
         * set status as unsubscribe
         */
        unsubscribe: function () {

            $('body').trigger('processStart');

            if (customer.isLoggedIn()) {
                var url = this.unsubscribe_url;
                var data = {'customer_id': checkoutConfig.customerData.id};
            } else {
                var url = this.updatesubscribe_url;
                var data = {'email': $('#customer-email').val()};
            }

            $.ajax(url, {
                data: ko.toJSON(data),
                type: "post", contentType: "application/json",
                success: function () {
                },
                complete: function () {
                    $('body').trigger('processStop');
                }.bind(this)
            });
        }
    });
});