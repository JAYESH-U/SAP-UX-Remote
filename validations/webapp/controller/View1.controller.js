sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("ibm.sap.training.validations.controller.View1", {
        onInit() {
            let jsonData = new sap.ui.model.json.JSONModel("./model/data.json");
               this.getView().setModel( jsonData, "j");

        }
    });
});