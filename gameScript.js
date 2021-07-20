let shapeArray = [];
let stopped = false;
let magicTransform;

function revealShapeGame(button, canvas, instructions){
    var ctx = canvas.getContext("2d");
    shapeArray = [];
    if(button.innerHTML != "Stop Game"){
        instructions.innerHTML="Please click on 5 arbitrarty spots within this box and see my shape transformation magic!";
        button.innerHTML="Stop Game";
        canvas.style.display = "block";
        ctx.canvas.width="500";
        ctx.canvas.height="250";
        ctx.canvas.style.border="4px solid #8cf0c4";
        stopped = false;
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stopped = true;
        clearInterval(magicTransform);
        canvas.style.display = "none";
        button.innerHTML="Play Game!"
        instructions.innerHTML = "";
    }
}

class Shape {
    x=0;
    y=0;
    xlength=0;
    ylength=0;
    kind=0;
    color="#000000";
    constructor(x, y, xlength, ylength, kind, color){
    //constructor(x, y, kind, color){
        this.x = x;
        this.y = y;
        this.kind = kind;
        this.color = color;
        this.xlength = xlength;
        this.ylength = ylength;
    }
    get x(){
         return this.x;
    }
    get y(){
        return this.y;
    }
    get xlength(){
        return this.xlength;
    }
    get ylength(){
        return this.ylength;
    }
    get kind(){
        return this.kind;
    }
    get color(){
        return this.color;
    }
    value(){
        return "(" + this.x+", "+this.y+", "+this.kind+", "+ this.color+")";
    }
    rand(){
        var num = Math.floor(Math.random()*5) + 1; 
        num *= Math.round(Math.random()) ? 1 : -1;
        return num;
    }
    xRand(){
        this.x += this.rand();
        return this.x;
    }
    yRand(){
        this.y += this.rand();
        return this.y;
    }
    xlenRand(){
        this.xlength += this.rand();
        return this.xlength;
    }
    ylenRand(){
        this.ylength += this.rand();
        return this.ylength;
    }
}

function drawRandShape(id, x, y){
    var context = document.getElementById(id).getContext("2d");
    var color = randColor();
    context.fillStyle = color;
    var shapeKind = Math.floor(Math.random() * 5);
    var xlen = Math.floor(Math.random()*100) + 15;
    var ylen = Math.floor(Math.random()*100) + 15;
    shapeArray.push(new Shape(x, y, xlen, ylen, shapeKind, color));
    switch (shapeKind){
        case 0: //square
            context.fillRect(x-(xlen/2), y-(xlen/2), xlen, xlen);
            break;
        case 1: //rectangle
            context.fillRect(x-(xlen/2), y-(ylen/2), xlen, ylen);
            break;
        case 2: //triangle
            context.beginPath();
            context.moveTo(x,y+(ylen));
            context.lineTo(x+(xlen), y-(ylen/3));
            context.lineTo(x-(xlen), y-(ylen/3));
            context.closePath();
            context.fill();
            break;
        case 3: //filledArc
            context.beginPath();
            context.moveTo(x+(xlen/3), y+(xlen/2));
            context.arc(x+(xlen/3), y+(xlen/2), xlen, .5+Math.PI, 1.5*Math.PI);
            context.closePath();
            context.fill();
            break;
        case 4: //circle
            context.beginPath();
            context.moveTo(x,y);
            context.arc(x, y, xlen, 0, 2*Math.PI);
            context.closePath();
            context.fill();
            break;
    }
}

function randColor(){
    var color = Math.floor(Math.random()*16777215).toString(16);
    color = "#" + color;
    return color;
}

function moveShapes(id, shapeArray){
    var context = document.getElementById(id).getContext("2d");
    var x = 10;
    var y = 10;
    var shapeKind = 0;
    var xlen = 10;
    var ylen = 10;
    for(let i=0; i < 5; i++){
        var shape = shapeArray[i];
        x = shape.xRand();
        y = shape.yRand();
        xlen = shape.xlenRand();
        ylen = shape.ylenRand();
        //x = shape.x;
        //y = shape.y;
        shapeKind = shape.kind;
        //document.getElementById("shapeInstructions").innerHTML = shape.value();
        context.fillStyle = shape.color;
        switch (shapeKind){
            case 0: //square
                context.fillRect(x-(xlen/2), y-(xlen/2), xlen, xlen);
                break;
            case 1: //rectangle
                context.fillRect(x-(xlen/2), y-(ylen/2), xlen, ylen);
                break;
            case 2: //triangle
                context.beginPath();
                context.moveTo(x,y+(ylen));
                context.lineTo(x+(xlen), y-(ylen/3));
                context.lineTo(x-(xlen), y-(ylen/3));
                context.closePath();
                context.fill();
                break;
            case 3: //filledArc
                context.beginPath();
                context.moveTo(x+(xlen/3), y+(xlen/2));
                context.arc(x+(xlen/3), y+(xlen/2), xlen, .5+Math.PI, 1.5*Math.PI);
                context.closePath();
                context.fill();
                break;
            case 4: //circle
                context.beginPath();
                context.moveTo(x,y);
                context.arc(x, y, xlen, 0, 2*Math.PI);
                context.closePath();
                context.fill();
                break;
        }
    }
}

function playShapeGame(event){
    var canvas = document.getElementById("shapeCanvas")
    var rect = canvas.getBoundingClientRect();
    var ctx = canvas.getContext("2d");
    if (shapeArray.length < 4){
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        drawRandShape("shapeCanvas", x, y);
    } else if(shapeArray.length > 5) {
        stopped = true;
        clearInterval(magicTransform);
        event.stopPropagation();
    } else if(shapeArray.length == 4){
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        drawRandShape("shapeCanvas", x, y);
        magicTransform = setInterval(frame, 100);
        var time = 0;
        function frame(){
            if (time > 100 || stopped){
                clearInterval(magicTransform);
                document.getElementById("shapeInstructions").innerHTML = "Click the button to replay the game!";
                document.getElementById("shapePlayButton").innerHTML = ("Replay Game!");
            } else{
                time++;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                moveShapes("shapeCanvas", shapeArray);
                document.getElementById("shapeInstructions").innerHTML = "Watch the magic!";
            }
        }
    }

}