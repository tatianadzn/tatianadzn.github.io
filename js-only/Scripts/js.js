canvas = createCanvas();
ctx = canvas.getContext('2d');
let pic1 = new Image(), pic2 = new Image(), pic3 = new Image(), pic4 = new Image();
const waitLoadPics = waitPic([pic1, pic2, pic3, pic4]);

pic1.width = getRndSize();
pic1.height = getRndSize();

sentAJAXreqPic();

let saveButton = document.createElement("button");
document.body.appendChild(saveButton);
saveButton.textContent = "Download";
saveButton.style.width = "400px";
saveButton.style.display = "block";
saveButton.onclick = function () {
    let ahref = document.createElement("a");
    ahref.href = canvas.toDataURL("image/png");
    ahref.download = "image.png";
    ahref.click();
};

//functions
function createCanvas(){
    let canvas = document.createElement('canvas');
    const body =  document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    canvas.width = 400;
    canvas.height = 400;
    return canvas;
}

function callbackFunctionQuote(result){
    if (result.quoteText.split(" ").length > 20){
        sentAJAXreqQuote();
        return 0;
    }
    ctx.drawImage(pic1, 0, 0);
    ctx.drawImage(pic2, pic1.width, 0);
    ctx.drawImage(pic3, 0, pic1.height);
    ctx.drawImage(pic4, pic1.width, pic1.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "28px bold";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    textSeparator(ctx, result.quoteText, 200, 360, 28);
}

function waitPic(pics) {
    return Promise.all(pics.map(setOnLoadPromise))
}

function setOnLoadPromise(pic) {
    return new Promise(function(resolve) {
        pic.onload = resolve;
    })
}

function sentAJAXreqQuote(){
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=?",
        dataType: "jsonp",
        timeout: 1000
    })
        .done(callbackFunctionQuote)
        .fail(function () {
            alert("quote failed");
        });
}

function sentAJAXreqPic(){
   $.ajax({
       url: "https://api.unsplash.com/photos/random?client_id=c5d7d717a09724e63caa42d78fb0a24e39c80d0e167118011b667e38152aa496&count=4",
       dataType: "json",
       type: "GET",
       timeout: 1000
   })
       .done(callbackFunctionPic)
       .fail(function () {
           alert("pics failed");
       });
}

async function callbackFunctionPic(result) {
    pic1.src = result[0].urls.small;
    pic2.src = result[1].urls.small;
    pic3.src = result[2].urls.small;
    pic4.src = result[3].urls.small;
    await waitLoadPics;
    sentAJAXreqQuote();
}

function textSeparator(context, text, marginLeft, maxWidth, lineHeight)
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





