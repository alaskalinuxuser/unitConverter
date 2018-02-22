import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Components.Popups 1.3
import Ubuntu.Components.Pickers 1.3
import Ubuntu.Components.ListItems 1.3 as ListItem

import QtQuick.LocalStorage 2.0

import "Storage.js"  as Storage
import "Utility.js" as Utility

/*
  Length unit converter page
*/

Page {
     id: lengthPage
     visible: false

     /* default is today, after is updated when the user chose a date with the TimePicker */
     property string targetDate : Qt.formatDateTime(new Date(), "yyyy-MM-dd");

     header: PageHeader {
        title: i18n.tr("Length conversions")

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
         id: lengthUnitsListModelDelegate
         OptionSelectorDelegate { text: sourceUnit; subText: sourceUnitSymbol; }
     }

     /* ------------- Source Unit --------------- */
     Component {
         id: sourceLengthUnitsChooserComponent

         Dialog {
             id: lengthUnitsChooserDialog
             title: i18n.tr("Found "+lengthUnitsListModel.count+ " length units")

             OptionSelector {
                 id: lengthUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: lengthUnitsListModelDelegate
                 model: lengthUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(lengthUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         sourceUnitChooserButton.text = lengthUnitsListModel.get(lengthUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(lengthUnitsChooserDialog)
                     }
                 }
             }
         }
     }


     /* ------------- Destination Unit --------------- */
     Component {
         id: destinationLengthUnitsChooserComponent

         Dialog {
             id: lengthUnitsChooserDialog
             title: i18n.tr("Found "+lengthUnitsListModel.count+ " length units")

             OptionSelector {
                 id: lengthUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: lengthUnitsListModelDelegate
                 model: lengthUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(lengthUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         destinationUnitChooserButton.text = lengthUnitsListModel.get(lengthUnitsOptionSelector.selectedIndex).sourceUnit;
                         //reset previous convertions
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(lengthUnitsChooserDialog)
                     }
                 }
             }
         }
     }

     Column{
        id: lengthPageColumn
        spacing: units.gu(2)
        anchors.fill: parent

        /* transparent placeholder: to place the content under the header */
        Rectangle {
            color: "transparent"
            width: parent.width
            height: units.gu(6)
        }

        Row{
            id: sourceUnitRow
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(2)

            Label{
                id: sourceUnitLabel
                anchors.verticalCenter: sourceUnitChooserButton.verticalCenter
                text: i18n.tr("From:")
            }

            TextField{
                id: valueToConvertField
                width: units.gu(20)
                enabled:true
            }

            Button{
                id: sourceUnitChooserButton
                width: units.gu(25)
                color: UbuntuColors.warmGrey
                iconName: "find"
                text: i18n.tr("Choose...")
                onClicked:  {
                    PopupUtils.open(sourceLengthUnitsChooserComponent, sourceUnitChooserButton)
                }
            }
        }

        /* ------------------ Destination Unit ------------------ */
        Row{
            id: destinationUnitRow
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(3)

            Label{
                id: destinationUnitLabel
                anchors.verticalCenter: destinationUnitChooserButton.verticalCenter
                text: i18n.tr("To:")
            }

            /* transparent placeholder: required to place the content under the header */
            Rectangle {
                 color: "transparent"
                 width: valueToConvertField.width
                 height: units.gu(6)
            }

            Button{
                id: destinationUnitChooserButton
                x: sourceUnitChooserButton.x
                width: units.gu(25)
                color: UbuntuColors.warmGrey
                iconName: "find"
                text: i18n.tr("Choose...")
                onClicked:  {
                    PopupUtils.open(destinationLengthUnitsChooserComponent, destinationUnitChooserButton)
                }
            }
        }

        /* ------------ Result Row ----------- */
        Row{
            id: resultRow
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(3)

            /* transparent placeholder: required to place the content under the header */
            Rectangle {
                 color: "transparent"
                 width: destinationUnitLabel.width
                 height: units.gu(6)
            }

            TextField{
                id: convertedValue
                width: units.gu(20)
                enabled:false
            }

            Button{
                id: doConvertionButton
                width: units.gu(25)
                color: UbuntuColors.green
                text: i18n.tr("Convert")
                onClicked:  {
                    /* Perform conversion */
                    if(Utility.isInputTextEmpty(valueToConvertField.text) || Utility.isNotNumeric(valueToConvertField.text)) {
                        PopupUtils.open(invalidInputAlert);
                    } else {
                        convertedValue.text = Storage.convertLength(sourceUnitChooserButton.text,destinationUnitChooserButton.text, valueToConvertField.text.trim());
                        convertedValue.enabled = true;
                    }
                }
            }
        }

        Row{
            id: infoRow
            anchors.horizontalCenter: parent.horizontalCenter

            Label{
                id:noteLabel
                text: i18n.tr("Note: the decimal separtor in use is '.'")
            }
        }


     }




}


