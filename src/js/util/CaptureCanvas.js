export default class CaptureCanvas{
  
  constructor(){

  }

  downloadCapture(canvas, format = 'jpeg', quality = 1.0){

    let src;
    if(format == 'jpeg'){
      src = canvas.toDataURL('image/' + format, quality);
    }else if(format == 'png' || format == 'gif'){
      src = canvas.toDataURL('image/' + format);
    }else{
      return;
    }

    const a = document.createElement("a");
    a.setAttribute('href', src);
    a.setAttribute('download', 'download.' + format);
    a.click()
  }

  downloadCaptureTrim(canvas, x, y, w, h, format = 'jpeg', quality = 1.0){
    let newCanvas = document.createElement('canvas');
    let ctx = newCanvas.getContext('2d');
    let img = new Image();
    img.src = canvas.toDataURL();
    img.onload = () => {
      newCanvas.width = w;
      newCanvas.height = h;
      ctx.drawImage(img, x, y, w, h, 0, 0, w, h);

      this.downloadCapture(newCanvas, format, quality);
    }
  }
}