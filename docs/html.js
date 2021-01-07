function setupHTML(){
  main = new Main();
  let mainGroup = new VertGroup(main);
  
  let canvPanel = new Panel(mainGroup);
  let canv = new Canvas(canvPanel, [max(500,windowWidth-200), max(500,windowHeight-200)]);
  
  let bottomGroup = new HorzGroup(mainGroup, 9);
  
  let button1 = new Button(bottomGroup, ['#e9e9e9', '#FFFFFF'], 'https://github.com/juicetinliu/BlehSim', 'github.png', 'Visit Github repo');
  
  let button2 = new Button(bottomGroup, ['#e9e9e9', '#FFFFFF'], 'https://p5js.org', 'https://p5js.org/assets/img/asterisk-01.png', 'P5.js');
  
  main.createHTML();
}
