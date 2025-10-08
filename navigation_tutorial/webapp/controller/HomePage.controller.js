sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/UIComponent",
    ],
    (Controller, MessageToast, JSONModel, UIComponent) => {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.navigationtutorial.controller.HomePage",
            {
                onInit() {
                    MessageToast.show("Home Page");

                    // // this will work only in the home page
                    // const jsonData = new JSONModel("./model/data.json");
                    // this.getView().setModel(jsonData, "c");
                },
                navToSales: function () {
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("RouteSalesPage");
                },
                onItemPress: function (event) {
                    // const context = event.getParameters().listItem.getBindingContext("c");
                    // // both works
                    const context = event
                        .getParameter("listItem")
                        .getBindingContext("c");
                    // console.log("context", context.getProperty("id"));

                    // const productId = context.getProperty("id");
                    // this.getOwnerComponent()
                    //     .getRouter()
                    //     .navTo("RouteDetailedSalesPage", {
                    //         oid: productId,
                    //     });

                    const productPath = context.getPath();
                    console.log(productPath.split('/')[2]);
                    const productIndex = productPath.split('/')[2];
                    
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("RouteDetailedSalesPage", {
                            oid: productIndex,
                        });
                },
                onSelectionChange: function (event) {
                    // const context = event.getParameters().listItem.getBindingContext("c");
                    // // both works
                    const context = event
                        .getParameter("listItem")
                        .getBindingContext("c");
                    console.log("context", context);
                    // console.log("context", context.getProperty("id"));

                    this.getView()
                        .byId("HomeSalesTable")
                        .setBindingContext(context, "c");
                },
            }
        );
    }
);
