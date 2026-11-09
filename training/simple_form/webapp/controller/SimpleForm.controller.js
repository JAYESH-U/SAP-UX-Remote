sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/xml/XMLModel",
        "sap/ui/model/resource/ResourceModel",
        "sap/m/MessageToast",
    ],
    (Controller, JSONModel, XMLModel, ResourceModel, MessageToast) => {
        "use strict";

        return Controller.extend(
            "ibm.sap.ux.simpleform.controller.SimpleForm",
            {
                onInit() {
                    // const jsonData = new JSONModel('./model/data.json');
                    // // or
                    const jsonData = new JSONModel();
                    jsonData.loadData("./model/data.json");

                    this.getView().setModel(jsonData, "c");

                    const xmlData = new XMLModel("./model/data.xml");
                    this.getView().setModel(xmlData, "x");

                    // // both the url will work
                    // const resourceData = new ResourceModel({ bundleUrl: "./i18n/i18n.properties", });
                    const resourceData = new ResourceModel({ bundleName: "ibm.sap.ux.simpleform.i18n.i18n", });
                    this.getView().setModel(resourceData, "r");
                },

                createSales: function (oEvent) {
                    let oModel = this.getView().getModel("c");
                    let oData = oModel.getData();
                    let oNewSale = oData.newSaleEntry;

                    console.log("oNewSale : ", oNewSale);

                    if (
                        !oNewSale.id ||
                        !oNewSale.price ||
                        !oNewSale.sorg ||
                        !oNewSale.srep
                    ) {
                        console.log("Fields are empty...!!!");

                        MessageToast.show("Please fill in all the data.");
                        return;
                    }

                    oData.sales.push(Object.assign({}, oNewSale));

                    oData.newSaleEntry = {
                        id: null,
                        price: null,
                        sorg: null,
                        srep: null,
                    };

                    oModel.setData(oData);

                    MessageToast.show(
                        "Sale submitted and appended to the list and table."
                    );
                },

                createSalesXML: function (oEvent) {
                    const oModel = this.getView().getModel("x");

                    // NOTE: Based on your XML structure, the paths should likely start with /customer/
                    // I've kept your paths for reading data, assuming the model root is set to /customer.
                    const sID = oModel.getProperty("/newSaleEntry/id");
                    const sPrice = oModel.getProperty("/newSaleEntry/price");
                    const sSorg = oModel.getProperty("/newSaleEntry/sorg");
                    const sSrep = oModel.getProperty("/newSaleEntry/srep");

                    // --- 2. Validation ---
                    if (!sID || !sPrice || !sSorg || !sSrep) {
                        sap.m.MessageToast.show("Please fill in all the data.");
                        return;
                    }

                    // --- 3. Append Data (Fix is here) ---

                    const oXMLDoc = oModel.getData();
                    const oCustomerNode = oXMLDoc.querySelector("customer");

                    if (oCustomerNode) {
                        // Create the new parent element <sales>
                        const oNewSaleNode = oXMLDoc.createElement("sales");

                        // Helper function to create <tag>value</tag> structure and append it
                        const createAndAppendElement = (
                            parentNode,
                            tagName,
                            value
                        ) => {
                            // FIX: createElement MUST be called on the Document (oXMLDoc)
                            const element = oXMLDoc.createElement(tagName);
                            const textNode = oXMLDoc.createTextNode(value);
                            element.appendChild(textNode);
                            parentNode.appendChild(element); // Append to the new <sales> node
                        };

                        // Create and append the four child elements inside the new <sales> node:
                        createAndAppendElement(oNewSaleNode, "id", sID);
                        createAndAppendElement(oNewSaleNode, "price", sPrice);
                        createAndAppendElement(oNewSaleNode, "sorg", sSorg);
                        createAndAppendElement(oNewSaleNode, "srep", sSrep);

                        // Append the completed <sales> element to the <customer> node
                        oCustomerNode.appendChild(oNewSaleNode);
                    } else {
                        sap.m.MessageToast.show(
                            "Error: Could not find the 'customer' node in the XML."
                        );
                        return;
                    }

                    // --- 4. Clear the Form Data ---
                    oModel.setProperty("/newSaleEntry/id", "");
                    oModel.setProperty("/newSaleEntry/price", "");
                    oModel.setProperty("/newSaleEntry/sorg", "");
                    oModel.setProperty("/newSaleEntry/srep", "");

                    // --- 5. Inform the Model/Bindings to Update the UI ---
                    oModel.refresh(true);

                    // --- 6. Feedback ---
                    sap.m.MessageToast.show(
                        "Sale submitted and appended to the list and table."
                    );
                },
            }
        );
    }
);
