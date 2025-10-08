sap.ui.define([
    "sap/ui/core/UIComponent",
    "ibm/sap/ux/navigationtutorial/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("ibm.sap.ux.navigationtutorial.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();

            // // any way this is a global model, just declare it in the manifest.json
            // const jsonData = new JSONModel("./model/data.json");
            // this.setModel(jsonData, "c");
        }
    });
});