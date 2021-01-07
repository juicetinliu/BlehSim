class Bleh{
  constructor(x, y, dir){
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = 0.5+speeddata*0.1;
    this.state = '0'; //0 - wandering || 1 - pursue
    this.maxlife = 40+int(lifedata)*10;
    this.life = this.maxlife;
    this.die = false;
  }
  
  move(){
    switch(this.state){
      case '0':
        this.dir = (this.dir + radians(random(-10,10)))%(2*PI);
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
        
        this.life -= 1;
        if(this.life <= 0){
          this.die = true;
        }
        break;
        
      case '1':
        //dir = (dir + radians(random(-15,15)))%(2*PI);
        //x = x + speed*cos(dir);
        //y = y + speed*sin(dir);
        //life -= 1;
        //if(life <= 0){
        //  die = true;
        //}
        break;
      
      default:
        this.state = '0';
        break;
    }
  }
  
  display(){
    push();
    translate(this.x,this.y);
    stroke(255,0,0,map(this.life,0,this.maxlife,100,255));
    point(0,0);
    pop();
  }
}
