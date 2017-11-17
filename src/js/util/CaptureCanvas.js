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
}