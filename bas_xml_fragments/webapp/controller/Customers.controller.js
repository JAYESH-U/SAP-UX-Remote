sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
    (Controller, JSONModel) => {
        "use strict";

        return Controller.extend(
            "ibm.sap.training.basxmlfragments.controller.Customers",
            {
                onInit() {
                    // const jsonData = new JSONModel("./model/sample.json");
                    // this.getView().setModel(jsonData, "s");
                },
                onSubmit: function (oEvent) {
                    const oModel = this.getView().getModel("s");
                    console.log("oModelData is ready: ", oModel.getData());
                },
                onSelect: function (oEvent) {
                    const index = oEvent.getParameters().selectedIndex;
                    console.log("Button Index : ", index);
                },
            }
        );
    }
);
