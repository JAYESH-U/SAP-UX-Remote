sap.ui.define([], function () {
    "use strict";

    return {
        formatDate: function (oDate) {
            let date = new Date(oDate);

            return date.toLocaleDateString();
        },
    };
});
