//<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//<meta name="author" content="Zhengtong Liu">
//<meta name="netid" content="zl92">
//</meta><meta name="email" content="zl92@rice.edu">
//<meta name="gitid" content="kiraliu7">
//<meta name="hw#" content="Assignment3"></meta>

var canvas = document.getElementById('gameArea');
var c = canvas.getContext('2d');
var gameon=false;
var snake=[];
var xlist=[];
var ylist=[];
var movecount=0;
var score=0;
var end=false;
var interval;
var diff=500;

var bomb = {
  x:0,
  y:0,
  draw: function() {
    while(checkpos(snake,this.x, this.y)||(this.x==bonus.x && this.y==bonus.y)){
      this.x=Math.floor(Math.random() * Math.floor(21))*20;
      this.y=Math.floor(Math.random() * Math.floor(21))*20;
    }
    c.fillStyle = "black";
    c.fillRect(this.x, this.y, 20, 20);
  }
};

var bomb2 = {
  x:400,
  y:0,
  draw: function() {
    while(checkpos(snake,this.x, this.y)||(this.x==bonus.x && this.y==bonus.y)){
      this.x=Math.floor(Math.random() * Math.floor(21))*20;
      this.y=Math.floor(Math.random() * Math.floor(21))*20;
    }
    c.fillStyle = "black";
    c.fillRect(this.x, this.y, 20, 20);
  }
};

var bomb3 = {
  x:0,
  y:400,
  draw: function() {
    while(checkpos(snake,this.x, this.y)||(this.x==bonus.x && this.y==bonus.y)){
      this.x=Math.floor(Math.random() * Math.floor(21))*20;
      this.y=Math.floor(Math.random() * Math.floor(21))*20;
    }
    c.fillStyle = "black";
    c.fillRect(this.x, this.y, 20, 20);
  }
};

var bomb4 = {
  x:400,
  y:400,
  draw: function() {
    while(checkpos(snake,this.x, this.y)||(this.x==bonus.x && this.y==bonus.y)){
      this.x=Math.floor(Math.random() * Math.floor(21))*20;
      this.y=Math.floor(Math.random() * Math.floor(21))*20;
    }
    c.fillStyle = "black";
    c.fillRect(this.x, this.y, 20, 20);
  }
};



 var bonus = {
    x:1,
    y:1,
    draw: function() {
      while(checkpos(snake,this.x, this.y)){
        this.x=Math.floor(Math.random() * Math.floor(21))*20;
        this.y=Math.floor(Math.random() * Math.floor(21))*20;
      }
      c.fillStyle = "red";
      c.fillRect(this.x, this.y, 20, 20);
    }
  };

function checkgame(tail){
  if(checkpos(snake.slice(1), snake[0][0], snake[0][1])){
    endgame("You Lost! Do not eat yourself! Click reset to play again.");
  }
  else if(snake[0][0]==bomb.x && snake[0][1]==bomb.y){
    endgame("You Lost! Do not eat the bomb! Click reset to play again.");
  }
  else if(snake[0][0]==bomb2.x && snake[0][1]==bomb2.y){
    endgame("You Lost! Do not eat the bomb! Click reset to play again.");
  }
  else if(snake[0][0]==bomb3.x && snake[0][1]==bomb3.y){
    endgame("You Lost! Do not eat the bomb! Click reset to play again.");
  }
  else if(snake[0][0]==bomb4.x && snake[0][1]==bomb4.y){
    endgame("You Lost! Do not eat the bomb! Click reset to play again.");
  }
  else if(snake[0][0]>400 || snake[0][0]<0 || snake[0][1]>400 || snake[0][1]<0){
    endgame("You Lost! Do not hit wall! Click reset to play again.");
  }
  if(snake[0][0]==bonus.x && snake[0][1]==bonus.y){
    grow(tail);
  }
  if(score>=100){
    endgame("Wow! You win! Click reset to play again.");
  }
  movecount+=1;
  document.getElementById("move").innerHTML=movecount;
  
}

