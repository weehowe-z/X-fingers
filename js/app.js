var options = { enableGestures: true };
    var flag = true;
    var clockwise = false;
    var controller = Leap.loop(options, function(frame){
    if(frame.valid && frame.gestures.length > 0){
      frame.gestures.forEach(function(gesture){
          switch (gesture.type){
            case "circle":
            /*
                var circleProgress = gesture.progress;
                var completeCircles = Math.floor(circleProgress);
                console.log(completeCircles);
                console.log(flag);
                if (completeCircles % 3 == 0 && completeCircles != 0) {
                  if (flag == true){
                    console.log("fastForward");
                    flag = false;
                    fastForward();
                  }
                }
                else{
                  flag = true;
                }
            */
                var circleProgress = gesture.progress;
                var completeCircles = Math.floor(circleProgress);

                var pointableID = gesture.pointableIds[0];
                var direction = frame.pointable(pointableID).direction;
                var dotProduct = Leap.vec3.dot(direction, gesture.normal);
                if (dotProduct  >  0) {
                  if (clockwise == false) circleProgress = 0;
                  clockwise = true;
                  console.log("clockwise");
                }
                else{
                  if (clockwise == true) circleProgress = 0;
                  clockwise = false;
                  console.log("counterclockwise");
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
            //case "keyTap":
              //  console.log("Key Tap Gesture");
              //  break;
            
            case "screenTap":
                console.log("Screen Tap Gesture");
                playPause();
                break;

            case "swipe":
                //Classify swipe as either horizontal or vertical
                var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                //Classify as right-left or up-down
                if(isHorizontal){
                    if(gesture.direction[0] > 0){
                        swipeDirection = "right";
                    } else {
                        swipeDirection = "left";
                    }
                } else { //vertical
                    if(gesture.direction[1] > 0){
                        swipeDirection = "up";
                    } else {
                        swipeDirection = "down";
                    }                  
                }
                console.log(swipeDirection)
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