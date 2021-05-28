prediction_1 = "";
prediction_2 = "";

Webcam.set({
    height: 270,
    width: 350, 
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/h1F0pwXW2/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    dialogue_1 = "Prediction 1 is " + prediction_1;
    dialogue_2 = "Prediction 2 is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(dialogue_1 + dialogue_2);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("emotion_of_person").innerHTML = result[0].label;
        document.getElementById("emotion_of_person2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if(result[0].label == "Laughing")
        {
            document.getElementById("emoji_of_emotion").innerHTML = "&#128512;";
        }
        if(result[0].label == "Happy")
        {
            document.getElementById("emoji_of_emotion").innerHTML = "&#128522;";
        }
        if(result[0].label == "Angry")
        {
            document.getElementById("emoji_of_emotion").innerHTML = "&#128545;";
        }
        if(result[0].label == "cry")
        {
            document.getElementById("emoji_of_emotion").innerHTML = "&#128546;";
        }
        if(result[0].label == "Sad")
        {
            document.getElementById("emoji_of_emotion").innerHTML = "&#128532;";
        }
        if(result[0].label == "Sad-angry")
        {
            document.getElementById("emoji_of_emotion").innerHTML = "&#128548;";
        }
        if(result[1].label == "Laughing")
        {
            document.getElementById("emoji_of_emotion2").innerHTML = "&#128512;";
        }
        if(result[1].label == "Happy")
        {
            document.getElementById("emoji_of_emotion2").innerHTML = "&#128522;";
        }
        if(result[1].label == "Angry")
        {
            document.getElementById("emoji_of_emotion2").innerHTML = "&#128545;";
        }
        if(result[1].label == "cry")
        {
            document.getElementById("emoji_of_emotion2").innerHTML = "&#128546;";
        }
        if(result[1].label == "Sad")
        {
            document.getElementById("emoji_of_emotion2").innerHTML = "&#128532;";
        }
        if(result[1].label == "Sad-angry")
        {
            document.getElementById("emoji_of_emotion2").innerHTML = "&#128548;";
        }
    }
}