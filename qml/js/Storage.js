


//----------------------------------- UTILITY FUNCTIONS --------------------------------

    /*
      Generate unique Id for
    */
    function getUUID(suffix){
        return  Math.floor((1 + Math.random()) * 10000) +"-"+suffix;
    }


    function getDatabase() {
        return LocalStorage.openDatabaseSync("unitConverterApp_db", "1.0", "StorageDatabase", 1000000);
    }


//----------------------------------- UNIT OF MEASURE TABLES --------------------------------

    /* Create the table with the supported unit of measures. The 'unity_type' can be 'area', 'length', volume', 'weigth', 'temperature', 'pressure' */
    function createMeasureUnitTables() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
               tx.executeSql('CREATE TABLE IF NOT EXISTS measureUnit(id INTEGER PRIMARY KEY AUTOINCREMENT, unit_name TEXT, unit_symbol TEXT, unit_type)');
           });
    }


    /* Insert the supported unit of measurement in the measureUnit Table */
    function insertUnitOfMeasureEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {

                //length
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['inches', 'in', 'length']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['millimiters', 'mm', 'length']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['feet', 'ft', 'length']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['meters', 'm', 'length']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['yards', 'yd', 'length']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['miles', 'mi', 'length']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['kilometers', 'km', 'length']);

                //area
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square inches', 'in2', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square millimeters', 'mm2', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square feet', 'ft2', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square meters', 'm2','area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square yards', 'yd2', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['acres', 'ac', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['hectares', 'ha', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square miles', 'mi2', 'area']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['square kilometers', 'km2', 'area']);

                //volume
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['fluid ounces (usa)', 'fl oz', 'volume']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['milliliters', 'ml', 'volume']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['gallons (usa)', 'gal', 'volume']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['liters', 'L', 'volume']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['cubic feet', 'ft3', 'volume']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['cubic meters','m3', 'volume']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['cubic yards', 'yd3', 'volume']);

                //weigth
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['ounces', 'oz', 'weigth']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['grams', 'g', 'weigth']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['pounds', 'lb', 'weigth']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['kilograms', 'kg', 'weigth']);

                //temperature
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['Fahrenheit', 'F', 'temperature']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['Celsius', 'C', 'temperature']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['Kelvin', 'K', 'temperature']);

                //pressure
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['atmosphere', 'atm', 'pressure']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['bar', 'Ba', 'pressure']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['pounds per square inch', 'psi', 'pressure']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['pascal', 'Pa', 'pressure']);
                tx.executeSql('INSERT INTO measureUnit (unit_name, unit_symbol, unit_type) VALUES (?,?,?);', ['torr', 'torr', 'pressure']);

           });
    }


