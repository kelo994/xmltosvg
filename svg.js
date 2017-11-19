function buildsvg (size){
    dimension = size.split(":");
    let xd = dimension[1].split("y");
    let yd = dimension[2].split("w");
    let wd = dimension[3].split("h");
    let hd = dimension[4].split("scale");
    svg.setAttribute('width',parseInt(wd[0])*100);
    svg.setAttribute('height',parseInt(hd[0])*55);
    svg.setAttribute('x',parseInt(xd[0]));
    svg.setAttribute('y',parseInt(yd[0]));
    return svg;
}
//instancias
function instancesvg (posicion, texto){
    var instances = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    posicion = posicion.split(":");
    let x = 55 * parseInt(posicion[1].split("cm"));
    let y = 55 * parseInt(posicion[2].split("cm"));
    
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '150');
    rect.setAttribute('height','50');
    rect.setAttribute('fill','white');
    rect.setAttribute('stroke','black');
    rect.setAttribute('stroke-width','2');
    rect.setAttribute('x',x);
    rect.setAttribute('y',y);
    instances.appendChild(rect);
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + 30);
    text.setAttribute('y', y + 30);
    text.setAttribute('fill', 'black');
    text.textContent = texto;
    instances.appendChild(text);
    return instances;
}


function linemo(posicionIni, posicionEnd, type){
    var posicionI = posicionIni.split(":");
    let x1 = 55 * parseInt(posicionI[1].split("cm"));
    let y1 = 55 * parseInt(posicionI[2].split("cm") );
    var posicionE = posicionEnd.split(":");
    let x2 = 55 * parseInt(posicionE[1].split("cm"));
    let y2 = 55 * parseInt(posicionE[2].split("cm"));

    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');  
    line.setAttribute('x1', x1+75);
    line.setAttribute('y1', y1+50);
    line.setAttribute('x2', x2+75);
    var optional = type.localeCompare("Optional");
    var mandatory = type.localeCompare("Mandatory");
    if ((optional==0)||(mandatory == 0)) {
        line.setAttribute('y2', y2-10);
    }else{
        line.setAttribute('y2', y2);
    }
    line.setAttribute('stroke-width', 5);
    line.setAttribute('stroke', "black");
    return line;
}

function flecha(xIni, yIni, xEnd, yEnd){
    var px1, py1, px2, py2;
    if(yIni<yEnd){
        if(xIni<xEnd){
            px1 = (xEnd - ((xEnd - xIni)*0.1))-((xEnd - xIni)*0.1);
            px2 = (xEnd - ((xEnd - xIni)*0.1))+((xEnd - xIni)*0.1);
        }else if(xEnd<xIni){
            px1 = (xEnd + ((xIni - xEnd)*0.1))-((xIni - xEnd)*0.1);
            px2 = (xEnd + ((xIni - xEnd)*0.1))+((xIni - xEnd)*0.1);
        }else{
            px1 = xIni - ((yIni - yEnd)*0.05);
            px2 = xIni + ((yIni - yEnd)*0.05);
        }
        py1 = yEnd - ((yEnd - yIni)*0.1);
        py2 = yEnd - ((yEnd - yIni)*0.1);   
    }else{
        if(xIni<xEnd){
            px1 = (xEnd - ((xEnd - xIni)*0.1))-((xEnd - xIni)*0.1);
            px2 = (xEnd - ((xEnd - xIni)*0.1))+((xEnd - xIni)*0.1);
        }else if(xEnd<xIni){
            px1 = (xEnd + ((xIni - xEnd)*0.1))-((xIni - xEnd)*0.1);
            px2 = (xEnd + ((xIni - xEnd)*0.1))+((xIni - xEnd)*0.1);
        }else{
            px1 = xIni - ((yEnd - yIni)*0.05);
            px2 = xIni + ((yEnd - yIni)*0.05);
        }
        py1 = yEnd + ((yIni - yEnd)*0.1);
        py2 = yEnd + ((yIni - yEnd)*0.1);        
    }

    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');  
    arrow.setAttribute('stroke-linejoin', 'miter');
    arrow.setAttribute('points', px1 + ',' + py1 + ' ' + xEnd + ',' + yEnd + ' ' + px2 + ',' + py2);
    arrow.setAttribute('stroke', "black");
    arrow.setAttribute('stroke-width', 5);
    arrow.setAttribute('fill', "none");
    return arrow;
}
function linerequire(posicionIni, posicionEnd, flag){
    var svgrequire = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgrequire.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    
    var posicionI = posicionIni.split(":");    
    let x1 = 55 * parseInt(posicionI[1].split("cm"))+75;
    let y1 = (55 * parseInt(posicionI[2].split("cm") ));
    var posicionE = posicionEnd.split(":");
    let x2 = 55 * parseInt(posicionE[1].split("cm"))+75;
    let y2 = (55 * parseInt(posicionE[2].split("cm")));
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    if(flag==1){
        if(y1<y2){
           // x1 += 75;
            y1 += 50;
        }else{
            //x1 += 75;
        }
    }
    if(flag==2){
        if(y2<y1){
            //x2 += 75;
            y2 += 50;
        }else{
            //x2 += 75;
        }
        svgrequire.appendChild(flecha(x1, y1, x2, y2));
    }
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);      
    line.setAttribute('x2', x2);  
    line.setAttribute('y2', y2);
    line.setAttribute('stroke-width', 5);
    line.setAttribute('stroke', "black");
    line.setAttribute('stroke-dasharray', "5,5");
    svgrequire.appendChild(line);    
    return svgrequire;
}

