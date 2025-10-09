sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";

    return Controller.extend("ibm.sap.ux.serviceconsumer.controller.HomePage", {
        onInit: function () {},
        onItemPress: function (oEvent) {
            console.log("Clicked");

            const context = oEvent.getParameters().listItem.getBindingContext();
            console.log(context);

            const customerId = context.getProperty("Cno");
            console.log("Cno : ", customerId);

            this.getOwnerComponent().getRouter().navTo("RouteSalesOrderPage", {
                Cno: customerId,
            });
        },
    });
});