//----------------------------------- CONVERTION TABLES --------------------------------

    /*
        Create the tables with the converion values for each unit of measure
        Note: the formula field, indicates that the 'multiply fields contains a formula instead of a pure number. In the formule the value to convert must be replaced
        at the 'X' placeholder.
    */
    function createConvertionTables() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
               tx.executeSql('CREATE TABLE IF NOT EXISTS lengthConvertion(id INTEGER PRIMARY KEY AUTOINCREMENT, source_unit TEXT, source_unit_symbol TEXT, multiply TEXT, is_formula, destination_unit TEXT, destination_unit_symbol TEXT)');
               tx.executeSql('CREATE TABLE IF NOT EXISTS areaConvertion(id INTEGER PRIMARY KEY AUTOINCREMENT, source_unit TEXT, source_unit_symbol TEXT, multiply TEXT, is_formula, destination_unit TEXT, destination_unit_symbol TEXT)');
               tx.executeSql('CREATE TABLE IF NOT EXISTS volumeConvertion(id INTEGER PRIMARY KEY AUTOINCREMENT, source_unit TEXT, source_unit_symbol TEXT, multiply TEXT, is_formula, destination_unit TEXT, destination_unit_symbol TEXT)');
               tx.executeSql('CREATE TABLE IF NOT EXISTS weigthConvertion(id INTEGER PRIMARY KEY AUTOINCREMENT, source_unit TEXT, source_unit_symbol TEXT, multiply TEXT, is_formula, destination_unit TEXT, destination_unit_symbol TEXT)');
               tx.executeSql('CREATE TABLE IF NOT EXISTS temperatureConvertion(id INTEGER PRIMARY KEY AUTOINCREMENT, source_unit TEXT, source_unit_symbol TEXT, multiply TEXT, is_formula, destination_unit TEXT, destination_unit_symbol TEXT)');
               tx.executeSql('CREATE TABLE IF NOT EXISTS pressureConvertion(id INTEGER PRIMARY KEY AUTOINCREMENT, source_unit TEXT, source_unit_symbol TEXT, multiply TEXT, is_formula, destination_unit TEXT, destination_unit_symbol TEXT)');
           });
    }

    /* Insert the default converion entry in the length Table */
    function insertLengthDefaultConvertionEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '25.4', 'no', 'millimiters', 'mm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['millimiters', 'mm', '0.0393701','no', 'inches', 'in']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '0.3048', 'no', 'meters', 'm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['meters', 'm', '3.28084', 'no', 'feet', 'ft']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '0.9144', 'no', 'meters', 'm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['meters', 'm', '1.09361', 'no', 'yards', 'yd']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['miles', 'mi', '1.60934', 'no', 'kilometers', 'km']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '0.621371', 'no', 'miles', 'mi']);

                //---new
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '0.0833333', 'no','feet', 'ft']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '12', 'no', 'inches', 'in']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '3', 'no', 'feet', 'ft']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '0.333333', 'no', 'yards', 'yd']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['meters', 'm', '0.000621371', 'no', 'miles', 'mi']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['miles', 'mi', '1609.34', 'no', 'meters', 'm']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '1093.61', 'no', 'yards', 'yd']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '0.0009144', 'no', 'kilometers', 'km']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '0.0254', 'no', 'meters', 'm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['meters', 'm', '39.3701', 'no', 'inches', 'in']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '36', 'no', 'inches', 'in']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '0.0277778', 'no', 'yards', 'yd']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['miles', 'mi', '1760', 'no', 'yards', 'yd']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '0.000568182', 'no', 'miles', 'mi']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '39370.1', 'no', 'inches', 'in']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '0.0000254', 'no', 'kilometers', 'km']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['miles', 'mi', '63360', 'no', 'inches', 'in']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '0.0000157828', 'no', 'miles', 'mi']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '36', 'no', 'inches', 'in']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['inches', 'in', '0.0277778', 'no', 'yards', 'yd']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '3', 'no', 'feet', 'ft']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '0.333333', 'no', 'yards', 'yd']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '304.8', 'no', 'millimiters', 'mm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['millimiters', 'mm', '0.00328084', 'no', 'feet', 'ft']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['millimiters', 'mm', '0.001', 'no', 'meters', 'm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['meters', 'm', '1000', 'no', 'millimiters', 'mm']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '1000', 'no', 'meters', 'm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['meters', 'm', '0.001', 'no', 'kilometers', 'km']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '0.0009144', 'no', 'kilometers', 'km']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '1093.61', 'no', 'yards', 'yd']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['miles', 'mi', '1609350', 'no', 'millimiters', 'mm']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['millimiters', 'mm', '0.0000006213688756', 'no', 'miles', 'mi']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '0.0003048', 'no', 'kilometers', 'km']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '3280.84', 'no', 'feet', 'ft']);

                //------
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['millimiters', 'mm', '0.00109361','no', 'yards', 'yd']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['yards', 'yd', '914.4','no', 'millimiters', 'mm']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['millimiters', 'mm', '0.000001','no', 'kilometers', 'km']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilometers', 'km', '1000000','no', 'millimiters', 'mm']);

                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['feet', 'ft', '0.000189394','no', 'miles', 'mi']);
                tx.executeSql('INSERT INTO lengthConvertion (source_unit, source_unit_symbol, multiply, is_formula,destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['miles', 'mi', '5280','no', 'feet', 'ft']);


           });
    }


    /* Insert the default converion entry in the area Table */
    function insertAreaDefaultConvertionEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '645.2', 'no', 'square millimeters', 'mm2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.0016', 'no', 'square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '0.093', 'no', 'square meters', 'm2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '10.764', 'no', 'square feet', 'ft2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '0.836', 'no', 'square meters', 'm2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '1.195', 'no', 'square yards', 'yd2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '0.4046856422', 'no', 'hectares', 'ha']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '2.4710538147', 'no', 'acres', 'ac']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '2.59', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '0.386102', 'no', 'square miles', 'mi2']);

                //New
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '1195990.0463', 'no', 'square yards', 'yd2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '0.000000836', 'no', 'square kilometers', 'km2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '0.0015624989', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '640.00046695', 'no', 'acres', 'ac']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '247.10538147', 'no', 'acres', 'ac']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '0.0040468564', 'no', 'square kilometers', 'km2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '0.000247105', 'no', 'acres', 'ac']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '4046.86', 'no', 'square meters', 'm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '0.0001', 'no', 'hectares', 'ha']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '10000', 'no', 'square meters', 'm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '0.0000003861018768', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '2589990', 'no', 'square meters', 'm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '0.000001', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '1000000', 'no', 'square meters', 'm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '0.1111111111', 'no', 'square yards', 'yd2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '9', 'no', 'square feet', 'ft2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '0.0000229568', 'no', 'acres', 'ac']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '43560', 'no', 'square feet', 'ft2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '0.0000092903', 'no', 'hectares', 'ha']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '107639.10417', 'no', 'square feet', 'ft2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '0.0000000358700381', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '27878420.34', 'no', 'square feet', 'ft2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '0.00000009290304', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '10763910.417', 'no', 'square feet', 'ft2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.00000000009999999999', 'no', 'hectares', 'ha']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '10000000000', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.0000000000003861018768', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '2589990000000', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.000000000001', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '1000000000000', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '0.0002066116', 'no', 'acres', 'ac']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '4840', 'no', 'square yards', 'yd2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.0069444444', 'no', 'square feet', 'ft2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '144', 'no', 'square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.00064516', 'no', 'square meters', 'm2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '1550.0031', 'no', 'square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.0007716049', 'no', 'square yards', 'yd2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '1296', 'no', 'square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.0000107639', 'no', 'square feet', 'ft2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square feet', 'ft2', '92903.04', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.000001', 'no', 'square meters', 'm2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square meters', 'm2', '1000000', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.000001196', 'no', 'square yards', 'yd2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '836127.36', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square millimeters', 'mm2', '0.0000000002471053814', 'no', 'acres', 'ac']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '4046856422.4', 'no', 'square millimeters', 'mm2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '0.0000836127', 'no', 'hectares', 'ha']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '11959.900463', 'no', 'square yards', 'yd2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '0.0000003228303429', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '3097602.26', 'no', 'square yards', 'yd2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square yards', 'yd2', '0.00000083612736', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '1195990.0463', 'no', 'square yards', 'yd2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '0.0015624989', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '640.00046695', 'no', 'acres', 'ac']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '0.0040468564', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '247.10538147','no', 'acres', 'ac']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '0.0038610188', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '258.999', 'no', 'hectares', 'ha']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '0.01', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '100', 'no', 'hectares', 'ha']);

                //-------------
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.00000015942', 'no', 'acres', 'ac']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['acres', 'ac', '6272640', 'no', 'square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.000000064516', 'no','hectares', 'ha']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['hectares', 'ha', '15500031', 'no', 'square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.0000000002490974868', 'no', 'square miles', 'mi2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square miles', 'mi2', '4014492529', 'no','square inches', 'in2']);

                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square inches', 'in2', '0.00000000064516', 'no', 'square kilometers', 'km2']);
                tx.executeSql('INSERT INTO areaConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['square kilometers', 'km2', '1550003100', 'no', 'square inches', 'in2']);

           });
    }


    /* Insert the default converion entry in the volume Table */
    function insertVolumeDefaultConvertionEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['fluid ounces (usa)', 'fl oz', '29.57', 'no', 'milliliters', 'mL']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['milliliters', 'ml', '0.034', 'no', 'fluid ounces (usa)', 'fl oz']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '3.78541', 'no', 'liters', 'L']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['liters', 'L', '0.264172', 'no', 'gallons (usa)', 'gal']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic feet', 'ft3', '0.028', 'no','cubic meters', 'm3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic meters', 'm3', '35.314', 'no', 'cubic feet', 'ft3']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '0.765', 'no', 'cubic meters', 'm3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic meters', 'm3', '1.307', 'no', 'cubic yards', 'yd3']);

                //New
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '0.00378541', 'no', 'cubic meters', 'm3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic meters', 'm3', '264.172', 'no', 'gallons (usa)', 'gal']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['milliliters', 'ml', '0.000264172', 'no', 'gallons (usa)', 'gal']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '3785.41', 'no', 'milliliters', 'ml']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '27', 'no', 'cubic feet', 'ft3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic feet', 'ft3', '0.037037037', 'no', 'cubic yards', 'yd3']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '0.0049511294', 'no', 'cubic yards', 'yd3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '201.97412116', 'no', 'gallons (usa)', 'gal']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['fluid ounces (usa)', 'fl oz', '0.0284131', 'no', 'liters', 'L']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['liters', 'L', '35.1951', 'no', 'fluid ounces (usa)', 'fl oz']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['liters', 'L', '0.0353147', 'no', 'cubic feet', 'ft3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic feet', 'ft3', '28.3168', 'no', 'liters', 'L']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['fluid ounces (usa)', 'fl oz', '0.0078125', 'no', 'gallons (usa)', 'gal']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '128', 'no', 'fluid ounces (usa)', 'fl oz']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['fluid ounces (usa)', 'fl oz', '0.00104438', 'no', 'cubic feet', 'ft3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic feet', 'ft3', '957.506', 'no', 'fluid ounces (usa)', 'fl oz']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['fluid ounces (usa)', 'fl oz', '0.000029574', 'no', 'cubic meters', 'm3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic meters', 'm3', '33814', 'no', 'fluid ounces (usa)', 'fl oz']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['fluid ounces (usa)', 'fl oz', '0.0000386807', 'no', 'cubic yards', 'yd3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '25852.687509', 'no', 'fluid ounces (usa)', 'fl oz']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['milliliters', 'ml', '0.001', 'no', 'liters', 'L']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['liters', 'L', '1000', 'no', 'milliliters', 'ml']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['milliliters', 'ml', '0.0000353147', 'no', 'cubic feet', 'ft3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic feet', 'ft3', '28316.846592', 'no', 'milliliters', 'ml']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['milliliters', 'ml', '0.000001', 'no', 'cubic meters', 'm3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic meters', 'm3', '1000000', 'no', 'milliliters', 'ml']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['milliliters', 'ml', '0.000001308', 'no', 'cubic yards', 'yd3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '764554.85798', 'no', 'milliliters', 'ml']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '0.1336804926', 'no', 'cubic feet', 'ft3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic feet', 'ft3', '7.480523006', 'no', 'gallons (usa)', 'gal']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['gallons (usa)', 'gal', '0.0049511294', 'no', 'cubic yards', 'yd3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '201.97412116', 'no', 'gallons (usa)', 'gal']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['liters', 'L', '0.001', 'no', 'cubic meters', 'm3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic meters', 'm3', '1000', 'no', 'liters', 'L']);

                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['liters', 'L', '0.0013079506', 'no', 'cubic yards', 'yd3']);
                tx.executeSql('INSERT INTO volumeConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['cubic yards', 'yd3', '764.55485798', 'no', 'liters', 'L']);

               //------
           });
    }


    /* Insert the default converion entry in the weigth table */
    function insertWeigthDefaultConvertionEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['ounces', 'oz', '28.35', 'no', 'grams', 'g']);
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['grams', 'g', '0.035', 'no', 'ounces', 'oz']);

                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds', 'lb', '0.453592', 'no', 'kilograms', 'kg']);
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilograms', 'kg', '2.202', 'no', 'pounds', 'lb']);

                //NEW
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilograms', 'kg', '35.274', 'no', 'ounces', 'oz']);
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['ounces', 'oz', '0.0283495', 'no', 'kilograms', 'kg']);

                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['grams', 'g', '0.00220462', 'no', 'pounds', 'lb']);
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds', 'lb', '453.592', 'no', 'grams', 'g']);

                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['ounces', 'oz', '0.0625', 'no', 'pounds', 'lb']);
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds', 'lb', '16', 'no', 'ounces', 'oz']);

                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['grams', 'g', '0.001', 'no', 'kilograms', 'kg']);
                tx.executeSql('INSERT INTO weigthConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['kilograms', 'kg', '1000', 'no', 'grams', 'g']);

                //------
           });
    }


    /* Insert the default converion entry in the temperature table. NOTE: for temparature values, the 'multiply' is a value to add/subtract */
    function insertTemperatureDefaultConvertionEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {
                tx.executeSql('INSERT INTO temperatureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['Fahrenheit', 'F', 'X-32/1.8000', 'yes', 'Celsius', 'C']);
                tx.executeSql('INSERT INTO temperatureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['Celsius', 'C', '33.8', 'yes', 'Fahrenheit', 'F']);

                tx.executeSql('INSERT INTO temperatureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['Celsius', 'C', '274.15', 'yes', 'Kelvin', 'K']);
                tx.executeSql('INSERT INTO temperatureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['Kelvin', 'K', '-272.15', 'yes', 'Celsius', 'C']);

                tx.executeSql('INSERT INTO temperatureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['Fahrenheit', 'F', '255.92777778', 'yes', 'Kelvin', 'K']);
                tx.executeSql('INSERT INTO temperatureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['Kelvin', 'K', '-457.87', 'yes', 'Fahrenheit', 'F']);

           });
    }


    /* Insert the default converion entry in the pressure table */
    function insertPressureDefaultConvertionEntry() {
        var db = getDatabase();
        db.transaction(
           function(tx) {

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['atmosphere', 'atm', '1.01325', 'no', 'bar', 'Ba']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['bar', 'Ba', '0.986923', 'no', 'atmosphere', 'atm']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['atmosphere', 'atm', '14.6959', 'no', 'pounds per square inch', 'psi']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds per square inch', 'psi', '0.068046', 'no', 'atmosphere', 'atm']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['atmosphere', 'atm', '101325', 'no', 'pascal', 'Pa']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pascal', 'Pa', '0.0000098692', 'no', 'atmosphere', 'atm']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['atmosphere', 'atm', '760', 'no', 'torr', 'torr']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['torr', 'torr', '0.00131579', 'no', 'atmosphere', 'atm']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['bar', 'Ba', '14.5038', 'no', 'pounds per square inch', 'psi']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds per square inch', 'psi', '0.0689476', 'no','bar', 'Ba']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['bar', 'Ba', '100000', 'no', 'pascal', 'Pa']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pascal', 'Pa', '0.00001', 'no', 'bar', 'Ba']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['bar', 'Ba', '750.062', 'no', 'torr', 'torr']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['torr', 'torr', '0.00133322', 'no', 'bar', 'Ba']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds per square inch', 'psi', '0.0689476', 'no', 'bar', 'Ba']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['bar', 'Ba', '14.5038', 'no', 'pounds per square inch', 'psi']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds per square inch', 'psi', '6894.76', 'no', 'pascal', 'Pa']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pascal', 'Pa', '0.000145038', 'no', 'pounds per square inch', 'psi']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pounds per square inch', 'psi', '51.7149', 'no', 'torr', 'torr']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['torr', 'torr', '0.0193368', 'no', 'pounds per square inch', 'psi']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['pascal', 'Pa', '0.00750062', 'no', 'torr', 'torr']);
               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['torr', 'torr', '133.322', 'no', 'pascal', 'Pa']);

               tx.executeSql('INSERT INTO pressureConvertion (source_unit, source_unit_symbol, multiply, is_formula, destination_unit, destination_unit_symbol) VALUES (?,?,?,?,?,?);', ['atmosphere', 'atm', '101325', 'no', 'pascal', 'Pa']);

           });
    }


