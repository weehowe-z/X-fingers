    var options = { enableGestures: true };
    var flag = true;
    var clockwise = false;
    var controller = Leap.loop(options, function(frame){
    if(frame.hands.length > 0) {
        cardFlip(true, frame.hands[0].type, frame.hands[0].roll());
    }
    else {
        cardFlip(false, "", 0);       // if there are no hands detected, reset the rotations to 0
      }
    if(frame.valid && frame.gestures.length > 0){
      frame.gestures.forEach(function(gesture){
          switch (gesture.type){
            case "circle":

                var circleProgress = gesture.progress;
                var completeCircles = Math.floor(circleProgress);

                var pointableID = gesture.pointableIds[0];
                var direction = frame.pointable(pointableID).direction;

                /*hack* for getting direction failure*/
                if (direction === undefined) direction = [0,0,0];
                /*hack*/

                var dotProduct = Leap.vec3.dot(direction, gesture.normal);//get direction
                if (dotProduct  >  0) {
                  if (clockwise == false) circleProgress = 0;
                  clockwise = true;
                  //console.log("clockwise");
                }
                else if (dotProduct < 0){
                  if (clockwise == true) circleProgress = 0;
                  clockwise = false;
                  //console.log("counterclockwise");
                }

                if (completeCircles % 3 == 0 && completeCircles != 0) {
                  if (flag == true){
                    if (clockwise == true){
                      console.log("fastForward");
                      fastForward();
                    }
                    else {
                      console.log("fastBackward");
                      fastBackward();                      
                    }
                    flag = false;
                  }
                }
                else{
                    flag = true;
                }
                break;
            
            case "screenTap":
                console.log("Screen Tap Gesture");
                playPause();
                break;

            case "swipe":
                //Classify swipe as either horizontal or vertical
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                var duration = gesture.duration;
                var swipeDirection;
                //Classify as right-left or up-down
                if(isHorizontal){
                    if(gesture.direction[0] > 0){
                        if (duration > 5000){
                          swipeDirection = "right";
                          makeNormal();
                        }
                    } else {
                        if (duration > 5000){
                          swipeDirection = "left";
                          makeSmall();
                        }
                    }
                } else { //vertical
                    if(gesture.direction[1] > 0){
                        //console.log(duration);
                        if (duration > 5000){
                          swipeDirection = "up";
                          unmute();
                        }
                    } else {
                        if (duration > 5000){
                          swipeDirection = "down";
                          mute();
                        }
                    }                  
                }
                console.log(swipeDirection);
                break;
            }
          });
      }
    });




    var myVideo=document.getElementById("video");

    function playPause()
    { 
    if (myVideo.paused) 
      myVideo.play(); 
    else 
      myVideo.pause(); 
    } 

    function fastForward()
    {
      myVideo.currentTime += 10;
    }

    function fastBackward()
    {
      myVideo.currentTime -= 10;
    }

    function mute()
    {
      myVideo.muted = true;
    }
    function unmute()
    {
      myVideo.muted = false;
    }

    function makeBig()
    { 
      myVideo.height=1600; 
    } 

    function makeSmall()
    { 
      myVideo.height=320; 
    } 

    function makeNormal()
    { 
      myVideo.height=640; 
    } 


    function transformCSS (className, degree) {
      var style = {
        "-webkit-transform": "rotateY("+degree+"deg)",
        "-moz-transform": "rotateY("+degree+"deg)",
        "transform": "rotateY("+degree+"deg)"
      }
      $(className).css(style);

      return style;
    }


    function cardFlip(hasHand, handType, rollRadian) {
      var degree = rollRadian * (180 / Math.PI);

      if(hasHand) {
          transformCSS(".front", 0-degree);     // front card should roll from 0 to 180

        if(handType === "left")           // hand roll is from 0 to 180deg
          transformCSS(".back", -degree-180);   // back card should roll from -180 to 0
        else                    // hand roll is from 0 to -180deg
          transformCSS(".back", -180-degree);   // back card should roll from -180 to 0
      }
      else {
        transformCSS(".front", 0);
        transformCSS(".back", -180);
      }
    }


