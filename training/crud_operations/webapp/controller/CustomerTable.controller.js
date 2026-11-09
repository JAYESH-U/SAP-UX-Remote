sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
    function (Controller, MessageToast, MessageBox) {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.crudoperations.controller.CustomerTable",
            {
                onInit: function () {},
                onItemPress: function (oEvent) {
                    const customerId = oEvent
                        .getParameters()
                        .listItem.getBindingContext()
                        .getProperty("Cno");
                    console.log("CustomerId : ", customerId);

                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("RouteCustomerUpdateForm", {
                            Cno: customerId,
                        });
                },
                onRowDelete: function (oEvent) {
                    const cno = oEvent
                        .getParameters()
                        .listItem.getBindingContext()
                        .getProperty("Cno");

                    const path = `/CustomerSet('${cno}')`;

                    this.getView()
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
                onClickCreateButton: function () {
                    this.getOwnerComponent()
                        .getRouter()
                        .navTo("RouteCustomerForm");
                },
                onCreateCustomer: function () {
                    const oView = this.getView();
                    const oModel = oView.getModel();

                    const customer = {
                        Cno: oView.byId("Cno").getValue(),
                        Name1: oView.byId("CName1").getValue(),
                        Cityy: oView.byId("CCityy").getValue(),
                        Ctry: oView.byId("CCtry").getValue(),
                    };
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
                        success: () => {
                            MessageToast.show("Customer Created", customer);
                            oModel.refresh();
                        },
                        error: (error) => {
                            MessageToast.show("Error creating customer");
                            console.log(error);
                        },
                    });
                },
                // NEW FUNCTION: Handles deletion of all selected items
                onDeleteSelectedPress: function () {
                    const oTable = this.byId("ConsumerTable");
                    const aSelectedItems = oTable.getSelectedItems();
                    const oModel = this.getView().getModel();

                    if (aSelectedItems.length === 0) {
                        MessageToast.show(
                            "Please select at least one customer to delete."
                        );
                        return;
                    }

                    MessageBox.confirm(
                        `Are you sure you want to delete ${aSelectedItems.length} selected customer(s)?`,
                        {
                            title: "Confirm Deletion",
                            onClose: (sAction) => {
                                if (sAction === MessageBox.Action.OK) {
                                    let iSuccessCount = 0;
                                    let iErrorCount = 0;
                                    const iTotalCount = aSelectedItems.length;

                                    // Iterate over items and send individual DELETE requests
                                    aSelectedItems.forEach((oItem) => {
                                        const sPath = oItem
                                            .getBindingContext()
                                            .getPath();

                                        // CRITICAL CHANGE: Force individual request by setting bBatch=false
                                        oModel.remove(sPath, {
                                            // Send individual requests instead of batching
                                            groupId: "$auto", // Use $auto to send immediately

                                            success: (oData, oResponse) => {
                                                iSuccessCount++;
                                                if (
                                                    iSuccessCount +
                                                        iErrorCount ===
                                                    iTotalCount
                                                ) {
                                                    // All requests completed
                                                    this._showDeleteSummary(
                                                        iSuccessCount,
                                                        iErrorCount
                                                    );
                                                    oTable.removeSelections(
                                                        true
                                                    );
                                                }
                                            },
                                            error: (oError) => {
                                                iErrorCount++;
                                                console.error(
                                                    `Error deleting item ${sPath}:`,
                                                    oError
                                                );
                                                if (
                                                    iSuccessCount +
                                                        iErrorCount ===
                                                    iTotalCount
                                                ) {
                                                    // All requests completed
                                                    this._showDeleteSummary(
                                                        iSuccessCount,
                                                        iErrorCount
                                                    );
                                                    oTable.removeSelections(
                                                        true
                                                    );
                                                }
                                            },
                                        });
                                    });

                                    // You DO NOT need oModel.submitChanges() when using $auto group.
                                }
                            },
                        }
                    );
                },

                // Helper function to show summary after all requests finish
                _showDeleteSummary: function (iSuccessCount, iErrorCount) {
                    if (iErrorCount > 0) {
                        MessageBox.warning(
                            `${iSuccessCount} items deleted. ${iErrorCount} items failed to delete.`
                        );
                    } else {
                        MessageToast.show(
                            `Successfully deleted ${iSuccessCount} customer(s).`
                        );
                    }
                },
            }
        );
    }
);