/* ----- Functions used to fill the Combo box with the measure units -------- */

    /* get the names of the Length unit to show them in the combo box */
    function getLengthUnit() {

        var db = getDatabase();
        var rs;
        db.transaction(function(tx) {
            rs = tx.executeSql("SELECT unit_name, unit_symbol FROM measureUnit WHERE unit_type='length'");
        }

        );

        /* Fill the ComboListModel */
        for(var i =0;i < rs.rows.length;i++) {
           lengthUnitsListModel.append({"sourceUnit" : rs.rows.item(i).unit_name, "sourceUnitSymbol" : rs.rows.item(i).unit_symbol } );
           /* console.log("Found length sourceUnit: "+rs.rows.item(i).unit_name +" sourceUnitSymbol: "+rs.rows.item(i).source_unit_symbol); */
        }
    }

    /* get the names of the Area unit to show them in the combo box */
    function getAreaUnit() {

        var db = getDatabase();
        var rs;
        db.transaction(function(tx) {
            rs = tx.executeSql("SELECT unit_name, unit_symbol FROM measureUnit WHERE unit_type='area'");
        }

        );

        /* Fill the ComboListModel */
        for(var i =0;i < rs.rows.length;i++) {
           areaUnitsListModel.append({"sourceUnit" : rs.rows.item(i).unit_name, "sourceUnitSymbol" : rs.rows.item(i).unit_symbol } );
           /* console.log("Found length sourceUnit: "+rs.rows.item(i).unit_name +" sourceUnitSymbol: "+rs.rows.item(i).unit_symbol); */
        }
    }

    /* get the names of the Volume unit to show them in the combo box */
    function getVolumeUnit() {

        var db = getDatabase();
        var rs;
        db.transaction(function(tx) {
            rs = tx.executeSql("SELECT unit_name, unit_symbol FROM measureUnit WHERE unit_type='volume'");
        }

        );

        /* Fill the ComboListModel */
        for(var i =0;i < rs.rows.length;i++) {
           volumeUnitsListModel.append({"sourceUnit" : rs.rows.item(i).unit_name, "sourceUnitSymbol" : rs.rows.item(i).unit_symbol } );
           /* console.log("Found length sourceUnit: "+rs.rows.item(i).unit_name +" sourceUnitSymbol: "+rs.rows.item(i).unit_symbol); */
        }
    }


    /* get the names of the Weigth unit to show them in the combo box */
    function getWeigthUnit() {

        var db = getDatabase();
        var rs;
        db.transaction(function(tx) {
            rs = tx.executeSql("SELECT unit_name, unit_symbol FROM measureUnit WHERE unit_type='weigth'");
        }

        );

        /* Fill the ComboListModel */
        for(var i =0;i < rs.rows.length;i++) {
           weigthUnitsListModel.append({"sourceUnit" : rs.rows.item(i).unit_name, "sourceUnitSymbol" : rs.rows.item(i).unit_symbol } );
           /* console.log("Found length sourceUnit: "+rs.rows.item(i).unit_name +" sourceUnitSymbol: "+rs.rows.item(i).unit_symbol); */
        }
    }


    /* get the names of the Temperature unit to show them in the combo box */
    function getTemperatureUnit() {

        var db = getDatabase();
        var rs;
        db.transaction(function(tx) {
            rs = tx.executeSql("SELECT unit_name, unit_symbol FROM measureUnit WHERE unit_type='temperature'");
        }

        );

        /* Fill the ComboListModel */
        for(var i =0;i < rs.rows.length;i++) {
           temperatureUnitsListModel.append({"sourceUnit" : rs.rows.item(i).unit_name, "sourceUnitSymbol" : rs.rows.item(i).unit_symbol } );
           /* console.log("Found length sourceUnit: "+rs.rows.item(i).unit_name +" sourceUnitSymbol: "+rs.rows.item(i).unit_symbol); */
        }
    }


    /* get the names of the Temperature unit to show them in the combo box */
    function getPressureUnit() {

        var db = getDatabase();
        var rs;
        db.transaction(function(tx) {
            rs = tx.executeSql("SELECT unit_name, unit_symbol FROM measureUnit WHERE unit_type='pressure'");
        }

        );

        /* Fill the ComboListModel */
        for(var i =0;i < rs.rows.length;i++) {
           pressureUnitsListModel.append({"sourceUnit" : rs.rows.item(i).unit_name, "sourceUnitSymbol" : rs.rows.item(i).unit_symbol } );
           /* console.log("Found length sourceUnit: "+rs.rows.item(i).unit_name +" sourceUnitSymbol: "+rs.rows.item(i).unit_symbol); */
        }
    }

    /* Fill the Numeric List Model unit to show them in the combo box
       NOTE: they are NOT taken from Database, but "Hardcoded" here
    */
    function getNumericUnit() {

        numericUnitsListModel.append({"sourceUnit" : "Decimal", "sourceUnitSymbol" : "10" } );
        numericUnitsListModel.append({"sourceUnit" : "Hexadecimal", "sourceUnitSymbol" : "16" } );
        numericUnitsListModel.append({"sourceUnit" : "Binary", "sourceUnitSymbol" : "2" } );
        numericUnitsListModel.append({"sourceUnit" : "Octal", "sourceUnitSymbol" : "8" } );
    }

