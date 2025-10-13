sap.ui.define(
    [
        "sap/ui/core/UIComponent",
        "ibm/sap/training/basxmlfragments/model/models",
        "sap/ui/model/json/JSONModel",
    ],
    (UIComponent, models, JSONModel) => {
        "use strict";

        return UIComponent.extend(
            "ibm.sap.training.basxmlfragments.Component",
            {
                metadata: {
                    manifest: "json",
                    interfaces: ["sap.ui.core.IAsyncContentCreation"],
                },

                init() {
                    // call the base component's init function
                    UIComponent.prototype.init.apply(this, arguments);

                    // set the device model
                    this.setModel(models.createDeviceModel(), "device");

                    // enable routing
                    this.getRouter().initialize();
                },
            }
        );
    }
);
