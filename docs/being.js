class Being{
  constructor(x, y, dir, speed, size){
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed;
    this.size = size;
    this.state = '0'; //0 - wandering || 1 - rest || 2 - infected
    this.counter = 0;
    this.nexttime = int(random(50,200));
    this.infected = false;
    this.blessed = 0;
    this.beinghealed = false;
  }
  
  move(){
    this.blesstimer();
    switch(this.state){
      case '0':
        this.dir = this.dir + ((random(1)>map(this.size,50,5,0.1,0.9)) ? 0 : radians(random(-15,15))%(2*PI));
        this.x = this.x + this.speed * cos(this.dir);
        this.y = this.y + this.speed * sin(this.dir);
        
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
        
      case '2':
        this.counter += 1;
        if(this.counter >= this.nexttime){
          for(let bl = 0; bl < blehsdata; bl++){
            blehs.push(new Bleh(this.x, this.y, this.dir));
          }
          this.state = '3';
        }
        break;
        
      case '3':
        //dead
        break;
        
      default:
        this.state = '0';
        break;
    }
    //fill(255);
    //text(state,500,20);
  }
  
  blesstimer(){
    if(this.blessed > 0){
      this.blessed -= 1;
    }
  }
  
  infect(blehs){
    if(!this.infected && this.blessed == 0){
      for(let b = blehs.length - 1; b >= 0; b--){
        let thisbleh = blehs[b];
        if(dist(thisbleh.x, thisbleh.y, this.x, this.y) < this.size/2){
          this.beinghealed = false;
          blehs.splice(b, 1);
          this.state = '2';
          this.nexttime = 50;
          this.counter = 0;
          this.infected = true;
          break;
        }
      }
    }
  }

  
  display(){
    push();
    translate(this.x,this.y);
    rotate(this.dir);
    
    if(this.state == '2' || this.state == '3'){
      noStroke();
      fill(255,128);
      ellipse(0,0,this.size,this.size);
      fill(255,0,0,128);
      ellipse(0,0,this.size-1,this.size-1);
    }else{
      if(this.blessed > 0){
        noStroke();
        fill(255,255,0);
        triangle(0,-this.size*4/5,0,this.size*4/5,this.size*6/5,0);
        arc(0,0,this.size*8/5,this.size*8/5,PI/2,3*PI/2);
      }
      //stroke(255);
      //line(0,0,5,0);
      noStroke();
      fill(255,200);
      triangle(0,-this.size*3/5,0,this.size*3/5,this.size,0);
      arc(0,0,this.size*6/5,this.size*6/5,PI/2,3*PI/2);
    }
    
    pop();
  }
}
