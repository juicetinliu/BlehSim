let main;

let beings = []; //TODO: being(panic mode, warning mode, evil mode)
let blesses = [];
let blehs = [];

let lifedata, speeddata, blehsdata, healsdata;

function setup() {
  lifedata = 5;
  speeddata = 5;
  blehsdata = 10;
  healsdata = 10;
  setupHTML();
  setupScene();
}


function draw() {
  background(0);
  beings.forEach(b => {
    b.move();
    b.infect(blehs);
    b.display();
  });
  blesses.forEach(b => {
    b.move();
    b.bless(beings, blehs);
    b.display();
  });
  for(let b = blehs.length - 1; b >= 0; b--){
    let tb = blehs[b];
    tb.display();
    tb.move();
    if(tb.die){
      blehs.splice(b, 1);
    }
  }
  
  fill(255);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text("FPS: " + int(frameRate()),15,15);
}

function setupScene(){
  let beingStartAmount = int(width*height/1600);
  beingStartAmount -= beingStartAmount % 100;
  let blessedStartAmount = beingStartAmount / 100;
  print(beingStartAmount);
  for(let b = 0; b < beingStartAmount; b++){
    beings.push(new Being(random(0,width), random(0,height), random(0,2*PI),0.5,5));
  }
  for(let s = 0; s < blessedStartAmount; s++){
    blesses.push(new Blessed(random(0,width), random(0,height), random(0,2*PI),0.5,5,50));
  }
}

function mousePressed(){
  if(mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0){
    for(let bl = 0; bl < 20; bl++){
      blehs.push(new Bleh(mouseX, mouseY, (float(bl)/5)*PI));
    }
  }
}
