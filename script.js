let mapSizeY;
let mapSizeX;

//stats
let wins = 0
let growSize = 100;
let growUPGAmount = 5
let growUPGRatio = 0.25
let moveAmount = 4;
let speedUPGAmount = 2
let speedUPGRatio = 0.25

//game variables
let border = 6
let maxDrift = 1
let minDrift = -1
let allRadius = 25

//rectangle setup
let rectX = mapSizeX / 2;
let rectY = mapSizeY / 1.2;
let rectSize = 25;
let rectRangeX1;
let rectRangeY1;
let rectRangeX2;
let rectRangeY2;

//circle setup
circleSpreadCoverage = 300;
circleSpread = 0;
circleAmount = 200
circlesSetup = []

function setup() {
  if (localStorage.getItem("wins") !== null) {
    wins = Number(localStorage.getItem("wins"));
  }
  if (localStorage.getItem("moveAmount") !== null) {
    moveAmount = Number(localStorage.getItem("moveAmount"));
  }
  if (localStorage.getItem("growSize") !== null) {
    growSize = Number(localStorage.getItem("growSize"));
  }
  if (localStorage.getItem("rectSize") !== null) {
    rectSize = Number(localStorage.getItem("rectSize"));
  }
  
  mapSizeY = displayHeight - 20
  mapSizeX = displayWidth - 20
  createCanvas(mapSizeX, mapSizeY); 
  let button1 = createButton('1 Win | UPG Speed');
  button1.position(10, 115);
  button1.mousePressed(speedUPG);
  
  let button2 = createButton('1 Win | UPG Size');
  button2.position(10, 145);
  button2.mousePressed(sizeUPG);
  
  rectX = mapSizeX / 2;
  rectY = mapSizeY / 1.2;
  
  //adds:
  //0.circle Number
  //1.CircleX
  //2.CircleY
  //3.Left X Range
  //4.Right X Range
  //5.Top Y Range
  //6.Bottom Y Range
  //7.DriftX
  //8.DriftY
  
  growUPGAmount = (growSize / circleAmount) * growUPGRatio
  growSize = growSize / circleAmount
  
  speedUPGAmount = moveAmount * speedUPGRatio
  
  circleSpread = circleSpreadCoverage / circleAmount
  
  for (let i = 0; i < circleAmount; i++) {
    append(circlesSetup, [i, (mapSizeX/ 2) + ((-1) ** i * (circleSpread * i)), (mapSizeY / 2), 0, 0, 0, 0, 0, 0])
  }
}

function move() {
  if (keyIsDown(UP_ARROW) === true) {
    if (rectY > 0 + border) {
      rectY -= moveAmount;
    } 
    else {
      for (let Number = 0; Number < circleAmount; Number++) {
        circlesSetup[Number][2] += moveAmount;
    }
    }
  }
  if (keyIsDown(DOWN_ARROW) === true) {
    if (rectY <= mapSizeY - rectSize - border) {
      rectY += moveAmount;
    } 
    else {
      for (let Number = 0; Number < circleAmount; Number++) {
        circlesSetup[Number][2] -= moveAmount;
    }
    }
  }
  if (keyIsDown(LEFT_ARROW) === true) {
    if (rectX > 0 + border) {
      rectX -= moveAmount;
    } 
    else {
      for (let Number = 0; Number < circleAmount; Number++) {
        circlesSetup[Number][1] += moveAmount;
    }
    }
  }
  if (keyIsDown(RIGHT_ARROW) === true) {
    if (rectX <= mapSizeX - rectSize - border) {
      rectX += moveAmount;
    } 
    else {
      for (let Number = 0; Number < circleAmount; Number++) {
        circlesSetup[Number][1] -= moveAmount;
    }
    }
  }
}

function circleRandomMove(Number) {
  circlesSetup[Number][1] += circlesSetup[Number][7]
  circlesSetup[Number][2] += circlesSetup[Number][8]
}

function eat(Number) {
  if (rectRangeX1 < circlesSetup[Number][4] && rectRangeX2 > circlesSetup[Number][3]) {
    if (rectRangeY1 < circlesSetup[Number][6] && rectRangeY2 > circlesSetup[Number][5]) {
      moveCircle(Number)
    }
  }
}

function moveCircle(Number) {
  rectSize += growSize;
  rectX -= growSize / 2
  rectY -= growSize / 2
  circlesSetup[Number][1] = random(0, mapSizeX);
  circlesSetup[Number][2] = random(0, mapSizeY);
  circlesSetup[Number][7] = random(minDrift, maxDrift)
  circlesSetup[Number][8] = random(minDrift, maxDrift)
}

function moveBack(Number) {
  if (circlesSetup[Number][1] > mapSizeX + allRadius) {
    circlesSetup[Number][1] = 0 - allRadius;
  } else if (circlesSetup[Number][1] < 0 - allRadius) {
    circlesSetup[Number][1] = mapSizeX + allRadius;
  } else if (circlesSetup[Number][2] > mapSizeY + allRadius) {
    circlesSetup[Number][2] = 0 - allRadius;
  } else if (circlesSetup[Number][2] < 0 - allRadius) {
    circlesSetup[Number][2] = mapSizeY + allRadius;
  }
}

function circleSizeSetter(Number) {
  circle(circlesSetup[Number][1], circlesSetup[Number][2], allRadius);
  
  circlesSetup[Number][3] = circlesSetup[Number][1] - allRadius / 2;
  circlesSetup[Number][4] = circlesSetup[Number][1] + allRadius / 2;
  circlesSetup[Number][5] = circlesSetup[Number][2] - allRadius / 2;
  circlesSetup[Number][6] = circlesSetup[Number][2] + allRadius / 2;
}

function rectSizeSetter() {
  rect(rectX, rectY, rectSize);
  rectRangeX1 = rectX;
  rectRangeX2 = rectX + rectSize;
  rectRangeY1 = rectY;
  rectRangeY2 = rectY + rectSize;
}

function winCounter() {
  if (rectSize > mapSizeX * 2) {
    erase()
    noErase()
    rectSize = 25
    wins += 1
    rectX = mapSizeX / 2
    rectY = mapSizeY / 1.2
  }
}

function speedUPG() {
  if (wins >= 1) {
    moveAmount += speedUPGAmount
    wins -= 1
  }
}

function sizeUPG() {
  if (wins >= 1) {
    growSize += growUPGAmount
    wins -= 1
  }
}

function saveProgress() {
  localStorage.setItem("wins", wins);
  localStorage.setItem("rectSize", rectSize);
  localStorage.setItem("moveAmount", moveAmount);
  localStorage.setItem("growSize", growSize);
}

function texts() {
  textSize(15)
  text("Size " + str(rectSize) , 10, 25)
  text("Wins " + str(wins) , 10, 50)
  text("Grow Amount " + str(growSize) , 10, 75)
  text("Speed " + str(moveAmount) , 10, 100)
}

function draw() {
  background(220);
  
  for (let i = 0; i < circleAmount; i++) {
  moveBack(i)
  fill("green")
  circleSizeSetter(i)
  fill("red")
  rectSizeSetter(i)
  eat(i)
  circleRandomMove(i)
  }
  
  fill("black")
  texts() 
  winCounter()
  move()
  saveProgress()
}
