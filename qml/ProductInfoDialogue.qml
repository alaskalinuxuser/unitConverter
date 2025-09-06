import QtQuick 2.4
import Lomiri.Components 1.3
import Lomiri.Components.Popups 1.3


/* General info about the application */
Dialog {
       id: aboutProductDialogue
       title: i18n.tr("Product Info")
       text: "UnitConverter version "+root.appVersion+"<br/>"+ i18n.tr("A simple offline unit of measure converter.")+" <br/> Author: fulvio"

       Button {
           text: "Close"
           onClicked: PopupUtils.close(aboutProductDialogue)
       }
}
