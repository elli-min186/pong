const canvas = document.getElementById("canvas");
const stage = new createjs.Stage(canvas);

//Resize canvas to screen
function resizeCanvas() {

    canvas.width = window.innerWidth - 120;
    canvas.height = window.innerHeight - 199;

    console.log("Canvas width: " + canvas.width + ", height: " + canvas.height); //to know width and height on console

}

resizeCanvas(); 
window.addEventListener("resize", resizeCanvas); //do resize every time window is resized

//Create a Shape DisplayObject
const line = new createjs.Shape();
line.graphics.setStrokeStyle(10).beginStroke("white");
line.graphics.moveTo(canvas.width/2, 0);
line.graphics.lineTo(canvas.width/2, canvas.height);
stage.addChild(line);


const circle = new createjs.Shape();
circle.graphics.beginFill("white").drawCircle(canvas.width/2, canvas.height/2, 10);
stage.addChild(circle);

const rect1 = new createjs.Shape(); //left rectangle
rect1.graphics.beginFill("white").drawRect(70, 20, 20, 80)
stage.addChild(rect1);

const rect2 = new createjs.Shape(); //right rectangle
rect2.graphics.beginFill("white").drawRect(1280, 20, 20, 80);
stage.addChild(rect2);

let player1score = 0;
let player2score = 0;

const score1 = new createjs.Text(player1score, "50px Times New Roman", "white");
score1.x = canvas.width/2 - 60;
score1.y = 30;
stage.addChild(score1);

const score2 = new createjs.Text(player2score, "50px Times New Roman", "white");
score2.x = canvas.width/2 + 30;
score2.y = 30;
stage.addChild(score2);

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

