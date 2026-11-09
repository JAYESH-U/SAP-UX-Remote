sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/m/MessageToast",
        "sap/m/MessageBox",
    ],
    function (Controller, JSONModel, MessageToast, MessageBox) {
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
                        .byId("CustomerForm")
                        .setModel(customerData, "cf");
                },
                onRowDelete: function (oEvent) {
                    const cno = oEvent
                        .getParameters()
                        .listItem.getBindingContext()
                        .getProperty("Cno");

                    const path = `/CustomerSet('${cno}')`;

                    this.getView()
                        .byId("CustomerForm")
                        .getModel()
                        .remove(path, {
                            success: function () {
                                MessageToast.show("Deleted ", cno);
                            },
                            error: function (error) {
                                MessageToast.show(cno + " Not deleted");
                                console.log(error);
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
