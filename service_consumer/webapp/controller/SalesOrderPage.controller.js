sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent"],
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.serviceconsumer.controller.HomePage",
            {
                onInit: function () {
                    const oRouter = UIComponent.getRouterFor(this);
                    const oRoute = oRouter.getRoute("RouteSalesOrderPage");

                    oRoute.attachPatternMatched(this._objectMatched, this);
                },
                _objectMatched: function (oEvent) {
                    const oArguments = oEvent.getParameter("arguments");
                    const sCustomerId = oArguments.Cno;

                    console.log(
                        "Received Customer ID in Detail Controller:",
                        sCustomerId
                    );

                    const path = `/CustomerSet('${sCustomerId}')/`;

                    this.getView().bindElement(path);
                },
            }
        );
    }
);
