class Webponent{
  constructor(type, parent){
    this.type = type;
    this.children = [];
    this.parent = null;
    if(parent !== null){
      this.parent = parent;
      this.parent.children.push(this);
    }
    this.HTML = null;
  }
  
  createHTML(){
    this.genHTML();
    if(this.children.length){
      this.children.forEach(c => {
        c.createHTML();
      });
    }
  }
  
  genHTML(){}
  
  attributesToClass(attributes){
    let out = this.type;
    attributes.forEach(a => {
      out += ' ' + this.type + '-' + a; 
    });
    return out;
  }
}

class Main extends Webponent{
  constructor(){
    super('main', null);
  }
  
  genHTML(){
    this.HTML = createDiv();
    this.HTML.class('main');
  }
}

class Panel extends Webponent{
  constructor(parent, attributes = ['out', 'round'], w = 0, h = 0){
    super('p', parent);
    this.atbs = attributes;
    this.w = w;
    this.h = h;
  }
  
  genHTML(){
    this.HTML = createDiv();
    this.HTML.class(this.attributesToClass(this.atbs));
    this.HTML.parent(this.parent.HTML);
    if(this.w > 0){
      this.HTML.style('width: ' + this.w + 'px');
    }
    if(this.h > 0){
      this.HTML.style('height: ' + this.h + 'px');
    }
  }
}

class HorzGroup extends Webponent{
  constructor(parent, alignment = 5){ //alignment is arranged in a 3x3 grid from 1 - 9 (5 is centered)
    super('h', parent);
    this.aln = alignment;
  }
  
  genHTML(){
    this.HTML = createDiv();
    this.HTML.class(this.formatClass());
    this.HTML.parent(this.parent.HTML);
  }
  
  formatClass(){
    let out = 'h ';
    switch(this.aln) {
      case 1:
        out += 'hv-l vh-t';
        break;
      case 2:
        out += 'hv-c vh-t';
        break;
      case 3:
        out += 'hv-r vh-t';
        break;
      case 4:
        out += 'hv-l vh-c';
        break;
      case 5:
        out += 'hv-c vh-c';
        break;
      case 6:
        out += 'hv-r vh-c';
        break;
      case 7:
        out += 'hv-l vh-b';
        break;
      case 8:
        out += 'hv-c vh-b';
        break;
      case 9:
        out += 'hv-r vh-b';
        break;
      default:
        out += 'hv-c vh-c';
        break;
    }
    return out;
  }
}

class VertGroup extends Webponent{
  constructor(parent, alignment = 5){ //alignment is arranged in a 3x3 grid from 1 - 9 (5 is centered)
    super('v', parent);
    this.aln = alignment;
  }
  
  genHTML(){
    this.HTML = createDiv();
    this.HTML.class(this.formatClass());
    this.HTML.parent(this.parent.HTML);
  }
  
  formatClass(){
    let out = 'v ';
    switch(this.aln) {
      case 1:
        out += 'vh-t hv-l';
        break;
      case 2:
        out += 'vh-c hv-l';
        break;
      case 3:
        out += 'vh-b hv-l';
        break;
      case 4:
        out += 'vh-t hv-c';
        break;
      case 5:
        out += 'vh-c hv-c';
        break;
      case 6:
        out += 'vh-b hv-c';
        break;
      case 7:
        out += 'vh-t hv-r';
        break;
      case 8:
        out += 'vh-c hv-r';
        break;
      case 9:
        out += 'vh-b hv-r';
        break;
      default:
        out += 'vh-c hv-c';
        break;
    }
    return out;
  }
}

class Canvas extends Webponent{
  constructor(parent, dims = [500, 500]){
    super('canvas', parent);
    this.w = dims[0];
    this.h = dims[1];
  }
  
  genHTML(){
    this.HTML = createCanvas(this.w, this.h);
    this.HTML.parent(this.parent.HTML);
  }
}

class Button extends Webponent{
  constructor(parent, colors, func = null, iconpath = null, hovertxt = 'Button'){
    super('button', parent);
    this.iconpath = iconpath;
    if(colors.length){
      this.clr = colors[0];
      this.hclr = colors[1];
    }else{
      this.clr = '#e9e9e9';
      this.hclr = '#aaaaaa';
    }
    if(func === null){
      this.purpose = 'x'; //no purpose
    }else if(typeof func === 'string'){
      this.purpose = 'l'; //link
    }else{
      this.purpose = 'f'; //function
    }
    this.func = func;
    this.htxt = hovertxt;
  }
  
  genHTML(){
    if(this.purpose === 'l'){
      this.HTML = createA(this.func, '', "_blank" );
    }else{
      this.HTML = createSpan();
    }
    this.HTML.class('butt');
    if(this.purpose === 'f'){
      this.HTML.mousePressed(this.func);
    }
    this.HTML.parent(this.parent.HTML);
    this.HTML.attribute('title', this.htxt);
    this.HTML.style('background-color: ' + this.clr);
    this.HTML.attribute('onmouseover', 'this.style.backgroundColor = \'' + this.hclr + '\'');
    this.HTML.attribute('onmouseout', 'this.style.backgroundColor = \'' + this.clr + '\'');
    
    if(this.iconpath === null || this.iconpath === ''){
      this.HTML.style('padding: 20px');
    }else{
      let icon = createImg(this.iconpath, this.iconpath);
      icon.style('width: 30px');
      icon.parent(this.HTML);
    }
  }
}

class Text extends Webponent{
  constructor(parent, txt, attributes = []){
    super('txt', parent);
    this.text = txt;
    this.atbs = attributes;
  }
  
  genHTML(){
    this.HTML = createDiv(this.text);
    this.HTML.class('txt');
    this.HTML.parent(this.parent.HTML);
  }
  
  changeText(newText){
    this.HTML.html(newText);
  }
}

class Slider extends Webponent{
  constructor(parent){
    super('slider', parent);
    this.sliderBar = null;
  }
  
  genHTML(){
    this.HTML = createDiv();
    this.HTML.class('slider-in slider-round');
    this.HTML.parent(this.parent.HTML);
    this.HTML.mousePressed(changeBar);
    this.sliderBar = createDiv();
    this.sliderBar.class('slider-knob');
    this.sliderBar.parent(this.HTML);
  }
}

let slider;