/* -------------------------------------------------------------------------- */



    /* Utility function: delete a table content whose name is in argument */
    function deleteTable(tableName){

        var db = getDatabase();
        db.transaction(
           function(tx) {
              tx.executeSql('DELETE FROM '+tableName);
           });
    }


    /* Insert a new conversion entry in the provided table */
    function insertConversionEntry(tableName,sourceUnit,sourceUnitSymbol,multiply,destinationUnit,destinationUnitSymbol) {

        var db = getDatabase();
        var res = "";
        db.transaction(function(tx) {
            var rs = tx.executeSql('INSERT INTO'+tableName+'VALUES (?,?,?,?,?);', [sourceUnit, sourceUnitSymbol, multiply, destinationUnit, destinationUnitSymbol]);
            if (rs.rowsAffected > 0) {
                res = "OK";
            } else {
                res = "Error";
            }
        }
        );
        return res;
    }


    /* get a conversion entry from the given table */
    function getConversionEntry(tableName,sourceUnit,destinationUnit) {

        //console.log("Searching multiply from table: "+tableName+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        var db = getDatabase();
        var rs;

        db.transaction(function(tx) {
            rs = tx.executeSql('SELECT multiply FROM '+tableName+' WHERE source_unit=? and destination_unit=?;',[sourceUnit,destinationUnit]);
        }

        );

        if(rs.rows.item(0) === undefined)
            return 'NA'; /* to generate a NaN value and detect missing conversions */
        else
           return rs.rows.item(0).multiply;
    }


    /* update an existing conversion entry with the provided id in the provided table */
    function updateConverionEntry(tableName,sourceUnit,sourceUnitSymbol,multiply,destinationUnit,destinationUnitSymbol,id){

        var db = getDatabase();
        var res = "";
        db.transaction(function(tx) {
            var rs = tx.executeSql('UPDATE '+tableName+' SET source_unit=?, source_unit_symbol=?, multiply=?, destination_unit=?, destination_unit_symbol=? WHERE id=?;', [sourceUnit,sourceUnitSymbol,multiply,destinationUnit,destinationUnitSymbol,id]);
            if (rs.rowsAffected > 0) {
                res = "OK";
            } else {
                res = "Error";
            }
        }
        );
        return res;
    }


