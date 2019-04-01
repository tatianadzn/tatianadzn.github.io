function createCanvas() {

    let canvas = document.createElement('canvas');
    const body =  document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    canvas.width = 256;
    canvas.height = 256;
    let ctx = canvas.getContext('2d');
    ctx.fillRect(0,0, canvas.width, canvas.height);
    return canvas;
}

canv = createCanvas();
