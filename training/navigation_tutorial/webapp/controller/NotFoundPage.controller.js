sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/m/MessageToast",
    ],
    (Controller, UIComponent, MessageToast) => {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.navigationtutorial.controller.NotFoundPage",
            {
                onInit() {
                    MessageToast.show("Sales Page");
                },
                navToHome: function () {
                    this.getOwnerComponent().getRouter().navTo("RouteHomePage");
                },
            }
        );
    }
);
