function createCanvas(){
    let canvas = document.createElement('canvas');
    const body =  document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    canvas.width = 400;
    canvas.height = 400;
    return canvas;
}


canvas = createCanvas();
ctx = canvas.getContext('2d');

pic = new Image();
pic.src = 'https://source.unsplash.com/collection/1127163/400x400';

function callbackFunction(result){
    pic.onload = function () {
        ctx.drawImage(pic, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "28px bold";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        wrapText(ctx, result.quoteText, 200, 150, 360, 28);
    };
}

text = $.ajax({
   url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=?",
   dataType: "jsonp",
});
text.then(callbackFunction);

function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight)
{
    var words = text.split(" ");
    var countWords = words.length;
    var line = "";
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + " ";
        var testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
            context.fillText(line, marginLeft, marginTop);
            line = words[n] + " ";
            marginTop += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, marginLeft, marginTop);
}
