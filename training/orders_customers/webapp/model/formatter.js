sap.ui.define([], function () {
    "use strict";

    return {
        formatDate: function (oDate) {
            let dateString = oDate.substr(6, 12);
            let date = new Date(parseInt(dateString));
            // console.log(dateString, oDate, date);

            return date.toLocaleDateString();
        },
    };
});
