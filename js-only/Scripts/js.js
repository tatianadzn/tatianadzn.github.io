let canvas = document.createElement('canvas');
const body =  document.getElementsByTagName('body')[0];
body.appendChild(canvas);
canvas.width = 400;
canvas.height = 400;
let ctx = canvas.getContext('2d');


pic = new Image();
pic.src = 'https://source.unsplash.com/collection/1127163/400x400';

pic.onload = function () {
    ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillStyle = "white";
    ctx.fillText("quote", 100, canvas.height/2);
};

