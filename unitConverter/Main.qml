import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Components.Popups 1.3
import Qt.labs.settings 1.0
import QtQuick.LocalStorage 2.0

import "Storage.js"  as Storage

/*!
    \brief Aplication MainView
*/
MainView {

    id: root
    objectName: "mainView"

    automaticOrientation: true
    anchorToKeyboard: true

    // Note! applicationName needs to match the "name" field of the click manifest
    applicationName: "unitconverter.fulvio"

    property string appVersion : "1.2"

    width: units.gu(100)
    height: units.gu(75)

    Settings {
       id:settings
       /* to insert or not the default converions entry */
       property bool isFirstUse: true;
    }

    Component.onCompleted: {

        if(settings.isFirstUse == true){
            /* the table with all the supporte unit of measurement */
            Storage.createMeasureUnitTables();
            Storage.insertUnitOfMeasureEntry();

            Storage.createConvertionTables();

            Storage.insertLengthDefaultConvertionEntry();
            Storage.insertAreaDefaultConvertionEntry();
            Storage.insertVolumeDefaultConvertionEntry();
            Storage.insertWeigthDefaultConvertionEntry();
            Storage.insertTemperatureDefaultConvertionEntry();
            Storage.insertPressureDefaultConvertionEntry();

            settings.isFirstUse = false
        }

        /* Fill all the Combo box List modeles for each unit */
        Storage.getLengthUnit();
        Storage.getAreaUnit();
        Storage.getVolumeUnit();
        Storage.getWeigthUnit();
        Storage.getTemperatureUnit();
        Storage.getPressureUnit();
    }

    Component {
       id: productInfoDialogue
       ProductInfoDialogue{}
    }

    /* The available Length unit loaded at App startUp */
    ListModel {
        id: lengthUnitsListModel
    }

    /* The available Area unit loaded at App startUp */
    ListModel {
        id: areaUnitsListModel
    }

    /* The available Volume unit loaded at App startUp */
    ListModel {
        id: volumeUnitsListModel
    }

    /* The available weigth unit loaded at App startUp */
    ListModel {
        id: weigthUnitsListModel
    }

    /* The available Temperature unit loaded at App startUp */
    ListModel {
        id: temperatureUnitsListModel
    }

    /* The available Pressure unit loaded at App startUp */
    ListModel {
        id: pressureUnitsListModel
    }

    Component {
       id: invalidInputAlert
       InvalidInputPopUp{msg: "Invaid Input"}
    }

    Component {
       id: lengthPage
       LengthPage{}
    }

    Component {
       id: areaPage
       AreaPage{}
    }

    Component {
       id: volumePage
       VolumePage{}
    }

    Component {
       id: weigthPage
       WeigthPage{}
    }

    Component {
       id: temperaturePage
       TemperaturePage{}
    }

    Component {
       id: pressurePage
       PressurePage{}
    }

    PageStack {
        id: pageStack

        /* set the firts page of the application */
        Component.onCompleted: {
            pageStack.push(mainPage);
        }

        Page {
            id:mainPage

            header: PageHeader {
                title: "unitConverter"

                leadingActionBar.actions: [
                    Action {
                        id: aboutPopover
                        /* note: icons names are file names under: /usr/share/icons/suru */
                        iconName: "info"
                        text: i18n.tr("About")
                        onTriggered:{
                            PopupUtils.open(productInfoDialogue)
                        }
                    }
                ]                
            }


            property int n_columns: height > width ? 2 : 3
            property int n_rows: height > width ? 3 : 2
            property int rectangle_container_size: Math.min (width / n_columns, height / n_rows) * 0.8
            property int rectangle_container_radius: 10
            property int rectangle_container_x_spacing: (width - rectangle_container_size * n_columns) / (n_columns + 1)
            property int rectangle_container_y_spacing: (height - rectangle_container_size * n_rows) / (n_rows + 1)



            Grid {
                x: mainPage.rectangle_container_x_spacing
                y: mainPage.rectangle_container_y_spacing
                columns: mainPage.n_columns
                rows: mainPage.n_rows

                columnSpacing: mainPage.rectangle_container_x_spacing
                rowSpacing: mainPage.rectangle_container_y_spacing


                Rectangle {
                    id: hearthMenu
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.red
                    border.color: "black"
                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            source: "length.png"
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            x: parent.width/3
                            y: parent.height - units.gu(5)
                            text: i18n.tr("Length");
                            anchors.horizontalCenter: parent.horizontalCenter
                        }

                        onClicked: {                           
                            pageStack.push(lengthPage)
                        }
                    }
                }

                Rectangle {
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.blue
                    border.color: "black"
                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            source: "area.png"
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            x: parent.width/3
                            y: parent.height - units.gu(5)
                            text: i18n.tr("Area");
                            anchors.horizontalCenter: parent.horizontalCenter
                        }

                        onClicked: {                           
                            pageStack.push(areaPage)
                        }
                    }
                }

                Rectangle {
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.green
                    border.color: "black"
                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            source: "volume.png"
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.5
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            x: parent.width/3
                            y: parent.height - units.gu(5)
                            text: i18n.tr("Volume");
                            anchors.horizontalCenter: parent.horizontalCenter
                        }

                        onClicked: {                            
                            pageStack.push(volumePage)
                        }
                    }
                }

                Rectangle {
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.orangeGradient
                    border.color: "black"
                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            source: "weight.png"
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            x: parent.width/3
                            y: parent.height - units.gu(5)
                            text: i18n.tr("Weigth");
                            anchors.horizontalCenter: parent.horizontalCenter
                        }

                        onClicked: {                           
                            pageStack.push(weigthPage)
                        }
                    }
                }

                Rectangle {
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.porcelain
                    border.color: "black"
                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            source: "temperature.png"
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.6
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            x: parent.width/3
                            y: parent.height - units.gu(5)
                            text: i18n.tr("Temperature");
                            anchors.horizontalCenter: parent.horizontalCenter
                        }

                        onClicked: {
                            console.log("click temperature")
                            pageStack.push(temperaturePage)
                        }
                    }
                }

                Rectangle{
                    id: settingsMenu;
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.porcelain
                    border.color: "black"

                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            source: "pressure.png"
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.6
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            x: parent.width/3
                            y: parent.height - units.gu(5)
                            text: i18n.tr("pressure");
                            anchors.horizontalCenter: parent.horizontalCenter
                        }

                        onClicked: {                           
                            pageStack.push(pressurePage)
                        }
                    }
                }
            }
        }

    }

 }
