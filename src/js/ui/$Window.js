/* UI */
/*
<div class="window-module">
  <div class="window-module__title">
    <div class="window-module__title-name">window title</div>
    <div class="window-module__close">×</div>
  </div>
  <div class="window-module__body">
    window body
  </div>
</div>
*/
export default class $Window{

  /* param {'title', 'text'} */
  constructor(param){

    this.dom = $(document.createElement("div")).addClass("window-module").appendTo("body");
    this.dom.title = $(document.createElement("div")).addClass("window-module__title").appendTo(this.dom);
    this.dom.title.name = $(document.createElement("div")).addClass("window-module__title-name").appendTo(this.dom.title);
    this.dom.title.close = $(document.createElement("div")).addClass("window-module__close").appendTo(this.dom.title);
    this.dom.body = $(document.createElement("div")).addClass("window-module__body").appendTo(this.dom);

    this.dom.title.name.text(param.title);
    this.dom.body.text(param.text);

    this.moveFlag = false;
    this.movePosX = 50;
    this.movePosY = 50;

    this.dom.css({
      'left': this.movePosX,
      'top': this.movePosY
    });

    // event
    this.dom.title.close.on('click', (e) => this.onWindowClose(e));

    this.dom.title
      // events for drag start
      .on('mousedown', (e) => this.onDragStart(e))
      .on('touchstart', (e) => this.onDragStart(e))
      // events for drag end
      .on('mouseup', (e) => this.onDragEnd(e))
      .on('mouseupoutside', (e) => this.onDragEnd(e))
      .on('touchend', (e) => this.onDragEnd(e))
      .on('touchendoutside', (e) => this.onDragEnd(e));
  }

  onWindowClose(e){
    this.dom.css('display', 'none');
  }

  onDragStart(e){
    let dragData = e.data;
    this.movePosX = e.clientX - parseInt(this.dom.css('left'));
    this.movePosY = e.clientY - parseInt(this.dom.css('top'));
    this.moveFlag = true;

    $(window)
      .on('mousemove', (e) => this.onDragMove(e))
      .on('touchmove', (e) => this.onDragMove(e));
  }

  onDragEnd(e){
    this.moveFlag = false;
    $(window)
      .off('mousemove')
      .off('touchmove');
  }

  onDragMove(e){
    if(this.moveFlag){
      this.dom.css({
        'left': e.clientX - this.movePosX,
        'top': e.clientY - this.movePosY
      });
    }
  }
}