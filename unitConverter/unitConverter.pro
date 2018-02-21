TEMPLATE = aux
TARGET = unitConverter

RESOURCES +=  unitconverter.qrc


QML_FILES += $$files(*.qml,true) \
             $$files(*.png,true) \
             $$files(*.js,true)

CONF_FILES +=  unitConverter.apparmor \
               unitConverter.png

AP_TEST_FILES += tests/autopilot/run \
                 $$files(tests/*.py,true)               

OTHER_FILES += $${CONF_FILES} \
               $${QML_FILES} \
               $${AP_TEST_FILES} \
               unitConverter.desktop

#specify where the qml/js files are installed to
qml_files.path = /unitConverter
qml_files.files += $${QML_FILES}

#specify where the config files are installed to
config_files.path = /unitConverter
config_files.files += $${CONF_FILES}

#install the desktop file, a translated version is 
#automatically created in the build directory
desktop_file.path = /unitConverter
desktop_file.files = $$OUT_PWD/unitConverter.desktop
desktop_file.CONFIG += no_check_exist

INSTALLS+=config_files qml_files desktop_file

DISTFILES += \
    WeigthPage.qml \
    VolumePage.qml \
    TemperaturePage.qml \
    PressurePage.qml \
    LengthPage.qml \
    AreaPage.qml \
    InvalidInputPopUp.qml \
    ProductInfoDialogue.qml \
    LengthPagePhone.qml \
    AreaPagePhone.qml \
    PressurePagePhone.qml \
    TemperaturePagePhone.qml \
    VolumePagePhone.qml \
    WeigthPagePhone.qml
