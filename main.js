const canvas = document.getElementById("canvas");
const stage = new createjs.Stage(canvas);

const DIRECTION_NORTH = "NORTH";
const DIRECTION_NORTH_EAST = "NORTH_EAST";
const DIRECTION_EAST = "EAST";
const DIRECTION_SOUTH_EAST = "SOUTH_EAST";
const DIRECTION_SOUTH = "SOUTH";
const DIRECTION_SOUTH_WEST = "SOUTH_WEST";
const DIRECTION_WEST = "WEST";
const DIRECTION_NORTH_WEST = "NORTH_WEST";

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
const CIRCLE_SPEED_X = 3;
const CIRCLE_SPEED_Y = 3;
let circleVX = -CIRCLE_SPEED_X;
let circleVY = 0;
circle.graphics.beginFill("white").drawCircle(canvas.width/2, canvas.height/2, 10);
circle.setBounds(canvas.width/2, canvas.height/2, 10, 10);
stage.addChild(circle);

const rect1 = new createjs.Shape(); //left rectangle
rect1.graphics.beginFill("white").drawRect(70, 20, 20, 80);
rect1.setBounds(70, 20, 20, 80);
stage.addChild(rect1);

const rect2 = new createjs.Shape(); //right rectangle
rect2.graphics.beginFill("white").drawRect(canvas.width - 70, 20, 20, 80);
rect2.setBounds(canvas.width - 70, 20, 20, 80);
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

function checkRectsCollisionWithBorder() {
    // rect 1 collision border check
    if (rect1.y + rect1.getBounds().y <= 0) {
        rect1.y = -rect1.getBounds().y;
    }
    else if (rect1.y + rect1.getBounds().y + rect1.getBounds().height >= canvas.height) {
        rect1.y = canvas.height - rect1.getBounds().height - rect1.getBounds().y;
    }

    // rect 2 collision border check
    if (rect2.y + rect2.getBounds().y <= 0) {
        rect2.y = -rect2.getBounds().y;
    }
    else if (rect2.y + rect2.getBounds().y + rect2.getBounds().height >= canvas.height) {
        rect2.y = canvas.height - rect2.getBounds().height - rect2.getBounds().y;
    }
}

function checkCollision(shape1, shape2) {
    let hitBoxOf1 = new createjs.Shape();
    hitBoxOf1.setBounds(shape1.x + shape1.getBounds().x, shape1.y + shape1.getBounds().y, shape1.getBounds().width, shape1.getBounds().height);
    let hitBoxOf2 = new createjs.Shape()
    hitBoxOf2.setBounds(shape2.x + shape2.getBounds().x, shape2.y + shape2.getBounds().y, shape2.getBounds().width, shape2.getBounds().height);

    return hitBoxOf1.getBounds().intersects(hitBoxOf2.getBounds());

}

function checkAndApplyBorderCollision(circle) {

    if (circle.y + circle.getBounds().y > canvas.height) {
        circleVY = -CIRCLE_SPEED_Y;
    } else if (circle.y + circle.getBounds().y < 0) {
        circleVY = CIRCLE_SPEED_Y;
    }

}

function midPoint(shape) {

    let bounds = shape.getBounds();
    return { 
        x: ((shape.x + bounds.x) + (shape.x + bounds.x + bounds.width)) / 2,
        y: ((shape.y + bounds.y) + (shape.y + bounds.y + bounds.height)) / 2
    };

}

function isNumberValuePlusMinusEpsilon(number, value, epsilon) {

    return number >= value - epsilon && number <= value + epsilon;

}

function resetCircle() {

    circle.x = canvas.width/2 - circle.getBounds().x;
    circleVX = CIRCLE_SPEED_X;
    circleVY = 0;

}

function getCollisionDirection(shape1, shape2) {

    let midpointOf1 = midPoint(shape1);
    let midpointOf2 = midPoint(shape2);
    let epsilonX = 2;
    let epsilonY = 5;

    if (isNumberValuePlusMinusEpsilon(midpointOf1.x, midpointOf2.x, epsilonX) && midpointOf1.y < midpointOf2.y) {
        return DIRECTION_NORTH;
    } else if (isNumberValuePlusMinusEpsilon(midpointOf1.y, midpointOf2.y, epsilonY) && midpointOf1.x > midpointOf2.x) {
        return DIRECTION_EAST;
    } else if(isNumberValuePlusMinusEpsilon(midpointOf1.x, midpointOf2.x, epsilonX) && midpointOf1.y > midpointOf2.y) {
        return DIRECTION_SOUTH;
    } else if(isNumberValuePlusMinusEpsilon(midpointOf1.y, midpointOf2.y, epsilonY) && midpointOf1.x < midpointOf2.x) {
        return DIRECTION_WEST;
    } else if(midpointOf1.x > midpointOf2.x && midpointOf1.y < midpointOf2.y) {
        return DIRECTION_NORTH_EAST;
    } else if(midpointOf1.y > midpointOf2.y && midpointOf1.x > midpointOf2.x) {
        return DIRECTION_SOUTH_EAST;
    } else if (midpointOf1.y > midpointOf2.y && midpointOf1.x < midpointOf2.x) {
        return DIRECTION_SOUTH_WEST;
    } else if (midpointOf1.y < midpointOf2.y && midpointOf1.x < midpointOf2.x){
        return DIRECTION_NORTH_WEST;
    }

}

function applyCollision(circle, rect) {

    let direction = getCollisionDirection(circle, rect);
    debugger;
    switch (direction) {
        case DIRECTION_NORTH: 
            circleVY = -CIRCLE_SPEED_Y;
            circleVX = 0;
        break;
        case DIRECTION_NORTH_EAST:
            circleVY = -CIRCLE_SPEED_Y;
            circleVX = CIRCLE_SPEED_X;
        break;
        case DIRECTION_EAST:
            circleVY = 0;
            circleVX = CIRCLE_SPEED_X;
        break;
        case DIRECTION_SOUTH_EAST:
            circleVY = CIRCLE_SPEED_Y;
            circleVX = CIRCLE_SPEED_X;
        break;
        case DIRECTION_SOUTH:
            circleVY = CIRCLE_SPEED_Y;
            circleVX = 0;
        break;
        case DIRECTION_SOUTH_WEST:
            circleVY = CIRCLE_SPEED_Y;
            circleVX = -CIRCLE_SPEED_X;
        break;
        case DIRECTION_WEST:
            circleVY = 0;
            circleVX = -CIRCLE_SPEED_X;
        break;
        case DIRECTION_NORTH_WEST:
            circleVY = -CIRCLE_SPEED_Y;
            circleVX = -CIRCLE_SPEED_X;
        break;
    }

}

function animate() {
    requestAnimationFrame(animate);
    circle.x += circleVX;
    circle.y += circleVY;
    
    if (checkCollision(circle, rect1)) {
        applyCollision(circle, rect1);
    } else if (checkCollision(circle, rect2)) {
        applyCollision(circle, rect2);
    }

    checkAndApplyBorderCollision(circle);

    //updating scores

    //if circle go beyond left edge, player 2 score
    if (circle.x + circle.getBounds().x <= 0) {
        player2score++;
        score2.text = player2score;
        resetCircle();
    }

    //if circle go beyond right edge, player 1 score
    if (circle.x + circle.getBounds().x >= canvas.width) {
        player1score++;
        score1.text = player1score;
        resetCircle();
    }

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

    checkRectsCollisionWithBorder(); 

    stage.update();

}

requestAnimationFrame(animate);