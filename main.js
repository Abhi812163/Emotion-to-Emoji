//Setting camera dimensions
Webcam.set({
    width:360,
    height:300,
    image_format: 'png',
    png_quality:90,
});

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img src="+data_uri+" id='result_2'>";
    });
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/srsKmb70q/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model is loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speakData1="The first Prediction is "+prediction1;
    speakData2="The second Prediction is "+prediction2;
    var utterthis=new SpeechSynthesisUtterance(speakData1+speakData2);
    utterthis.rate=0.5;
    synth.speak(utterthis);
}

function check(){
    img=document.getElementById("result_2");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label;
    document.getElementById("result_emotion_name2").innerHTML=results[1].label;
    prediction1=results[0].label;
    prediction2=results[1].label;
    speak();
    if(results[0].label=="Happy"){
        document.getElementById("update_emoji").innerHTML="&#128512;";
    }
    if(results[0].label=="Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;";
    }
    if(results[0].label=="Angry"){
        document.getElementById("update_emoji").innerHTML="&#128548;";
    }
    if(results[0].label=="Shocked"){
        document.getElementById("update_emoji").innerHTML="&#128552;";
    }

    if(results[1].label=="Happy"){
        document.getElementById("update_emoji2").innerHTML="&#128512;";
    }
    if(results[1].label=="Sad"){
        document.getElementById("update_emoji2").innerHTML="&#128532;";
    }
    if(results[1].label=="Angry"){
        document.getElementById("update_emoji2").innerHTML="&#128548;";
    }
    if(results[1].label=="Shocked"){
        document.getElementById("update_emoji2").innerHTML="&#128552;";
    }
}
}