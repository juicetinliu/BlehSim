class Blessed extends Being{
  constructor(x, y, dir, speed, size, blessrad){
    super(x, y, dir, speed, size);
    //this.state = '0'; //0 - wandering || 1 - rest || 2 - infected
    this.blessrad = blessrad;
    this.healavailable = true;
    this.healedbeing = null;
  }
  
  move(){
    switch(this.state){
      case '0':
        this.dir = (this.dir + radians(random(-15,15)))%(2*PI);
        this.x = this.x + this.speed*cos(this.dir);
        this.y = this.y + this.speed*sin(this.dir);
        
        if(this.x < 0){
          this.x = width;
        }else if(this.x > width){
          this.x = 0;
        }
        if(this.y > height){
          this.y = 0;
        }else if(this.y < 0){
          this.y = height;
        }
        
        this.counter += 1;
        if(this.counter >= this.nexttime){
          this.state = '1';
          this.nexttime = int(random(0,50));
          this.counter = 0;
        }
        break;
        
      case '1':
        this.counter += 1;
        if(this.counter >= this.nexttime){
          this.state = '0';
          this.nexttime = int(random(50,200));
          this.counter = 0;
        }
        break;
        
      //case '2':
      //  counter += 1;
      //  if(counter >= nexttime){
      //    for(int bl = 0; bl < 5+blehsdata; bl++){
      //      blehs.add(new bleh(this.x, this.y, dir));
      //    }
      //    state = '3';
      //  }
      //  break;
        
      //case '3':
      //  //dead
      //  break;
        
      case '4':
        this.counter += 1;
        fill(255,255,0,50);
        noStroke();
        let healx = this.healedbeing.x;
        let healy = this.healedbeing.y;
        ellipse(healx, healy, 10,10);
        stroke(255,255,0,200);
        line(this.x,this.y,healx,healy);
        this.dir = atan2(healy-this.y,healx-this.x);
        if(this.counter >= this.nexttime){
          this.healedbeing.infected = false;
          this.healedbeing.state = '0';
          this.healedbeing.beinghealed = false;
          this.state = '0';
          this.nexttime = int(random(50,200));
          this.healavailable = true;
          this.counter = 0;
        }
        break;
      
      default:
        this.state = '0';
        break;
    }
    //fill(255);
    //text(state,500,20);
  }
  
  bless(beings, blehs){
    beings.forEach(b => {
      if(dist(this.x, this.y, b.x, b.y) < this.blessrad && b.state != '2' && b.state != '3'){
        b.blessed = 2;
      }else if(this.healavailable && !b.beinghealed && dist(this.x, this.y, b.x, b.y) < this.blessrad && (b.state == '2' || b.state == '3')){
        this.healedbeing = b;
        b.beinghealed = true;
        this.healavailable = false;
        this.nexttime = int(random(190-(9.5*healsdata),200-(10*healsdata)));
        this.counter = 0;
        this.state = '4';
      }
    });
    for(let b = blehs.length - 1; b >= 0; b--){
      let thisbleh = blehs[b];
      if(dist(this.x, this.y, thisbleh.x, thisbleh.y) < this.blessrad){
        blehs.splice(b, 1);
        stroke(255,255,0);
        point(thisbleh.x, thisbleh.y);
        point(thisbleh.x+1, thisbleh.y);
        point(thisbleh.x-1, thisbleh.y);
        point(thisbleh.x, thisbleh.y+1);
        point(thisbleh.x, thisbleh.y-1);
      }
    }
  }
  
  //void resurrect(ArrayList<being> beings){
  //  for(int b = 0; b < beings.size(); b++){
  //    being thisbeing = beings.get(b);
  //    if(dist(x, y, thisbeing.x, thisbeing.y) < blessrad){
  //      thisbeing.blessed = 2;
  //    }
  //  }
  //}
  
  display(){
    push();
    translate(this.x,this.y);
    rotate(this.dir);
    
    fill(255,255,0,25);
    noStroke();
    
    //noFill();
    //stroke(255,255,0,50);
    //strokeWeight(1);
    ellipse(0,0,this.blessrad*2,this.blessrad*2);
  
    noStroke();
    fill(255,255,0);
    triangle(0,this.size*-3/5,0,this.size*3/5,this.size,0);
    arc(0,0,this.size*6/5,this.size*6/5,PI/2,3*PI/2);
    
    pop();
  }
}
