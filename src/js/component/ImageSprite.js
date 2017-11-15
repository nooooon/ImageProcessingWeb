export default class ImageSprite extends PIXI.Sprite{
  
  constructor(arg, parent){
    let texture = new PIXI.Texture.fromImage(arg);
    
    super(texture);
    this.texture.baseTexture.on('loaded', () => {this.onTextureLoaded()});

    this.anchor.x = this.anchor.y = 0.5;
    this.interactive = true;
    this.buttonMode = true

    this
      // events for drag start
      .on('mousedown', this.onDragStart)
      .on('touchstart', this.onDragStart)
      // events for drag end
      .on('mouseup', this.onDragEnd)
      .on('mouseupoutside', this.onDragEnd)
      .on('touchend', this.onDragEnd)
      .on('touchendoutside', this.onDragEnd)
      // events for drag move
      .on('mousemove', this.onDragMove)
      .on('touchmove', this.onDragMove);
  }

  onTextureLoaded(){
    console.log(this, "onTextureUpdate", this.width, this.height, this.x, this.y);
  }

  onDragStart(e){
    this.dragData = e.data;
    this.dragFlag = true;
    this.lastPos = this.dragData.getLocalPosition(this.parent);
  }

  onDragEnd(e){
    this.dragData = null;
    this.dragFlag = false;
    this.lastPos = null;
  }

  onDragMove(e){
    if(this.dragFlag && this.dragData != null && this.lastPos){
      let newPos = this.dragData.getLocalPosition(this.parent);
      this.position.x += newPos.x - this.lastPos.x;
      this.position.y += newPos.y - this.lastPos.y;
      this.lastPos = newPos;
    }
  }
}