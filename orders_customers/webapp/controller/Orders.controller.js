sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    'sap/ui/model/FilterOperator'
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ibm.sap.ux.orderscustomers.controller.Orders", {
        onInit() {
        },
        onFilterCustomers: function (oEvent) {
            console.log("Searching");
            
            const query = oEvent.getParameters().query;
            
            const aFilters = [];
            aFilters.push(new Filter('CustomerID', FilterOperator.Contains, query));

            const oTableData = this.getView().byId('OrdersTable').getBinding("items");
            oTableData.filter(aFilters);
        },
        onLiveFilterCustomers: function (oEvent) {
            console.log("Searching");
            
            const query = oEvent.getParameters().newValue;
            
            const aFilters = [];
            aFilters.push(new Filter('CustomerID', FilterOperator.Contains, query));

            const oTableData = this.getView().byId('OrdersTable').getBinding("items");
            oTableData.filter(aFilters);
        }
    });
});