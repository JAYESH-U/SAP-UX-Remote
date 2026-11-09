/*global QUnit*/

sap.ui.define([
	"ibm/sap/ux/crudoperations/controller/CustomerTable.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CustomerTable Controller");

	QUnit.test("I should test the CustomerTable controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
