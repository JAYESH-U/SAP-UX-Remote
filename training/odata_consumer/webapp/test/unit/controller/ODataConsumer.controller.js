/*global QUnit*/

sap.ui.define([
	"ibm/sap/ux/odataconsumer/controller/ODataConsumer.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ODataConsumer Controller");

	QUnit.test("I should test the ODataConsumer controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
