var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level = 0;
var soundCheck = true;

$(".toggle-sound").hide();

$(document).on('click', '.toggle-sound', function(e) {
    $(this).toggleClass('sound-mute');
    soundCheck = !soundCheck;
  });

$(document).keypress(function (event) {
    console.log(event.key);
    if(level==0) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
        $(".toggle-sound").fadeIn();
    }

    else{
        switch(event.key) {
            case "a":
                var userChosenColour ="green";
                userClickedPattern.push(userChosenColour);

                if(soundCheck) playSound("green");
                    
                animatePress("green");
                console.log(level);
                checkAnswer(userClickedPattern.length-1);
                break;

            case "s":
                var userChosenColour ="red";
                userClickedPattern.push(userChosenColour);
                if(soundCheck) playSound("red");
                    
                animatePress("red");
                console.log(level);
                checkAnswer(userClickedPattern.length-1);
                break;

            case "n":
                var userChosenColour ="yellow";
                userClickedPattern.push(userChosenColour);

                if(soundCheck) playSound("yellow");

                animatePress("yellow");
                console.log(level);
                checkAnswer(userClickedPattern.length-1);
                break;

            case "m":
                var userChosenColour ="blue";
                userClickedPattern.push(userChosenColour);

                if(soundCheck)   playSound("blue");

                animatePress("blue");
                console.log(level);
                checkAnswer(userClickedPattern.length-1);
                break; 
                
            default:
                break;
        }
    }
});

$(".btn").click(function(){
    if(level==0) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
        $(".toggle-sound").fadeIn();
    }

    else{
    var userChosenColour =$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    if(soundCheck)   playSound(userChosenColour);

    animatePress(userChosenColour);
    console.log(level);
    if(level>0)
        checkAnswer(userClickedPattern.length-1);

    }
});


function nextSequence()
{
    userClickedPattern = [];
    level++;
    
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    if(soundCheck) playSound(randomChosenColour);

}

function playSound(name){
    var audio =  new Audio("sounds/"+name+".mp3");
    audio.play();
}


function animatePress(color){
    $("."+color).addClass("pressed");
    setTimeout(function(){$("."+color).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){
   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        
        if (userClickedPattern.length === gamePattern.length){
  
    
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        $(".toggle-sound").fadeOut(20);

        if(soundCheck)   playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},300);

        $("h1").text("Game Over. Press any key to Restart");
        startOver();

  
      }
}
 
function startOver(){
    started = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}