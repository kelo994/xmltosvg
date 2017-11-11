var x2js = new X2JS();
var sizeSVG = "";
var info = "";
var instances;
var ors = [];
var xors = [];
var svgPrint = document.getElementById('svgcanvas');

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('xlink', 'http://www.w3.org/1999/xlink');

function buildJson() {
    $("#jsonArea2").val("Cargando...");
    var xml = JSON.stringify(x2js.xml_str2json($("#xmlArea").val()));
    var obj = JSON.parse(xml);
    $("#jsonArea").val(xml);
    //Tamaño XML
    sizeSVG = obj.ADOXML.MODELS.MODEL.MODELATTRIBUTES.ATTRIBUTE[16].__text;
    sizeSVG = sizeSVG.split("C ");
    sizeSVG = sizeSVG[1].split("TABLE");
    info = "Tamaño modelo: " + sizeSVG[0] + "Instances: ";
    var tamañossss = sizeSVG[0];
    console.log("sizeee: " + sizeSVG[0]);
    svg = buildsvg("x:1 y:1 w:30 h:20 scale:1");
    svgPrint.innerHTML = "";
    //Instances
    instances = new Array(obj.ADOXML.MODELS.MODEL.INSTANCE.length);
    for (var i = 0; i < obj.ADOXML.MODELS.MODEL.INSTANCE.length; i++) {
        instances[i] = new Array(5);
        instances[i][0] = obj.ADOXML.MODELS.MODEL.INSTANCE[i]._name;
        var posicion = obj.ADOXML.MODELS.MODEL.INSTANCE[i].ATTRIBUTE[0].__text;
        posicion = posicion.split("E ");
        posicion = posicion[1].split("index");
        instances[i][1] = posicion[0];
        svg.appendChild(instancesvg(instances[i][1]));
        svg.appendChild(textsvg(instances[i][0], instances[i][1]));
        //svgPrint.appendChild(svg);
    }
    for (var i = 0; i < obj.ADOXML.MODELS.MODEL.CONNECTOR.length; i++) {
        for (var j = 0; j < instances.length; j++) {
            var comparet = instances[j][0].localeCompare(obj.ADOXML.MODELS.MODEL.CONNECTOR[i].TO._instance);
            if (comparet == 0) {
                instances[j][2] = obj.ADOXML.MODELS.MODEL.CONNECTOR[i]._class;
                instances[j][3] = obj.ADOXML.MODELS.MODEL.CONNECTOR[i].FROM._instance;
                for (var k = 0; k < instances.length; k++) {
                    var comparef = instances[k][0].localeCompare(instances[j][3]);
                    if (comparef == 0) {
                        instances[j][4] = instances[k][1];

                        var optional = instances[j][2].localeCompare("Optional");
                        var mandatory = instances[j][2].localeCompare("Mandatory");
                        var xor = instances[j][2].localeCompare("XOR");
                        var or = instances[j][2].localeCompare("OR");
                        var require = instances[j][2].localeCompare("Requires");
                        var exclude = instances[j][2].localeCompare("Excludes");
                        if (mandatory == 0) {
                            svg.appendChild(linemo(instances[j][4], instances[j][1], instances[j][2]));
                            svg.appendChild(circle(instances[j][1], "black"));
                        }
                        if (optional == 0) {
                            svg.appendChild(linemo(instances[j][4], instances[j][1], instances[j][2]));
                            svg.appendChild(circle(instances[j][1], "white"));
                        }
                        if ((or == 0) || xor == 0) {
                            svg.appendChild(linemo(instances[j][4], instances[j][1], instances[j][2]));
                            var orxor = new Array();
                            orxor[0] = instances[j][3];
                            orxor[1] = instances[j][4];
                            orxor[2] = instances[j][0];
                            orxor[3] = instances[j][1];
                            if(or==0){
                                orxor[4] = "white";
                            }else{
                                orxor[4] = "black";
                            }                            
                            orxor[5] = false;
                            ors.push(orxor);
                        }
                        if (require == 0) {
                            svg.appendChild(linerequire(instances[j][4], instances[j][1], instances[j][2]));
                            //svg.appendChild(arrow(instances[j][1]));
                        }
                        if ( exclude == 0) {
                            svg.appendChild(linexclude(instances[j][4], instances[j][1], instances[j][2]));
                            //svg.appendChild(arrow(instances[j][1]));
                        }
                    }
                }
                info += instances[j][0] + " p: " + instances[j][1] + " t: " + instances[j][2] + " f: " + instances[j][3] + "p2: " + instances[j][4] + " /// ";
            }
        }
    }var cont = 0;
    for (var i = 0; i < ors.length; i++) {        
        if (ors[i][5] == false) {
            console.log(ors);
            var poligono = new Array();
            var pos = ors[i][1].split(":");
            let x = 55 * parseInt(pos[1].split("cm"));
            let y = 55 * parseInt(pos[2].split("cm"));
            poligono[0] = x;
            poligono[1] = y;
            poligono[2] = 0;
            poligono[3] = 0;
            poligono[4] = 0;
            poligono[5] = 0;
            poligono[6] = ors[i][4];
            ors[i][5] = true;
            var firstElement = false;
            for (var j = 0; j < ors.length; j++) {                
                if (ors[j][5] == false || j <=20000) {
                    var flag = ors[i][0].localeCompare(ors[j][0]);
                    if (flag == 0) {
                        ors[j][5] = true;
                        var post = ors[j][3].split(":");
                        let x1 = 55 * parseInt(post[1].split("cm"));
                        let y1 = 55 * parseInt(post[2].split("cm"));
                        if (firstElement) {
                            if (poligono[3] > y1) {
                                poligono[3] = y1;
                            }
                            if (poligono[5] < y1) {
                                poligono[5] = y1;
                            }
                            if (poligono[2] > x1) {
                                poligono[2] = x1;
                            }
                            if (poligono[4] < x1) {
                                poligono[4] = x1;
                            }
                        }else{
                            poligono[2] = x1;
                            poligono[3] = y1;
                            poligono[4] = x1;
                            poligono[5] = y1;
                            poligono[6] = ors[i][4];
                            firstElement = true;                            
                        }                        
                    }
                }
                if(j == (ors.length-1)){
                    cont++;
                    console.log("conteo: " + cont)
                    xors.push(poligono);
                }
            }
            //console.log(poligono);
            
        }
    }
    console.log(xors);
    for (var i = 0; i < xors.length; i++) {
       svg.appendChild(orxorsvg(xors[i]));
    }
    svgPrint.appendChild(svg);
    $("#jsonArea2").val(info);
}