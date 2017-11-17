

function buildsvg (size){
    dimension = size.split(":");
    let xd = dimension[1].split("y");
    let yd = dimension[2].split("w");
    let wd = dimension[3].split("h");
    let hd = dimension[4].split("scale");
    svg.setAttribute('width',parseInt(wd[0])*55);
    svg.setAttribute('height',parseInt(hd[0])*55);
    svg.setAttribute('x',parseInt(xd[0])*55);
    svg.setAttribute('y',parseInt(yd[0])*55);
    return svg;
}
function instancesvg (posicion){
    posicion = posicion.split(":");
    let x = 55 * parseInt(posicion[1].split("cm"));
    let y = 55 * parseInt(posicion[2].split("cm"));
    
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '150');
    rect.setAttribute('height','50');
    rect.setAttribute('fill','white');
    rect.setAttribute('stroke','black');
    rect.setAttribute('stroke-width','2');
    //rect.setAttribute('rx','2');
    rect.setAttribute('x',x);
    rect.setAttribute('y',y);
    return rect;
}
function textsvg(texto, posicion){
    posicion = posicion.split(":");
    let x = 55 * parseInt(posicion[1].split("cm"));
    let y = 55 * parseInt(posicion[2].split("cm"));
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x + 50);
    text.setAttribute('y', y + 30);
    text.setAttribute('fill', 'black');
    text.textContent = texto;
    return text;
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

function linerequire(posicionIni, posicionEnd, type){
    var svgrequire = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgrequire.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    
    var posicionI = posicionIni.split(":");
    let x1 = 55 * parseInt(posicionI[1].split("cm"));
    let y1 = (55 * parseInt(posicionI[2].split("cm") ))+50;
    var posicionE = posicionEnd.split(":");
    let x2 = 55 * parseInt(posicionE[1].split("cm"));
    let y2 = (55 * parseInt(posicionE[2].split("cm")));
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    var arrow1x = 0;
    var arrow1y = 0;
    var punta = 0;
    var arrow2x = 0;
    var arrow2y = 0;
    svgrequire.setAttribute('width',parseInt(x1)*55);
    svgrequire.setAttribute('height',parseInt(y1)*55);
    if(y2<y1){
        //require hacia arriba
    }else{    
        if(x2<x1 && x1<(x2+150)){
            x1 = ((x2+150)-x1)/3+x1;
            x2 = x1;
            arrow1x = x1-10;
            arrow1y = y2 - (y2 - y1)*0.1;
            arrow2x = x1+10;
            arrow2y = y2 - (y2 - y1)*0.1;
        }else if (x2<(x1+150) && (x1+150)<(x2+150)) {
            x1 = ((x1+150)-x2)/3+x2;
            x2 = x1;
            arrow1x = x1-10;
            arrow1y = y2 - (y2 - y1)*0.1;
            arrow2x = x1+10;
            arrow2y = y2 - (y2 - y1)*0.1;
        } else if(x1>x2){
            console.log("mayor x1: " + x1 + " x2: " + x2);
            x1+= 20;
            x2+= 140;
            arrow1x = ((x1-x2)*0,8)+x2;
            arrow1y = y2 - (y2 - y1)*0.2;
            arrow2x = ((x1-x2)*0,9)+x2;
            arrow2y = y2 + (y2 - y1)*0.2;
            console.log("y: " + y1 + " " + y2 + " " + arrow2y);
        }else{
            console.log("x1: " + x1 + " x2: " + x2);
            x1+= 140;
            x2+= 20;
            arrow1x = ((x2-x1)*0,8)+x2;
            arrow1y = y2 - (y2 - y1)*0.2;
            arrow2x = ((x1-x2)*0,9)+x2;
            arrow2y = y2 + (y2 - y1)*0.2;
        }
    }   
    /**/

    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);
    line.setAttribute('y1', y1);    
    line.setAttribute('y2', y2);
    line.setAttribute('stroke-width', 5);
    line.setAttribute('stroke', "black");
    line.setAttribute('stroke-dasharray', "5,5");
    svgrequire.appendChild(line);

    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');  
    arrow.setAttribute('stroke-linejoin', 'miter');
    arrow.setAttribute('points', arrow1x + ',' + arrow1y + ' ' + x2 + ',' + y2 + ' ' + arrow2x + ',' + arrow2y);
    arrow.setAttribute('stroke', "black");
    arrow.setAttribute('stroke-width', 5);
    arrow.setAttribute('fill', "none");
    svgrequire.appendChild(arrow);
    
    return svgrequire;
}

