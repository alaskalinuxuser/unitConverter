/*
  Conversion function used for conversions between different numeric bases
*/

function convertBase(val, fromBase, toBase) {

  //console.log("converting value:"+val+" from base: "+fromBase+ " to base: "+toBase)

  if(typeof(val) == "number") {
    return parseInt(String(val)).toString(toBase);

  } else {
     return parseInt(val.toString(), fromBase).toString(toBase)
  }

}
