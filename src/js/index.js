/* index.js */
'use strict'

import State from './core/State.js';
import DrawTool from './core/DrawTool.js';
import DrawRect from './core/DrawRect.js';
import ImageSprite from './component/ImageSprite.js';
import Artboard from './component/Artboard.js';
import UI_Window from './ui/$Window.js';
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
    State.setState(State.HAND);

    $(".debug").text(State.getState().toString());

    State.setColor($("#color-selecter").val());
    State.setPenSize($("#pen-size").val());
  }

  start(){
    /* scene */
    this.scene = new PIXI.Container();

    this.app.ticker.start();

    this.app.stage.addChild(this.scene);


    /* artboard */
    this.artboard = new Artboard(this.scene, this.app.renderer);
    this.artboard.setArtboard(500, 400, 0xFFFFFF);

    /* drawtool */
    this.drawTool = new DrawTool(this.scene, this.app.renderer);

    /* draw rect */
    this.drawRect = new DrawRect(this.scene, this.app.renderer);

    /* UI window */
    this.window = new UI_Window({'title': 'window title', 'text': 'window body'});
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

    this.artboard.resize();
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

    this.artboard.hide();

    this.app.ticker.update();
    
    const captureCanvas = new CaptureCanvas();
    // captureCanvas.downloadCapture(this.app.view, 'png');
    captureCanvas.downloadCaptureTrim(this.app.view, this.artboard.x, this.artboard.y, this.artboard.width, this.artboard.height, 'png');

    this.artboard.show();
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

  $(".controller__btn-hand").on('click', function(){
    State.setState(State.HAND);
    $(".debug").text(State.getState().toString());
  });

  $(".controller__btn-pen").on('click', function(){
    State.setState(State.PEN);
    $(".debug").text(State.getState().toString());
  });

  $(".controller__btn-rect").on('click', function(){
    State.setState(State.RECT);
    $(".debug").text(State.getState().toString());
  });

  $("#color-selecter").on('change', function(){
    State.setColor(this.value);
  });

  $("#pen-size").on('input', function(){
    State.setPenSize(this.value);
  });



})();