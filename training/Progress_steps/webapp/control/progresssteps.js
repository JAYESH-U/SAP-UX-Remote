sap.ui.define(["sap/ui/core/Control"], function (Control) {
    "use strict"
    return Control.extend("progresssteps.control.progresssteps", {
        metadata: {
            properties: {
                value: { type: "int", defaultValue: 0 },
                max: { type: "int", defaultValue: 4 },
                editable: { type: "boolean", defaultValue: true },
                width: { type: "sap.ui.core.CSSSize", defaultValue: "100%" }
            },
            events: {
                Change: {
                    parameters: {
                        value: { type: "int" }
                    }
                }
            }
        },
        onclick: function (oEvent) {
            if (!this.getEditable()) {
                return;
            }
            var index = parseInt(oEvent.target.getAttribute("data-index"), 10);//I am taking the index value I clicked
            if (!isNaN(index) && index <= this.getMax()) {
                this.setProperty("value", index);
                this.fireChange({ "value": index });
            }
        },
        renderer: function (oRm, oControl) {

            var iVal = oControl.getValue();
            var iMax = oControl.getMax();

            oRm.openStart("div", oControl);
            oRm.class("progressSteps");
            oRm.style("width", oControl.getWidth());
            oRm.openEnd();

            for (var i = 1; i <= iMax; i++) {

                // STEP CIRCLE
                oRm.openStart("div");
                oRm.class("step");

                if (i < iVal) {
                    oRm.class("completed");
                } else if (i === iVal) {
                    oRm.class("active");
                }

                oRm.attr("data-index", i);
                oRm.openEnd();

                oRm.text(i);
                oRm.close("div");

                // CONNECTOR LINE
                if (i < iMax) {
                    oRm.openStart("div");
                    oRm.class("connector");

                    if (i < iVal) {
                        oRm.class("completed");
                    }

                    oRm.openEnd();
                    oRm.close("div");
                }
            }

            oRm.close("div");
        }
    });
});