var canvas,
    context,
    dragging = false,
    dragStartLocation,
    stable;


function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left,
        y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function take() {
    stable = context.getImageData(0, 0, canvas.width, canvas.height);
}

function put() {
    context.putImageData(stable, 0, 0);
}




  
    function drawTriangle(position, sides, angle) {
    var coordinates = [],
        radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: dragStartLocation.x + radius * Math.cos(angle), y: dragStartLocation.y - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    context.beginPath();
    context.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        context.lineTo(coordinates[index].x, coordinates[index].y);
    }

    context.closePath();
    context.fill();
}

function randomColor() {
    let colors = [
        "royalblue",
        "yellow",
       "pink"
    ];

    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    take();
}

function drag(event) {
    var position;
    if (dragging === true) {
        put();
        position = getCanvasCoordinates(event);
        context.fillStyle = randomColor( );
         drawTriangle(position, 3, Math.PI / 4);
        
    }
}

function dragStop(event) {
    dragging = false;
    put();
context.fillStyle = randomColor( );
    var position = getCanvasCoordinates(event);
    drawTriangle(position, 3, Math.PI / 4);
}


function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext('2d');
    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
     canvas.addEventListener('dblclick', dragStart, false);
    document.getElementById("clear").addEventListener('mousedown',function(){
    context.clearRect(0,0,canvas.width, canvas.height); 
}); 
     document.getElementById("canvas").addEventListener("dblclick", function() {
 context.clearRect(0,0,canvas.width, canvas.height); 
});
}

window.addEventListener('load', init, false);