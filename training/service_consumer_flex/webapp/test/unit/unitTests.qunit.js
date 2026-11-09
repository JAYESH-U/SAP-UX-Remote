/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ibm/sap/ux/serviceconsumer/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
