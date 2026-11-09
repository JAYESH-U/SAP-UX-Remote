sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/m/MessageToast",
    ],
    (Controller, UIComponent, MessageToast) => {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.navigationtutorial.controller.SalesPage",
            {
                // onInit() {
                //     // both codes works similarly, this one is just unreadable
                //     let oRouter = this.getOwnerComponent().getRouter();
                //     oRouter
                //         .getRoute("RouteDetailedSalesPage")
                //         .attachPatternMatched(function (oEvent) {
                //             let oid = oEvent.getParameter("arguments").oid;
                //             this.getView()
                //                 .byId("SalesTable")
                //                 .bindElement("c>/customers/" + oid);
                //         }, this);
                // },

                onInit() {
                    MessageToast.show("Sales Page");

                    const oRouter = UIComponent.getRouterFor(this);

                    // 1. Get the route object using the name specified in navTo()
                    const oRoute = oRouter.getRoute("RouteDetailedSalesPage");

                    // 2. Attach a handler function to the patternMatched event
                    oRoute.attachPatternMatched(this._onObjectMatched, this);
                },
                _onObjectMatched: function (oEvent) {
                    // 3. Extract the parameter from the arguments object
                    const oArguments = oEvent.getParameter("arguments");

                    // The property name 'oid' must match the parameter name in your route pattern:
                    const sCustomerIndex = oArguments.oid;

                    console.log(
                        "Received Customer ID in Detail Controller:",
                        sCustomerIndex
                    );

                    // 4. Use the Order ID to load the specific data for the detail view
                    this._bindDetailView(sCustomerIndex);
                },

                _bindDetailView: async function (sCustomerIndex) {
                    const oView = this.getView();

                    // const sPath = "c>/customers/" + sCustomerIndex;
                    // console.log(sPath);
                    // oView.bindElement(sPath);

                    const oModel = oView.getModel("c");
                    if (!oModel) {
                        console.error("Model 'c' not available for binding.");
                        return;
                    }

                    const sPath = `c>/customers/${sCustomerIndex}`;
                    oView.bindElement({
                        path: sPath,
                        model: "c"
                    });
                },
                navToHome: function () {
                    this.getOwnerComponent().getRouter().navTo("RouteHomePage");
                },
            }
        );
    }
);
