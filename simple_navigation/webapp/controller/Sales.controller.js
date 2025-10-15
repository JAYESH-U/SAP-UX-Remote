sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/m/MessageToast",
    ],
    (Controller, UIComponent, MessageToast) => {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.simplenavigation.controller.Sales",
            {
                onInit() {
                    MessageToast.show("Sales Page");

                    // const oRouter = UIComponent.getRouterFor(this);

                    // // 1. Get the route object using the name specified in navTo()
                    // const oRoute = oRouter.getRoute("RouteSalesPage");

                    const oRoute = this.getOwnerComponent()
                        .getRouter()
                        .getRoute("RouteSalesPage");

                    // 2. Attach a handler function to the patternMatched event
                    oRoute.attachPatternMatched(this._onObjectMatched, this);
                },
                _onObjectMatched: function (oEvent) {
                    // 3. Extract the parameter from the arguments object
                    const oArguments = oEvent.getParameter("arguments");

                    // The property name 'oid' must match the parameter name in your route pattern:
                    const sCustomerId = oArguments.id;

                    console.log(
                        "Received Customer ID in Sales Controller:",
                        sCustomerId
                    );

                    // 4. Use the Order ID to load the specific data for the detail view
                    this._bindDetailView(sCustomerId);
                },

                _bindDetailView: async function (sCustomerId) {
                    this.getView().byId("InputS1").setValue(sCustomerId);
                },
            }
        );
    }
);
