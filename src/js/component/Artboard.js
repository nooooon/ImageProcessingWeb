export default class Artboard{

  constructor(container, renderer){

    this.container = container;
    this.renderer = renderer;

    this.artboard = new PIXI.Graphics();
  }

  setArtboard(width, height, color){

    this.width = width;
    this.height = height;
    this.color = color;

    this.x = (this.renderer.width - this.width) / 2;
    this.y = (this.renderer.height - this.height) / 2;
    
    this.drawRect(this.color);

    this.container.addChild(this.artboard);
  }

  drawRect(color){
    this.artboard.beginFill(color);
    this.artboard.drawRoundedRect(this.x, this.y, this.width, this.height, 0);
    this.artboard.endFill();
  }

  hide(){
    this.artboard.alpha = 0;
  }

  show(){
    this.artboard.alpha = 1;
  }

  resize(){
    this.x = (this.renderer.width - this.width) / 2;
    this.y = (this.renderer.height - this.height) / 2;

    this.artboard.clear();

    this.drawRect(this.color);
  }

}