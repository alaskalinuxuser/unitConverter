import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Components.Popups 1.3
import Ubuntu.Components.Pickers 1.3

import Ubuntu.Components.ListItems 1.3 as ListItem
import QtQuick.LocalStorage 2.0

import "Storage.js"  as Storage
import "Utility.js" as Utility

/*
  Weigth unit converter page
*/

Page {
     id: weigthPage
     visible: false

     /* default is today, after is updated when the user chose a date with the TimePicker */
     property string targetDate : Qt.formatDateTime(new Date(), "yyyy-MM-dd");

     header: PageHeader {
        title: i18n.tr("Weigth conversions")

        leadingActionBar.actions: [
            Action {
                iconName: "back"
                text: "Back"

                onTriggered:{
                    pageStack.clear();
                    pageStack.push(mainPage);
                    /* otherwise there is an overlap of jobList and jobDetails Pages */
                    pageLoader.source = "";
                }
            }
        ]
     }

     /* define how to render the entry in the OptionSelector */
     Component {
         id: weigthUnitsListModelDelegate
         OptionSelectorDelegate { text: sourceUnit; subText: sourceUnitSymbol; }
     }

     /* ------------- Source Unit --------------- */
     Component {
         id: sourceWeigthUnitsChooserComponent

         Dialog {
             id: weigthUnitsChooserDialog
             title: i18n.tr("Found "+weigthUnitsListModel.count+ " weigth units")

             OptionSelector {
                 id: weigthUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: weigthUnitsListModelDelegate
                 model: weigthUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(weigthUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         sourceUnitChooserButton.text = weigthUnitsListModel.get(weigthUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(weigthUnitsChooserDialog)
                     }
                 }
             }
         }
     }


     /* ------------- Destination Unit --------------- */
     Component {
         id: destinationWeigthUnitsChooserComponent

         Dialog {
             id: weigthUnitsChooserDialog
             title: i18n.tr("Found "+weigthUnitsListModel.count+ " weigth units")

             OptionSelector {
                 id: weigthUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: weigthUnitsListModelDelegate
                 model: weigthUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(weigthUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         destinationUnitChooserButton.text = weigthUnitsListModel.get(weigthUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(weigthUnitsChooserDialog)
                     }
                 }
             }
         }
     }

     onVisibleChanged: {
              pageLoader.source = (root.width > units.gu(80)) ? "WeigthPageContentTablet.qml" : "WeigthPageContentPhone.qml"
     }

}
