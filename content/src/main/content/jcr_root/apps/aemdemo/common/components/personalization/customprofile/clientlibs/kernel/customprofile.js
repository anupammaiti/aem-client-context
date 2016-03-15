var MyApp = MyApp || {};

if (!MyApp.CustomProfile) {
    // Created CustomProfile class object using function constructor
    var CustomProfile = function() {

        var cfg = {
            data: function() {
                return {
                    'employeeId': '',
                    'employeeName': '',
                    'departmentId': '',
                    'departmentName': ''
                };
            },
            customProfileCookie: "custom-profile-session"
        };

        function loadCustomProfile() {
            var customProfileMap = {};
            // Note: Custom Profile information can be loaded from server.
            // Currently Custom Profile data is being hardcoded fro demo.
            customProfileMap['employeeId'] = "1234";
            customProfileMap['employeeName'] = "Vimal Kumar";
            customProfileMap['departmentId'] = "6789";
            customProfileMap['departmentName'] = "Adobe Experience Manager";
            return customProfileMap;
        }

        this.initialize = function() {
            this.data = cfg.data();

            if (hasCookie(cfg.customProfileCookie)) {
                CQ_Analytics.SessionStore.prototype.setProperties.call(this, JSON.parse(getCookieValue(cfg.customProfileCookie)));
            } else {
                this.setProperties(loadCustomProfile());
            }

            this.initialized = true;
            this.fireEvent('initialize', this);
            this.fireEvent('update');
        }

        this.setCookie = function(cookieMap) {
            //Added Custom Profile as "Session cookie"
            document.cookie =  cfg.customProfileCookie + '=' + encodeURIComponent(JSON.stringify(cookieMap))  + "; expires=0; path=/";
        }
    };

    // Creating a session store for Custom profile
    CustomProfile.prototype = new CQ_Analytics.SessionStore();
    CustomProfile.prototype.STOREKEY = "CUSTOM_PROFILE";
    CustomProfile.prototype.STORENAME = "customprofile";

    /* Public prototype methods */
    CustomProfile.prototype.init = function() {
        this.initialize();
    };

    // Setting Client Context Stores from Map object
    CustomProfile.prototype.setProperties = function(properties) {
        if(!properties) return;
        // Setting Cookie Value
        this.setCookie(properties);
        // Set Custom Client Context Store
        CQ_Analytics.SessionStore.prototype.setProperties.call(this, properties);
    };

    // Instantiated CustomProfile Class
    MyApp.CustomProfile = new CustomProfile();

    CQ_Analytics.CCM.addListener("configloaded", function() {
        //registers Profile Data to clickstreamcloud manager
        CQ_Analytics.CCM.register(this);
    }, MyApp.CustomProfile);
}

// Global Util functions
function getCookieValue(cookieName) {
    // based on https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    if (!cookieName) { return null; }
    var encodedName = encodeURIComponent(cookieName).replace(/[\-\.\+\*]/g, "\\$&");
    var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodedName + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    // version 1 cookies may embed the value in quotes so strip them
    if (/^["']/.test(value) && value.length > 1) value = value.substring(1, value.length - 1);
    return value;
}

function hasCookie(cookieName) {
    return new RegExp("(^|;\\s*)" + cookieName + "=").test(document.cookie);
}