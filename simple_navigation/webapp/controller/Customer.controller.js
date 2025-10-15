sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
    "use strict";

    return Controller.extend(
        "ibm.sap.ux.simplenavigation.controller.Customer",
        {
            onInit() {},
            onSubmit: function (oEvent) {
                const id = this.getView().byId("Input1").getValue();
                console.log(id);

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteSalesPage", { id });
            },
        }
    );
});
