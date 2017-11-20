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
      transparent: true, 
      antialias: false, 
      preserveDrawingBuffer: true, 
      resolution: 1, 
      // backgroundColor : 0xFFFFFF,
      autoResize: true
    });

    this.container.appendChild(this.app.view);

    this.app.ticker.add((delta) => {
      this.stats.begin();
      this.update();
      this.stats.end();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
    window.addEventListener('keydown', (e) => {
      this.onKeydown(e)
    });

    this.stats = new Stats();
    this.stats.domElement.style.position = "fixed";
    this.stats.domElement.style.right    = "5px";
    this.stats.domElement.style.top      = "5px";
    document.body.appendChild(this.stats.domElement);

    this.imageSpriteList = [];

    /* artboard */
    this.artboard = new PIXI.Graphics();
    this.artboard.beginFill(0xFFFFFF);
    this.artboard.drawRoundedRect(this.width * 0.1, this.height * 0.1, this.width * 0.8, this.height * 0.8, 0);
    this.artboard.endFill();

    this.app.stage.addChild(this.artboard);
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

  setImage(src){
    let imageSprite = new ImageSprite(src, this.scene, this.app.renderer);

    this.imageSpriteList.push(imageSprite);
  }

  onKeydown(e){
    console.log('onKeydown : ' + e.key);
    if(e.key == 0){
    }
  }

  save(){

    // test
    this.artboard.alpha = 0;
    this.app.ticker.update();
    
    const captureCanvas = new CaptureCanvas();
    // captureCanvas.downloadCapture(this.app.view, 'png');
    captureCanvas.downloadCaptureTrim(this.app.view, this.width * 0.1, this.height * 0.1, this.width * 0.8, this.height * 0.8, 'png');

    this.artboard.alpha = 1;
  }
}

(function(){
  const app = new App({container: document.getElementById('canvas-wrapper')});

  app.start();

  /* file input */
  $("#input-file").change(function(){
    let file = this.files[0];
    if(!file.type.match(/^image\/(png|jpeg|gif)$/)){
      file = null;
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