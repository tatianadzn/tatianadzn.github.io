canvas = createCanvas();
ctx = canvas.getContext('2d');

let pic1 = new Image(), pic2 = new Image(), pic3 = new Image(), pic4 = new Image();

pic1.width = getRndSize();
pic1.height = getRndSize();
pic1.src = 'https://source.unsplash.com/collection/1127163/' + pic1.width + 'x' + pic1.height;
pic2.src = 'https://source.unsplash.com/collection/1127168/' + (canvas.width-pic1.width) + 'x' + pic1.height;
pic3.src = 'https://source.unsplash.com/collection/1127170/' + pic1.width + 'x' + (canvas.height-pic1.height);
pic4.src = 'https://source.unsplash.com/collection/1127176/' + (canvas.width-pic1.width) + 'x' + (canvas.height-pic1.height);

sentAJAXreq();

//functions
function createCanvas(){
    let canvas = document.createElement('canvas');
    const body =  document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    canvas.width = 400;
    canvas.height = 400;
    return canvas;
}

function callbackFunction(result){
    if (result.quoteText.split(" ").length > 20){
        sentAJAXreq();
        return 0;
    }
    window.onload = function () {
        ctx.drawImage(pic1, 0, 0, pic1.width, pic1.height);
        ctx.drawImage(pic2, pic1.width, 0, pic2.width, pic2.height);
        ctx.drawImage(pic3, 0, pic1.height, pic3.width, pic3.height);
        ctx.drawImage(pic4, pic1.width, pic1.height, pic4.width, pic4.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = "28px bold";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        wrapText(ctx, result.quoteText, 200, 360, 28);
    };
}

function sentAJAXreq(){
    const text = $.ajax({
        url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=?",
        dataType: "jsonp",
    });
    text.then(callbackFunction);
}

function wrapText(context, text, marginLeft, maxWidth, lineHeight)
{
    const words = text.split(" ");
    let fulltext = [];
    let countWords = words.length;
    let line = "";
    let countlines = 0;
    for (let n = 0; n < countWords; n++) {
        let testLine = line + words[n] + " ";
        let testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
            line = words[n] + " ";
            countlines++;
        }
        else {
            line = testLine;
        }
        fulltext[countlines] = line;
    }
    let marginTop = (canvas.height - lineHeight*countlines)/2 ;
    for (let n = 0; n < fulltext.length; n++){
        context.fillText(fulltext[n], marginLeft, (marginTop+n*lineHeight));
    }
}

function getRndSize() {
    const numPool = [ 150, 200, 250];
    return numPool[Math.floor(Math.random() * numPool.length)];
}





