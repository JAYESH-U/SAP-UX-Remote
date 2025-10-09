sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";

    return Controller.extend(
        "ibm.sap.ux.serviceconsumerflex.controller.HomePage",
        {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("RouteHomePage").attachPatternMatched(
                    function (oEvent) {
                        // Set layout to OneColumn when only the master route is hit
                        this.getView()
                            .getModel("appView")
                            .setProperty("/layout", "OneColumn");
                    }.bind(this)
                );
            },
            onItemPress: function (oEvent) {
                console.log("Clicked");

                const context = oEvent
                    .getParameters()
                    .listItem.getBindingContext();
                console.log(context);

                const customerId = context.getProperty("Cno");
                console.log("Cno : ", customerId);

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteSalesOrderPage", {
                        Cno: customerId,
                        layout: "TwoColumnsMidExpanded",
                    });
            },
            onListItemPress: function (oEvent) {
                const sCustomerNo = oEvent
                    .getParameters()
                    .listItem.getBindingContext()
                    .getProperty("Cno");

                // Set the layout property on your global JSON model (e.g., "appView")
                this.getOwnerComponent()
                    .getModel("appView")
                    .setProperty("/layout", "TwoColumnsMidExpanded");

                // Navigate to the detail route
                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteSalesOrderPage", {
                        Cno: sCustomerNo,
                    });
            },
        }
    );
});
