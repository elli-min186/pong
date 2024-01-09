const canvas = document.getElementById("canvas");
const stage = new createjs.Stage(canvas);

//Resize canvas to screen
function resizeCanvas() {

    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 199;

    // console.log("Canvas width: " + canvas.width + ", height: " + canvas.height); //to know width and height on console

}

resizeCanvas(); 
window.addEventListener("resize", resizeCanvas); //do resize every time window is resized

//Create a Shape DisplayObject
const circle = new createjs.Shape();
circle.graphics.beginFill("red").drawCircle(canvas.width/2, canvas.height/2, 10);
stage.addChild(circle);


const rect1 = new createjs.Shape(); //left rectangle
rect1.graphics.beginFill("black").drawRect(20, 20, 20, 80)
stage.addChild(rect1);

const rect2 = new createjs.Shape(); //right rectangle
rect2.graphics.beginFill("black").drawRect(1380, 20, 20, 80);
stage.addChild(rect2);

const firstkeys = {
    up: false,
    down: false
};

const secondkeys = {
    up: false,
    down: false
};

window.addEventListener("keydown", (event) => { // if key is pressed
    switch (event.which) {

        //rect 2 keys
        case 38: //up arrow key
            secondkeys.up = true;
            break;

        case 40: //down arrow key
            secondkeys.down = true;
            break;
        
        //  rect 1 keys
        case 87: //W key
            firstkeys.up = true;
            break;

        case 83: //S key
            firstkeys.down = true;
    }
});

window.addEventListener("keyup", (event) => { // if key is not pressed
    switch (event.which) {

        // rect 2 keys
        case 38: //up arrow key
            secondkeys.up = false;
            break;

        case 40: //down arrow key
            secondkeys.down = false;
            break;

        //  rect 1 keys
        case 87: //W key
            firstkeys.up = false;
            break;

        case 83: //S key
            firstkeys.down = false;
    }
});

function checkCollisionWithRects() {

    
}

function animate() {

    requestAnimationFrame(animate);
    circle.x += 3;

    // rect 2
    if (secondkeys.up) {
        rect2.y -= 3;
    }
    if (secondkeys.down) {
        rect2.y += 3;
    }

    // rect 1
    if (firstkeys.up) {
        rect1.y -= 3;
    }
    if (firstkeys.down) {
        rect1.y += 3;
    }

    stage.update();

}

requestAnimationFrame(animate);

