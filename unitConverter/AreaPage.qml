import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Components.Popups 1.3
import Ubuntu.Components.Pickers 1.3

import Ubuntu.Components.ListItems 1.3 as ListItem
import QtQuick.LocalStorage 2.0

import "Storage.js"  as Storage
import "Utility.js" as Utility

/*
  Area unit converter page
*/

Page {
     id: areaPage
     visible: false

     /* default is today, after is updated when the user chose a date with the TimePicker */
     property string targetDate : Qt.formatDateTime(new Date(), "yyyy-MM-dd");

     header: PageHeader {
        title: i18n.tr("Area conversions")

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
         id: areaUnitsListModelDelegate
         OptionSelectorDelegate { text: sourceUnit; subText: sourceUnitSymbol; }
     }

     /* ------------- Source Unit --------------- */
     Component {
         id: sourceAreaUnitsChooserComponent

         Dialog {
             id: areaUnitsChooserDialog
             title: i18n.tr("Found "+areaUnitsListModel.count+ "area units")

             OptionSelector {
                 id: areaUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: areaUnitsListModelDelegate
                 model: areaUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(areaUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         sourceUnitChooserButton.text = areaUnitsListModel.get(areaUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(areaUnitsChooserDialog)
                     }
                 }
             }
         }
     }


     /* ------------- Destination Unit --------------- */
     Component {
         id: destinationAreaUnitsChooserComponent

         Dialog {
             id: areaUnitsChooserDialog
             title: i18n.tr("Found "+areaUnitsListModel.count+ " area units")

             OptionSelector {
                 id: areaUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: areaUnitsListModelDelegate
                 model: areaUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(areaUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         destinationUnitChooserButton.text = areaUnitsListModel.get(areaUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(areaUnitsChooserDialog)
                     }
                 }
             }
         }
     }

     onVisibleChanged: {
          pageLoader.source = (root.width > units.gu(80)) ? "AreaPageContentTablet.qml" : "AreaPageContentPhone.qml"
     }


}