function grow(tail){
  snake.push(tail);
  score+=1;
  document.getElementById("score").innerHTML=score;
  bomb.x=Math.floor(Math.random() * Math.floor(21))*20;
  bomb.y=Math.floor(Math.random() * Math.floor(21))*20;
  bomb2.x=Math.floor(Math.random() * Math.floor(21))*20;
  bomb2.y=Math.floor(Math.random() * Math.floor(21))*20;
  bomb3.x=Math.floor(Math.random() * Math.floor(21))*20;
  bomb3.y=Math.floor(Math.random() * Math.floor(21))*20;
  bomb4.x=Math.floor(Math.random() * Math.floor(21))*20;
  bomb4.y=Math.floor(Math.random() * Math.floor(21))*20;
}

function endgame(msg){
  gameon=false;
  end=true;
  clearInterval(interval);
  document.getElementById("gamestatus").innerHTML=msg;
  if(score>getHigh()){
    document.getElementById("highscore").innerHTML=score;
    localStorage.setItem('highscore', score);
  } 
  localStorage.setItem('dist', movecount+1+getDist());
  document.getElementById('distance').innerHTML=getDist();
}

function getDist(){
  let dist=localStorage.getItem("dist");
  if(dist==null){
    return 0;
  }
  return parseInt(dist);
}

function getHigh(){
  let high=localStorage.getItem("highscore");
  if(high==null){
    return 0;
  }
  return parseInt(high);
}

function checkpos(snake, x, y){
  for(i=0; i<snake.length; i++){
    if(snake[i][0]==x && snake [i][1]==y){
      return true;
    }
  }
  return false;
}

function drawsnake(){
  for(i=0; i<snake.length; i++){
    c.fillStyle = "blue";
    c.fillRect(snake[i][0], snake[i][1], 20, 20);
  }
}

function setupgame(){
    gameon=false;
    end=false;
    snake=[[200, 200]];
    bonus.x=Math.floor(Math.random() * Math.floor(21))*20;
    bonus.y=Math.floor(Math.random() * Math.floor(21))*20;
    bomb.x=0;
    bomb.y=0;
    bomb2.x=400;
    bomb2.y=0;
    bomb3.x=0;
    bomb3.y=400;
    bomb4.x=400;
    bomb4.y=400;
    c.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    document.getElementById("gamestatus").innerHTML="Click start to play SNAKE GAME. Use buttons to change direction. Collect red blocks and avoid black blocks.";
    movecount=0;
    score=0;
    document.getElementById("score").style.display="none";
    document.getElementById("move").style.display="none";
    document.getElementById('distance').innerHTML=getDist();
    document.getElementById('highscore').innerHTML=getHigh();
}


function startgame(){
  if(!end){
    clearInterval(interval);
    gameon=true;
    document.getElementById("gamestatus").innerHTML="Game is on. Use buttons to change direction. Collect red blocks and avoid black blocks";
    document.getElementById("scoremsg").style.display="unset";
    document.getElementById("movemsg").style.display="unset";
    document.getElementById("score").innerHTML=score;
    document.getElementById("move").innerHTML=movecount;
    document.getElementById("score").style.display="unset";
    document.getElementById("move").style.display="unset";
    bonus.draw();
    bomb.draw();
    bomb2.draw();
    bomb3.draw();
    bomb4.draw();
    drawsnake();
  }
}

function pausegame(){
    gameon=false;
    document.getElementById("gamestatus").innerHTML="Game is paused. Click start to play";
}

function move(temp){
  for(i=snake.length-1; i>0; i--){
    snake[i]=temp[i-1];
  }
}

function changediff(num){
  diff=num;
}

function go(e){
  godirection(e);
  clearInterval(interval);
  interval=setInterval(function(){godirection(e)}, diff);

}

function godirection(e){
  if(gameon){
    let temp=[];
    for (i=0; i<snake.length; i++){
      temp.push([...snake[i]]);
    }
    let tail=[...snake[snake.length-1]];
    c.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    if(e==1){
      move(temp);
      snake[0][1]-=20;
      drawsnake();  
      checkgame(tail);
    }

    else if(e==2){
      move(temp);
      snake[0][1]+=20;
      drawsnake();  
      checkgame(tail);
    }

    else if(e==3){
      move(temp);
      snake[0][0]-=20;
      drawsnake();
      checkgame(tail);
    }

    else if(e==4){
      move(temp);
      snake[0][0]+=20;
      drawsnake(); 
      checkgame(tail);
    }
    //
    bomb.draw();
    bonus.draw();
    bomb2.draw();
    bomb3.draw();
    bomb4.draw();
}

}
