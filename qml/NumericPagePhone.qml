import QtQuick 2.4
import Lomiri.Components 1.3
import Lomiri.Components.Popups 1.3
import Lomiri.Components.Pickers 1.3
import Lomiri.Components.ListItems 1.3 as ListItem

import QtQuick.LocalStorage 2.0

import "js/numericBaseConverter.js" as NumericBaseConverter
import "js/Utility.js" as Utility

import "images"

/*
  Numeric unit converter page for Phone
*/

Page {
     id: numericPagePhone
     visible: false

     header: PageHeader {
        title: i18n.tr("Numeric conversions")
     }

     property string fromUnitBase;
     property string toUnitBase;

     /* define how to render the entry in the OptionSelector */
     Component {
         id: numericUnitsListModelDelegate
         OptionSelectorDelegate { text: sourceUnit; }
     }

     /* ------------- Source Unit Chooser --------------- */
     Component {
         id: sourcenumericUnitsChooserComponent

         Dialog {
             id: numericUnitsChooserDialog
             title: i18n.tr("Found")+" "+numericUnitsListModel.count+" "+ i18n.tr("numeric units")

             OptionSelector {
                 id: numericUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: numericUnitsListModelDelegate
                 model: numericUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(numericUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         sourceUnitChooserButton.text = numericUnitsListModel.get(numericUnitsOptionSelector.selectedIndex).sourceUnit;
                         fromUnitBase = numericUnitsListModel.get(numericUnitsOptionSelector.selectedIndex).sourceUnitSymbol;
                         /* reset previous convertions */
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(numericUnitsChooserDialog)
                     }
                 }
             }
         }
     }


     /* ------------- Destination Unit Chooser --------------- */
     Component {
         id: destinationnumericUnitsChooserComponent

         Dialog {
             id: numericUnitsChooserDialog
             title: i18n.tr("Found")+" "+numericUnitsListModel.count+ " "+i18n.tr("numeric units")

             OptionSelector {
                 id: numericUnitsOptionSelector
                 expanded: true
                 multiSelection: false
                 delegate: numericUnitsListModelDelegate
                 model: numericUnitsListModel
                 containerHeight: itemHeight * 4
             }

             Row {
                 spacing: units.gu(2)
                 Button {
                     text: i18n.tr("Close")
                     width: units.gu(14)
                     onClicked: {
                         PopupUtils.close(numericUnitsChooserDialog)
                     }
                 }

                 Button {
                     text: i18n.tr("Select")
                     width: units.gu(14)
                     onClicked: {
                         destinationUnitChooserButton.text = numericUnitsListModel.get(numericUnitsOptionSelector.selectedIndex).sourceUnit;
                         toUnitBase = numericUnitsListModel.get(numericUnitsOptionSelector.selectedIndex).sourceUnitSymbol;
                         /* reset previous convertions */
                         convertedValue.text= ''
                         convertedValue.enabled= false
                         PopupUtils.close(numericUnitsChooserDialog)
                     }
                 }
             }
         }
     }

     Column{
        id: numericPageColumn
        spacing: units.gu(2)
        anchors.fill: parent

        /* transparent placeholder: to place the content under the header */
        Rectangle {
            color: "transparent"
            width: parent.width
            height: units.gu(6)
        }

        /* ------------------ Source Unit row ------------------ */
        Row{
            id: sourceUnitRow
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(1)

            Label{
                id: sourceUnitLabel
                anchors.verticalCenter: valueToConvertField.verticalCenter
                text: i18n.tr("From:")
            }

            TextField{
                id: valueToConvertField
                width: units.gu(25)
                enabled:true
            }
        }

        Row{
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(1)

            Rectangle {
                color: "transparent"
                width: sourceUnitLabel.width
                height: units.gu(1)
            }

            Button{
                id: sourceUnitChooserButton
                x: valueToConvertField.x
                width: units.gu(25)
                color: LomiriColors.warmGrey
                iconName: "find"
                text: i18n.tr("Choose...")
                onClicked:  {
                    PopupUtils.open(sourcenumericUnitsChooserComponent, sourceUnitChooserButton)
                }
            }
        }

        /* line separator */
        Rectangle {
            color: "grey"
            width: parent.width
            anchors.horizontalCenter: parent.horizontalCenter
            height: units.gu(0.1)
        }

        /* ------------------ Destination Unit row ------------------ */
        Row{
            id: destinationUnitRow
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(3)

            Label{
                id: destinationUnitLabel
                anchors.verticalCenter: destinationUnitChooserButton.verticalCenter
                text: i18n.tr("To:")
            }

            Button{
                id: destinationUnitChooserButton
                x: sourceUnitChooserButton.x
                width: units.gu(25)
                color: LomiriColors.warmGrey
                iconName: "find"
                text: i18n.tr("Choose...")
                onClicked:  {
                    PopupUtils.open(destinationnumericUnitsChooserComponent, destinationUnitChooserButton)
                }
            }
        }

        /* ------------ Convert Row ----------- */
        Row{
            anchors.horizontalCenter: parent.horizontalCenter
            spacing:units.gu(3)

            /* transparent placeholder */
            Rectangle {
                 color: "transparent"
                 width: destinationUnitLabel.width
                 height: units.gu(6)
            }

            Button{
                id: doConvertionButton
                width: units.gu(25)
                color: LomiriColors.green
                text: i18n.tr("Convert")
                onClicked:  {
                    /* Perform conversion */
                    if(Utility.isInputTextEmpty(valueToConvertField.text)) {
                        PopupUtils.open(invalidInputAlert);
                    } else {
                        convertedValue.text = NumericBaseConverter.convertBase(valueToConvertField.text.trim(), fromUnitBase, toUnitBase);
                        convertedValue.enabled = true;
                    }
                }
            }
        }

        /* ------------ Result Row ----------- */
        Row{
            id: resultRow
            anchors.horizontalCenter: parent.horizontalCenter
            /* uses a textArea to contains large binary*/
            TextArea {
                  id: convertedValue
                  enabled:false
                  width: destinationUnitRow.width
                  height: units.gu(8)
                  textFormat: TextEdit.AutoText
                  selectByMouse: true
           }
       }

     }
}
