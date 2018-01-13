import State from '../core/State.js';

export default class DrawTool{

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
    this.points = [];
  }

  onDragStart(e){
    if(State.getState() != State.PEN){
      return;
    }
    this.dragData = e.data;
    this.isDrawing = true;
    this.lastPos = this.dragData.getLocalPosition(this.container.parent);
  }

  onDragEnd(e){
    this.dragData = null;
    this.isDrawing = false;
    this.lastPos = null;

    this.prevGraphics = null;
    this.points = [];
  }

  onDragMove(e){
    if(this.isDrawing && this.dragData != null && this.lastPos){
      let newPos = this.dragData.getLocalPosition(this.container.parent);
      this.points.push({x: this.lastPos.x, y: this.lastPos.y});

      this.lastPos = newPos;

      this.onDraw();
    }
  }

  onDraw(){
    if(this.prevGraphics !== null){
      this.container.removeChild(this.prevGraphics);
    }

    let graphics = new PIXI.Graphics();
    graphics.lineStyle(4, 0x000000, 1);
    graphics.moveTo(this.points[0].x, this.points[0].y);

    let i;
    for (i = 1; i < this.points.length - 2; i++) {
      let c = (this.points[i].x + this.points[i + 1].x) / 2;
      let d = (this.points[i].y + this.points[i + 1].y) / 2;
    
      graphics.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
    }

    if(1< i){
      graphics.quadraticCurveTo(
        this.points[i].x,
        this.points[i].y,
        this.points[i + 1].x,
        this.points[i + 1].y
      );
    }

    this.container.addChild(graphics);
    this.prevGraphics = graphics;
  }
}