function linexclude(posicionIni, posicionEnd, flag){
    var svgexclude = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgexclude.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    
    var posicionI = posicionIni.split(":");
    let x1 = 55 * parseInt(posicionI[1].split("cm"))+75;
    let y1 = (55 * parseInt(posicionI[2].split("cm") ));
    var posicionE = posicionEnd.split(":");
    let x2 = 55 * parseInt(posicionE[1].split("cm"))+75;
    let y2 = (55 * parseInt(posicionE[2].split("cm")));
    
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    if(flag==1){
        if(y1<y2){
            //x1 += 75;
            y1 += 50;
        }else{
            //x1 += 75;
        }
        svgexclude.appendChild(flecha(x2, y2, x1, y1));
    }
    if(flag==2){
        if(y2<y1){
            //x2 += 75;
            y2 += 50;
        }else{
            //x2 += 75;
        }
        svgexclude.appendChild(flecha(x1, y1, x2, y2));
    }
    if (flag==3) {
        y1 += 50;
        if(y2<y1){
            //x1 += 75;            
            //x2 += 75;
            y2 += 50;
        }else{
            //x2 += 75;
            //x1 += 75;
        }
        svgexclude.appendChild(flecha(x2, y2, x1, y1));
        svgexclude.appendChild(flecha(x1, y1, x2, y2));
    }
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);
    line.setAttribute('y1', y1);    
    line.setAttribute('y2', y2);
    line.setAttribute('stroke-width', 5);
    line.setAttribute('stroke', "black");
    line.setAttribute('stroke-dasharray', "5,5");
    svgexclude.appendChild(line);
    
    return svgexclude;
}

function circle(posicion, type){
    var pos = posicion.split(":");
    let x = 55 * parseInt(pos[1].split("cm"));
    let y = 55 * parseInt(pos[2].split("cm") );
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x+75);
    circle.setAttribute('cy', y-10);
    circle.setAttribute('r', 10);  
    circle.setAttribute('stroke', "black");
    circle.setAttribute('stroke-width', 3);
    circle.setAttribute('fill', type);
    return circle;
}

function orxorsvg (xors){
    xors[1] += 50;
    xors[0] += 75;
    xors[2] += 75;
    xors[4] += 75;
    var xls, xrs, ys;
    if(xors[3]<xors[5]){
        console.log("ylmenor");        
        xls = (xors[0] - xors[2])/2 + xors[2];
        xrs = (xors[0] - xors[2])/2 + xors[0];
        ys = (xors[3] - xors[1])/2 + xors[1];
        console.log("y " + xors[1] + " ys " + ys + " yl " + xors[3] + " yr " + xors[5] + " xl " + xors[2] + " xr " + xors[4] + " x " + xors[0] + " xls " + xls + " xrs " + xrs);
    }
    if(xors[5]<xors[3]){
        console.log("yrmenor");
        //console.log("yl " + yl + " yr " + yr);
        xls = (xors[4] - xors[0])/2 + xors[0];
        xrs = (xors[4] - xors[0])/2 + xors[0];
        ys = (xors[5] - xors[1])/2 + xors[1];
    }
    if(xors[5] == xors[3]){
        console.log("iguales");
        xls = (xors[0] - xors[2])/2 + xors[2];
        xrs = (xors[4] - xors[0])/2 + xors[0];
        ys = (xors[5] - xors[1])/2 + xors[1];
    }
    
    
   // console.log("x " + x + " y " + y + " ys " + ys + " xl: " + xls + " xrs " + xrs);
    var polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    polygon.setAttribute("points", xors[0] + "," + xors[1] + " " + xls+","+ys+" "+xrs+","+ ys);
    polygon.setAttribute('stroke', "black");
    polygon.setAttribute('stroke-width', 3);
    polygon.setAttribute('fill', xors[6]);
    return polygon;
}


