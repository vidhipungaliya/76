img= "";
objects = [];
status = "";

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
}

function modelLoaded(){
    console.log("model loaded");
    status = true;
    objectDetector.detect(video, gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

var x = document.getElementById("myAudio");
function draw(){
    objectDetector.detect(video, gotResults);
    image(video, 0 , 0 , 380 , 380);
    if (status  != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResults);
        for (i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Baby Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent+"%" , objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
