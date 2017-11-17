/* index.js */
'use strict'

import ImageSprite from './component/ImageSprite.js';
import CaptureCanvas from './util/CaptureCanvas.js';

class App{
  constructor(arg = {}){
    console.log('App', this, arg);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.container = arg.container;


    this.app = new PIXI.Application({
      autoStart: false,
      width: this.width,
      height: this.height,
      transparent: false, 
      antialias: false, 
      preserveDrawingBuffer: true, 
      resolution: 1, 
      backgroundColor : 0xeeee66,
      autoResize: true
    });

    this.container.appendChild(this.app.view);

    this.app.ticker.add((delta) => {
      this.update();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
    window.addEventListener('keydown', (e) => {
      this.onKeydown(e)
    });

    this.imageSpriteList = [];
  }

  start(){
    /* scene */
    this.scene = new PIXI.Container();

    this.app.ticker.start();

    this.app.stage.addChild(this.scene);

  }

  update(){
    

  }

  stop(){
    this.app.ticker.stop();
  }

  resize(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.renderer.resize(this.width, this.height);
  }

  setImage(imgSrc){
    let imageSprite = new ImageSprite(imgSrc);
    this.scene.addChild(imageSprite);
    // this.app.stage.addChild(imageSprite);

    this.imageSpriteList.push(imageSprite);
  }

  onKeydown(e){
    console.log('onKeydown : ' + e.key);
    if(e.key == 0){
    }
  }

  save(){
    const captureCanvas = new CaptureCanvas();
    captureCanvas.downloadCapture(this.app.view, 'jpeg', 1);
  }
}

(function(){
  const app = new App({container: document.getElementById('canvas-wrapper')});

  app.start();

  /* file input */
  $("#input-file").change(function(){
    let file = this.files[0];
    if(!file.type.match(/^image\/(png|jpeg|gif)$/)){
      return;
    }

    let image = new Image();
    let reader = new FileReader();
    reader.onload = function(e){
      image.onload = function(){
        app.setImage(image.src);
      }
      image.src = e.target.result;
    }
    reader.readAsDataURL(file);
  });

  /* save image */
  $(".controller__btn-save").on('click', function(){
    app.save();
  });

})();