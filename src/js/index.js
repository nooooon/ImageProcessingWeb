/* index.js */
'use strict'

import ImageSprite from './component/ImageSprite.js';

class App{
  constructor(arg = {}){
    console.log("App", this, arg);

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.container = arg.container;

    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {
      backgroundColor : 0xeeee66, antialias: false, transparent: false, resolution: 1
    });
    this.renderer.autoResize = true;
    this.container.appendChild(this.renderer.view);

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

    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.autoStart = false;
    this.ticker.add((delta) => {
      this.update();
    });
    this.ticker.start();
    // console.log(this.ticker);
  }

  update(){
    this.renderer.render(this.scene);
  }

  stop(){
  }

  resize(){
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.resize(this.width, this.height);
  }

  setImage(imgSrc){
    let imageSprite = new ImageSprite(imgSrc);
    this.scene.addChild(imageSprite);
    this.imageSpriteList.push(imageSprite);
  }

  onKeydown(e){
    console.log(e.key);
    if(e.key == 1){
      console.log(this.imageSpriteList[0].width);
    }
  }
}

(function(){
  const app = new App({container: document.getElementById('canvas-wrapper')});

  app.start();

  /* file input */
  $("#inputFile").change(function(){
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

})();