//------------------------------ Convertions methods -------------------------


    /*
       LENGTH: Convert the provided length value from the sourceUnit to destinationUnit
    */
    function convertLength(sourceUnit, destinationUnit, valueToConvert) {

        if(sourceUnit === destinationUnit)
            return valueToConvert;

        //console.log("Converting length value: "+valueToConvert+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        var rs = Storage.getConversionEntry("lengthConvertion",sourceUnit,destinationUnit);

        //console.log("Length Multiply value:"+rs);

        return parseFloat(rs * valueToConvert).toFixed(6);
    }


    /*
      VOLUME: Convert the provided volume value from the sourceUnit to destinationUnit
    */
    function convertVolume(sourceUnit, destinationUnit, valueToConvert) {

        if(sourceUnit === destinationUnit)
            return valueToConvert;

        //console.log("Converting volume value: "+valueToConvert+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        var rs = Storage.getConversionEntry("volumeConvertion",sourceUnit,destinationUnit);

        //console.log("Volume Multiply value:"+rs);

        return parseFloat(rs * valueToConvert).toFixed(6);
    }


    /*
      WEIGTH: Convert the provided Weigth value from the sourceUnit to destinationUnit
    */
    function convertWeigth(sourceUnit, destinationUnit, valueToConvert) {

        if(sourceUnit === destinationUnit)
            return valueToConvert;

        //console.log("Converting Weigth value: "+valueToConvert+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        var rs = Storage.getConversionEntry("weigthConvertion",sourceUnit,destinationUnit);

        //console.log("Weigth Multiply value:"+rs);

        return parseFloat(rs * valueToConvert).toFixed(6);
    }


    /*
      TEMPERATURE: Convert the provided Temperature value from the sourceUnit to destinationUnit
    */
    function convertTemperature(sourceUnit, destinationUnit, valueToConvert) {

        if(sourceUnit === destinationUnit)
            return valueToConvert;

        //console.log("Converting Temperature value: "+valueToConvert+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        if(sourceUnit === 'Fahrenheit' && destinationUnit === 'Celsius' ){
            return convertFromFahrenheitToCelsius (valueToConvert);
        }

        if(sourceUnit === 'Celsius' && destinationUnit === 'Fahrenheit' ){
            return convertFromCelsiusToFahrenheit (valueToConvert);
        }

        if(sourceUnit === 'Celsius' && destinationUnit === 'Kelvin' ){
            return convertFromCelsiusToKelvin (valueToConvert);
        }

        if(sourceUnit === 'Kelvin' && destinationUnit === 'Celsius' ){
            return  convertFromKelvinToCelsius(valueToConvert);
        }

        if(sourceUnit === 'Fahrenheit' && destinationUnit === 'Kelvin' ){
            return  convertFromFahrenheitToKelvin(valueToConvert);
        }

        if(sourceUnit === 'Kelvin' && destinationUnit === 'Fahrenheit' ){
            return  convertFromKelvinToFahrenheit(valueToConvert);
        }

    }


    function convertFromFahrenheitToCelsius(valueToConvert) {

        var f = parseFloat(valueToConvert);
        var c = (f - 32) * 5/9;
        return parseFloat(c).toFixed(4);
    }

    function convertFromCelsiusToFahrenheit(valueToConvert) {

        var c = parseFloat(valueToConvert);
        var f = (c * 9/5) + 32;

        return parseFloat(f).toFixed(4);
    }

    function convertFromCelsiusToKelvin(valueToConvert) {

        if (valueToConvert < (-273.15)) {
            return 'below absolute zero (−273.15°C)';
        } else {
            return parseFloat(Number(valueToConvert) + Number(273.15)).toFixed(2);
        }
    }

    function convertFromKelvinToCelsius(valueToConvert) {

        if (valueToConvert < (0)) {
            return 'below absolute zero (0 K)';
        } else {
            return parseFloat(Number(valueToConvert) - Number(273.15)).toFixed(4);
        }
    }

    function convertFromFahrenheitToKelvin(valueToConvert){

       var tempK = (Number(valueToConvert) + Number(459.67)) * (5 / 9);

       return parseFloat(tempK).toFixed(4);
    }

    function convertFromKelvinToFahrenheit(valueToConvert){
        //console.log("Conversion K --> F ");

        var tempF = (Number(valueToConvert) * (9 / 5)) - Number(459.67);
        return parseFloat(tempF).toFixed(4);
    }


    /*
      AREA: Convert the provided length value from the sourceUnit to destinationUnit
    */
    function convertArea(sourceUnit, destinationUnit, valueToConvert) {

        if(sourceUnit === destinationUnit)
            return valueToConvert;

        //console.log("Converting area value: "+valueToConvert+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        var rs = Storage.getConversionEntry("areaConvertion",sourceUnit,destinationUnit);

        //console.log("Area Multiply value:"+rs);

        return parseFloat(rs * valueToConvert).toFixed(6);
    }


    /*
      PRESSURE: Convert the provided length value from the sourceUnit to destinationUnit
    */
    function convertPressure(sourceUnit, destinationUnit, valueToConvert) {

        if(sourceUnit === destinationUnit)
            return valueToConvert;

        //console.log("Converting pressure value: "+valueToConvert+" from sourceUnit: "+sourceUnit +" to destinationUnit: "+destinationUnit);

        var rs = Storage.getConversionEntry("pressureConvertion",sourceUnit,destinationUnit);

        //console.log("Pressure Multiply value:"+rs);

        return parseFloat(rs * valueToConvert).toFixed(6);
    }
