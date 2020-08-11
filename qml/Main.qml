import QtQuick 2.4
import Ubuntu.Components 1.3
import Ubuntu.Components.Popups 1.3
import Qt.labs.settings 1.0
import QtQuick.LocalStorage 2.0

import "js/Storage.js" as Storage

import "images"

/*
   Aplication MainView
*/
MainView {

    id: root
    objectName: "mainView"

    automaticOrientation: true
    anchorToKeyboard: true

    // Note! applicationName needs to match the "name" field of the click manifest
    applicationName: "unitconverter.fulvio"

    /* enable to test with dark theme */
    //theme.name: "Ubuntu.Components.Themes.SuruDark"

    property string appVersion : "1.6"

    //rel
    width: units.gu(100)
    height: units.gu(75)

    /* phone 4.5 */
    //width: units.gu(50)
    //height: units.gu(96)

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

            /* numeric conversions values are inserted by Javascript code. No DB stored info */

            settings.isFirstUse = false
        }

        /* Fill all the Combo box List modeles for each unit */
        Storage.getLengthUnit();
        Storage.getAreaUnit();
        Storage.getVolumeUnit();
        Storage.getWeigthUnit();
        Storage.getTemperatureUnit();
        Storage.getPressureUnit();

        /* numeric conversions are calculated at runtime by Javascript. No stored info */
        Storage.getNumericUnit();
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

    /* The available numeric unit loaded at App startUp */
    ListModel {
        id: numericUnitsListModel
    }

    Component {
       id: invalidInputAlert
       InvalidInputPopUp{msg: i18n.tr("Invaid Input")}
    }

    //------- Pages for Phone -----------
    Component {
       id: lengthPagePhone
       LengthPagePhone{}
    }

    Component {
       id: areaPagePhone
       AreaPagePhone{}
    }

    Component {
       id: volumePagePhone
       VolumePagePhone{}
    }

    Component {
       id: weigthPagePhone
       WeigthPagePhone{}
    }

    Component {
       id: temperaturePagePhone
       TemperaturePagePhone{}
    }

    Component {
       id: pressurePagePhone
       PressurePagePhone{}
    }

    Component {
       id: numericPagePhone
       NumericPagePhone{}
    }
    //------------------------------------


    //------- Pages for Tablet -----------
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

    Component {
       id: numericPage
       NumericPage{}
    }
    //---------------------------------


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


            property int n_columns: height > width ? 3 : 4
            property int n_rows: height > width ? 4 : 3
            property int rectangle_container_size: Math.min (width / n_columns, height / n_rows) * 0.8
            property int rectangle_container_radius: 10
            property int rectangle_container_x_spacing: (width - rectangle_container_size * n_columns) / (n_columns + 1)
            property int rectangle_container_y_spacing: (height - rectangle_container_size * n_rows) / (n_rows + 1)


            Grid {
                x: mainPage.rectangle_container_x_spacing
                y: mainPage.rectangle_container_y_spacing + units.gu(5)
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
                            id: lengthImage
                            source: Qt.resolvedUrl("./images/length.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("Length");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: lengthImage.bottom
                        }

                        onClicked: {
                            if (root.width > units.gu(80)){
                                pageStack.push(lengthPage)
                            }else {
                               pageStack.push(lengthPagePhone)
                            }
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
                            id: areaImage
                            source: Qt.resolvedUrl("./images/area.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("Area");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: areaImage.bottom
                        }

                        onClicked: {
                            if (root.width > units.gu(80)){
                                pageStack.push(areaPage)
                            }else {
                               pageStack.push(areaPagePhone)
                            }
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
                            id: volumeImage
                            source: Qt.resolvedUrl("./images/volume.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("Volume");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: volumeImage.bottom
                        }

                        onClicked: {
                            if (root.width > units.gu(80)){
                                pageStack.push(volumePage)
                            }else {
                               pageStack.push(volumePagePhone)
                            }
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
                            id: weightImage
                            source: Qt.resolvedUrl("./images/weight.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("Weight");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: weightImage.bottom
                        }

                        onClicked: {

                            if(root.width > units.gu(80)) {
                                pageStack.push(weigthPage)
                            }else {
                               pageStack.push(weigthPagePhone)
                            }
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
                            id: temperatureImage
                            source: Qt.resolvedUrl("./images/temperature.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("Temperature");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: temperatureImage.bottom
                        }

                        onClicked: {

                            if(root.width > units.gu(80)) {
                                pageStack.push(temperaturePage)
                            }else {
                               pageStack.push(temperaturePagePhone)
                            }
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
                            id:pressureImage
                            source: Qt.resolvedUrl("./images/pressure.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("pressure");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: pressureImage.bottom
                        }

                        onClicked: {

                            if(root.width > units.gu(80)) {
                                pageStack.push(pressurePage)
                            }else {
                               pageStack.push(pressurePagePhone)
                            }
                        }
                    }
                }

             		Rectangle {
                    id: numericMenu
                    width: mainPage.rectangle_container_size
                    height: mainPage.rectangle_container_size
                    color: UbuntuColors.porcelain
                    border.color: "black"
                    MouseArea {
                        anchors.fill: parent;

                        Image {
                            id: numericImage
                            source: Qt.resolvedUrl("./images/numeric.png")
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: parent.verticalCenter
                            width: parent.width * 0.8
                            height: parent.height * 0.8
                            fillMode: Image.PreserveAspectFit
                        }

                        Text {
                            text: i18n.tr("Numeric");
                            anchors.horizontalCenter: parent.horizontalCenter
                            anchors.verticalCenter: numericImage.bottom
                        }

                        onClicked: {
                            if (root.width > units.gu(80)){
                                pageStack.push(numericPage)
                            }else {
                               pageStack.push(numericPagePhone)
                            }
                        }
                    }
                }
		            //--------------
            }
        }

    }

 }
