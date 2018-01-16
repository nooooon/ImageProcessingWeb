import State from '../core/State.js';

export default class DrawRect{

  constructor(container, renderer){

    this.container = container;
    this.renderer = renderer;

    this.isDrawing = false;

    this.container.interactive = true;
    this.container
      // events for drag start
      .on('mousedown', (e) => this.onDragStart(e))
      .on('touchstart', (e) => this.onDragStart(e))
      // events for drag end
      .on('mouseup', (e) => this.onDragEnd(e))
      .on('mouseupoutside', (e) => this.onDragEnd(e))
      .on('touchend', (e) => this.onDragEnd(e))
      .on('touchendoutside', (e) => this.onDragEnd(e))
      // events for drag move
      .on('mousemove', (e) => this.onDragMove(e))
      .on('touchmove', (e) => this.onDragMove(e));

    this.prevGraphics = null;
  }

  onDragStart(e){
    if(State.getState() !== State.RECT){
      return;
    }
    this.dragData = e.data;
    this.isDrawing = true;
    this.startPos = this.dragData.getLocalPosition(this.container.parent);
  }

  onDragEnd(e){
    this.dragData = null;
    this.isDrawing = false;
    this.lastPos = null;

    this.prevGraphics = null;
  }

  onDragMove(e){
    if(this.isDrawing && this.dragData != null && this.startPos){
      let newPos = this.dragData.getLocalPosition(this.container.parent);

      this.lastPos = newPos;

      this.onDraw();
    }
  }

  onDraw(){
    if(this.prevGraphics !== null){
      this.container.removeChild(this.prevGraphics);
    }

    let graphics = new PIXI.Graphics();
    graphics.beginFill(State.getColor().replace(/#/g, '0x'), 1);
    graphics.drawRect(this.startPos.x, this.startPos.y, this.lastPos.x - this.startPos.x, this.lastPos.y - this.startPos.y);
    graphics.endFill();

    this.container.addChild(graphics);
    this.prevGraphics = graphics;
  }
}