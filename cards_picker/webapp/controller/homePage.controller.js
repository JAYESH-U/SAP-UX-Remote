sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/ui/core/Fragment"],
    (Controller, Fragment) => {
        "use strict";

        return Controller.extend("ibm.sap.ux.cardspicker.controller.homePage", {
            onInit: function () {
                var oData = {
                    cards: [
                        { name: "A", isActive: true },
                        { name: "B", isActive: false },
                        { name: "C", isActive: false },
                    ],
                };

                var oModel = new sap.ui.model.json.JSONModel(oData);
                this.getView().setModel(oModel, "cards");

                this._loadCards();
            },

            _loadCards: function () {
                var oContainer = this.byId("cardsContainer");
                var aCards = this.getView()
                    .getModel("cards")
                    .getProperty("/cards");

                // use dynamic rendering or use HBOX to render VBOXes
                aCards.forEach(
                    function (oCard, index) {
                        Fragment.load({
                            id: this.getView().createId("card_" + index),
                            name: "ibm.sap.ux.cardspicker.view.fragments.Card",
                            controller: this,
                        }).then(function (oFragment) {
                            oFragment.bindElement({
                                path: "/cards/" + index,
                                model: "cards",
                            });

                            oContainer.addItem(oFragment);
                        });
                    }.bind(this),
                );
            },

            onCardPress: function (oEvent) {
                var oCard = oEvent.getSource();

                // Remove active class from all
                this.byId("cardsContainer")
                    .getItems()
                    .forEach(function (item) {
                        item.removeStyleClass("cardActive");
                    });

                // Add active class to selected
                oCard.addStyleClass("cardActive");
            },
        });
    },
);
