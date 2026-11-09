sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
    ],
    function (Controller, UIComponent, JSONModel, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.crudoperations.controller.CustomerForm",
            {
                onInit: function () {
                    const customer = {
                        Cno: null,
                        Name1: null,
                        Cityy: null,
                        Ctry: null,
                        Region: null,
                        Sterm: null,
                    };

                    const customerData = new JSONModel(customer);
                    this.getView()
                        .byId("CustomerUpdateForm")
                        .setModel(customerData, "cf");

                    this.bindCustomerData();
                },
                bindCustomerData: function () {
                    const oRouter = UIComponent.getRouterFor(this);
                    const oRoute = oRouter.getRoute("RouteCustomerUpdateForm");

                    oRoute.attachPatternMatched(this._objectMatched, this);
                },
                _objectMatched: function (oEvent) {
                    const oArguments = oEvent.getParameter("arguments");
                    const sCustomerId = oArguments.Cno;
                    const oODataModel = this.getView().getModel(); // Get the main OData Model
                    const oLocalModel = this.getView()
                        .byId("CustomerUpdateForm")
                        .getModel("cf"); // Get the local JSON Model
                    console.log("oLocalModel : ", oLocalModel);

                    console.log(
                        "Received Customer ID in Detail Controller:",
                        sCustomerId
                    );

                    const sPath = `/CustomerSet('${sCustomerId}')/`;

                    // 1. Perform an explicit OData READ operation
                    oODataModel.read(sPath, {
                        success: (oData) => {
                            // 2. On successful read, set the retrieved data into the local JSON model 'cf'
                            console.log(oData);

                            oLocalModel.setData(oData);
                            console.log(
                                "Customer data loaded into local model 'cf':",
                                oData
                            );
                        },
                        error: (oError) => {
                            // Handle error (e.g., show a message, navigate back)
                            sap.m.MessageToast.show(
                                `Error fetching customer ${sCustomerId}`
                            );
                            console.error("OData Read Error:", oError);
                        },
                    });
                },
                onUpdateCustomer: function () {
                    const oView = this.getView().byId("CustomerUpdateForm");
                    const oDataModel = oView.getModel();
                    const oLocalModel = oView.getModel("cf");

                    const customerData = oLocalModel.getData();
                    // console.log("CustoerData: ", customerData);
                    const path = `/CustomerSet('${customerData.Cno}')/`;
                    oDataModel.update(path, customerData, {
                        success: (oData) => {
                            // 2. On successful read, set the retrieved data into the local JSON model 'cf'
                            console.log(oData);
                            console.log(
                                "Customer data upated into oData model :",
                                oData
                            );
                            MessageToast.show(
                                `Customer data updated into oData Model`
                            );
                            oLocalModel.refresh();
                        },
                        error: (oError) => {
                            // Handle error (e.g., show a message, navigate back)
                            MessageToast.show(
                                `Error fetching customer ${customerData.Cno}`
                            );
                            console.error("OData Read Error:", oError);
                        },
                    });
                },
                onCreateCustomer: function () {
                    const oView = this.getView();
                    const oModel = oView.getModel();

                    // const customer = {
                    //     Cno: oView.byId("Cno").getValue(),
                    //     Name1: oView.byId("CName1").getValue(),
                    //     Cityy: oView.byId("CCityy").getValue(),
                    //     Ctry: oView.byId("CCtry").getValue(),
                    // };

                    const customer = oView.getModel("cf").getData();
                    console.log("Customer : ", customer);

                    if (
                        !customer ||
                        !customer.Cno ||
                        !customer.Name1 ||
                        !customer.Cityy ||
                        !customer.Ctry
                    ) {
                        MessageToast.show("Error!!! Please fill all the data");
                        console.log("Not all the filed items are filled");

                        return;
                    }

                    const path = `/CustomerSet`;
                    oView.getModel().create(path, customer, {
                        success: (oData) => {
                            MessageToast.show("Customer Created", customer.Cno);
                            console.log("oData : ", oData);

                            oModel.refresh();
                            this.resetForm(oView);
                        },
                        error: (error) => {
                            MessageToast.show("Error creating customer");
                            console.log(error);
                        },
                    });
                },
                resetForm: function (oView) {
                    oView.byId("Cno").setValue("");
                    oView.byId("CName1").setValue("");
                    oView.byId("CCityy").setValue("");
                    oView.byId("CCtry").setValue("");
                },
            }
        );
    }
);
