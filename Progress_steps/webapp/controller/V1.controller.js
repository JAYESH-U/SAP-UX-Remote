sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("progresssteps.controller.V1", {
        onInit() {
        },
        onStepChange:function(oEvent){
            var iVal=oEvent.getParameter("value");
            console.log("New step",iVal);
        }
    });
});