function linexclude(posicionIni, posicionEnd, type){
    var svgexclude = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgexclude.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
    
    var posicionI = posicionIni.split(":");
    let x1 = 55 * parseInt(posicionI[1].split("cm"));
    let y1 = (55 * parseInt(posicionI[2].split("cm") ))+50;
    let x11 = 55 * parseInt(posicionI[1].split("cm"));
    let y11 = (55 * parseInt(posicionI[2].split("cm") ))+50;
    var posicionE = posicionEnd.split(":");
    let x2 = 55 * parseInt(posicionE[1].split("cm"));
    let y2 = (55 * parseInt(posicionE[2].split("cm")));
    let x22 = 55 * parseInt(posicionE[1].split("cm"));
    let y22 = (55 * parseInt(posicionE[2].split("cm")));

    var arrow1x = 0;
    var arrow1y = 0;
    var punta = 0;
    var arrow2x = 0;
    var arrow2y = 0;
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    if(y2<y1){
        //require hacia arriba
    }else{    
        if(x2<x1 && x1<(x2+150)){
            x1 = ((x2+150)-x1)/3+x1;
            x2 = x1;
            arrow1x = x2-10;
            arrow1y = y2 - (y2 - y1)*0.1;
            arrow2x = x2+10;
            arrow2y = y2 + (y2 - y1)*0.1;
        }else if (x2<(x1+150) && (x1+150)<(x2+150)) {
            x1 = ((x1+150)-x2)/3+x2;
            x2 = x1;
            arrow1x = x1-10;
            arrow1y = y2 - (y2 - y1)*0.1;
            arrow2x = x1+10;
            arrow2y = y2 - (y2 - y1)*0.1;
        } else if(x1>x2){
            x1+= 20;
            x2+= 140;
            arrow1x = ((x1-x2)*0,8)+x2;
            arrow1y = y2 - (y2 - y1)*0.2;
            arrow2x = ((x1-x2)*0,9)+x2;
            arrow2y = y2 + (y2 - y1)*0.2;
        }else{
            x1+= 140;
            x2+= 20;
            arrow1x = ((x2-x1)*0,8)+x2;
            arrow1y = y2 - (y2 - y1)*0.2;
            arrow2x = ((x1-x2)*0,9)+x2;
            arrow2y = y2 - (y2 - y1)*0.2;
        }
    }   
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);
    line.setAttribute('y1', y1+10);    
    line.setAttribute('y2', y2-10);
    line.setAttribute('stroke-width', 5);
    line.setAttribute('stroke', "black");
    line.setAttribute('stroke-dasharray', "5,5");
    svgexclude.appendChild(line);
    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');  
    arrow.setAttribute('stroke-linejoin', 'miter');
    arrow.setAttribute('points', arrow1x + ',' + arrow1y + ' ' + x2 + ',' + y2 + ' ' + arrow2x + ',' + arrow2y);
    arrow.setAttribute('stroke', "black");
    arrow.setAttribute('stroke-width', 5);
    arrow.setAttribute('fill', "none");
    svgexclude.appendChild(arrow);
    if(y2<y1){
        //require hacia arriba
    }else{    
        if(x22<x11 && x11<(x22+150)){
            x11 = ((x22+150)-x11)/3+x11;
            x22 = x11;
            arrow1x = x11-10;
            arrow1y = y11 + (y22 - y11)*0.1;
            arrow2x = x11+10;
            arrow2y = y11 + (y22 - y11)*0.1;
        }else if (x22<(x11+150) && (x11+150)<(x22+150)) {
            x11 = ((x11+150)-x22)/3+x22;
            x22 = x11;
            arrow1x = x11-10;
            arrow1y = y11 + (y22 - y11)*0.1;
            arrow2x = x11+10;
            arrow2y = y11 + (y22 - y11)*0.1;
        } else if(x11>x2){
            x11+= 20;
            x22+= 140;
            arrow1x = ((x11-x22)*0,8)-x11;
            arrow1y = y22 - (y22 - y11)*0.2;
            arrow2x = ((x11-x22)*0,9)+x22;
            arrow2y = y22 + (y22 - y11)*0.2;
        }else{
            x11+= 140;
            x22+= 20;
            arrow1x = ((x22-x11)*0,8)+x22;
            arrow1y = y11 + (y22 - y11)*0.2;
            arrow2x = ((x11-x22)*0,9)+x22;
            arrow2y = y11 + (y22 - y11)*0.2;
        }
    }   
    
    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');  
    arrow.setAttribute('stroke-linejoin', 'miter');
    arrow.setAttribute('points', arrow1x + ',' + arrow1y + ' ' + x11 + ',' + y11 + ' ' + arrow2x + ',' + arrow2y);
    arrow.setAttribute('stroke', "black");
    arrow.setAttribute('stroke-width', 5);
    arrow.setAttribute('fill', "none");
    svgexclude.appendChild(arrow);
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