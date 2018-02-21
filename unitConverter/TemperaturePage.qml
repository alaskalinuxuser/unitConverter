import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Components.Popups 1.3
import Ubuntu.Components.Pickers 1.3

import Ubuntu.Components.ListItems 1.3 as ListItem
import QtQuick.LocalStorage 2.0

import "Storage.js"  as Storage
import "Utility.js" as Utility

/*
  Temperature unit converter page
*/

Page {
     id: temperaturePage
     visible: false

     /* default is today, after is updated when the user chose a date with the TimePicker */
     property string targetDate : Qt.formatDateTime(new Date(), "yyyy-MM-dd");

     header: PageHeader {
        title: i18n.tr("Temperature conversions")

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
         id: temperatureUnitsListModelDelegate
         OptionSelectorDelegate { text: sourceUnit; subText: sourceUnitSymbol; }
     }

     /* ------------- Source Unit --------------- */
     Component {
         id: sourceTemperatureUnitsChooserComponent

         Dialog {
             id: temperatureUnitsChooserDialog
             title: i18n.tr("Found "+temperatureUnitsListModel.count+ " temperature units")

             OptionSelector {
                 id: temperatureUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: temperatureUnitsListModelDelegate
                 model: temperatureUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(temperatureUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         sourceUnitChooserButton.text = temperatureUnitsListModel.get(temperatureUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(temperatureUnitsChooserDialog)
                     }
                 }
             }
         }
     }


     /* ------------- Destination Unit --------------- */
     Component {
         id: destinationTemperatureUnitsChooserComponent

         Dialog {
             id: temperatureUnitsChooserDialog
             title: i18n.tr("Found "+temperatureUnitsListModel.count+ " temperature units")

             OptionSelector {
                 id: temperatureUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: temperatureUnitsListModelDelegate
                 model: temperatureUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(temperatureUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         destinationUnitChooserButton.text = temperatureUnitsListModel.get(temperatureUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(temperatureUnitsChooserDialog)
                     }
                 }
             }
         }
    }

    onVisibleChanged: {
        pageLoader.source = (root.width > units.gu(80)) ? "TemperaturePageContentTablet.qml" : "TemperaturePageContentPhone.qml"
    }

}
