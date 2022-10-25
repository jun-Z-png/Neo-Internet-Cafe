let myVideo;
let myX;
let myY;
let myFriends = {};
let liveMediaConnection;
let Positionarray=[];
let pg;
let t=0;
let t1=5;
let drink=0;
var sound1;
var sound2;
var sound3;
let messageList=[];


function preload(){
  teleport=loadSound("teleport.wav")
  mls=loadImage("mls.png")
  slogan=loadImage("slogan.png")
  sound1=loadSound("suspense.wav")
  sound2=loadSound("human.wav")
  sound3=loadSound("happy.wav")
  frame=loadImage("frame.png")
  myFont=loadFont("techover.ttf");
  times=loadFont("times.ttf")
  comp=loadModel("comp.obj")
  title=loadImage("title.png")
  sentence=loadJSON("sentence.json")
  }
function setup() {
  shuangxi=loadImage("shuangxi.png")
  liqun=loadImage("liqun.png")
  wangguan=loadImage("wangguan.png")
  computer=loadImage("computer.png");
  cola=loadImage("cola.png");
  fanta=loadImage("fanta.png");
  coffee=loadImage("coffee.png");
  bg=loadImage("bg6.jpg");
  myFont=loadFont("techover.ttf");
  createCanvas(800, 600, WEBGL);
  pg = createGraphics(100, 100);
  counter=createGraphics(200,30);
  liveMediaConnection = new p5LiveMedia(this, "DATA", null, "myInternet Cafe");
  liveMediaConnection.on("data", gotData);
  liveMediaConnection.on("stream", gotStream);
  liveMediaConnection.on("disconnect",gotDisconnection);
    let constraints = { video: true, audio: true };
  myVideo = createCapture(constraints, gotLocalMediaStream);
   myVideo.elt.muted = true;
  myVideo.muted = true;
  myVideo.hide();
  myX=int(random(1,4));
  myY=int(random(1,4));
  order=createElement("h1","Where would you like to be seated?")
  order.style('color','#ffce55');  order.position(20,490);
  order.style('fontSize', "15px")
  input1 = createInput();
 input1.position(20, 520);
    regi=createElement("h1","Please register your name.")
  regi.style('color','#ffce55');  regi.position(20,540);
  regi.style('fontSize', "15px")
  input2 = createInput();
 input2.position(20, 570);
  time=createElement("h1","How long do you plan to stay?")
  time.style('color','#ffce55');  time.position(20,590);
  time.style('fontSize', "15px")
  input3 = createInput();
 input3.position(20, 620);
  for(let i=0;i<7;i++){
Positionarray[i]=-390+115*i}
  button = createButton('Sound 1 ');
  button.position(640, 90);
  button.style("background-color","#ffce55");
  button.style("font-size","15px")
  button.mousePressed(changeBG);
  button2 = createButton('Sound 2 ');
  button2.position(640, 130);
  button2.style("background-color","#ffce55");
  button2.style("font-size","15px")
  button2.mousePressed(changeBG2);
  button3 = createButton('Sound 3 ');
  button3.position(640, 170);
  button3.style("background-color","#ffce55");
  button3.style("font-size","15px")
  button3.mousePressed(changeBG3);
  button4 = createButton('Quiet ');
  button4.position(640, 210);
  button4.style("background-color","#ffce55");
  button4.style("font-size","15px")
  button4.mousePressed(changeBG4);
  
  slider = createSlider(0, 1, 0,0.1);
  slider.position(700, 165);
  slider.style("backdround-color", "white")
  slider.style("transform", "rotate(-90deg)")
   slider.style('width', '100px');
}
function changeBG(){
  
  sound1.play();
  sound1.loop();
  sound2.stop();
sound3.stop();
}
function changeBG2(){
  sound2.setVolume(0.7)
  sound2.play();
  sound2.loop();
  sound1.stop();
  sound3.stop();
}
function changeBG3(){
  sound3.setVolume(0.7)
  sound3.play();
  sound3.loop();
  sound1.stop();
  sound2.stop();
  
}
function changeBG4(){
  sound1.stop();
  sound2.stop();
  sound3.stop();
}
function gotDisconnection(id){
  console.log('Disconnect:',id);
  delete myFriends[id];
}

function gotLocalMediaStream(stream,id) {
  console.log("got local stream!");
  liveMediaConnection.addStream(stream, "CAPTURE");

  // adding a new key to the myFriends object
   // let newFriend = {
    //stream: myVideo,
   // x: 0,
  //  y: 0,
//index:0,
//  };
  
}

function gotData(data, id) {
  let dataToUse = JSON.parse(data);
  console.log("Got data:", id);
  // update the friend array with new mouse position
  if (myFriends[id]) {
    myFriends[id].index= dataToUse.index;
    myFriends[id].name=dataToUse.name;
    myFriends[id].order=dataToUse.order;
    myFriends[id].messageLish.push(dataToUse.message)
  }
  
}

// We got a new stream!
function gotStream(stream, id) {
  console.log("got remote stream from id: ", id);
  stream.hide();
   //This is just like a video/stream from createCapture(VIDEO)
  // adding a new key to the myFriends object
   let newFriend = {
    stream: stream,
    x: 0,
    y: 0,
    index: seat1,
     name:name,
  };
  // adding a new key to the myFriends object
  myFriends[id]=new Friends(stream,id);

}
let rate;

let resp1;
let resp2;
let seat1=0;
let name="";
let resp3;
function keyPressed(){
  if (keyCode == RETURN || keyCode == ENTER) {
    if (resp1) { 
      resp1.remove(); 
    }
    if (resp2) { 
      resp2.remove(); 
    }
    if (resp3) { 
      resp3.remove(); 
    }
    if(input1.value()!=""){
 const seat = input1.value();
    seat1= input1.value();
    resp1 = createP("Ok!");
    resp1.position(180,510);
    resp1.style('color','#ffce55');
    input1.value("");
  
    let dataToSend = {
    index:seat1,
 };
  liveMediaConnection.send(JSON.stringify(dataToSend));
   console.log("go to seat "+ seat1);}
    if(input2.value()!=""){
      name=input2.value();
      resp2=createP("Welcome!")
      resp2.position(180,560);
      resp2.style('color','#ffce55');
    input2.value("");
    }
     if(input3.value()!=""){
       rate=5;
      resp3=createP(input3.value()*rate+" yuan")
      resp3.position(180,610);
      resp3.style('color','#ffce55');
    input3.value("");
       //text("")
      
    }
}}
function sharePosition1(){
  if (liveMediaConnection){
    let dataToSend = {
index:seat1,
      name:name,
      order:order1,
      
    }
    liveMediaConnection.send(JSON.stringify(dataToSend));
  }}

let angle=0;
var speak=0;

function draw() {
    //orbitControl();
  sound1.setVolume(slider.value())
  sound2.setVolume(slider.value())
  sound3.setVolume(slider.value())
  background(0,0,220);
  
  push()
  
  
  scale(0.2)
  image(slogan,-2000,-1500)
  pop()
  push()
  scale(0.3)
  image(frame,395,280)

  pop()
  push()
  counter.background(0,0,220)
  counter.textFont(myFont);
  counter.textSize(30)
  counter.fill(255)
  counter.text("counter",55,22);
  pop()
  if(frameCount%100==0){
    
    speak=int(random(0,9))}
  push();
  textSize(25)
text(sentence.sentence[speak],-160,100);
    console.log("say"+sentence.sentence[speak])
    pop();

  push();
  translate(0,150,0);
  //noStroke()
  //rotate(PI/2);
  texture(counter);
  //ormalMaterial();
  box(200,30,30);
  translate(5,70)
  texture(wangguan)
  box(60,45);
  pop();
  text("Wangguan (Manager)",-60,280)
  push();
 push();
  strokeWeight(0);
  texture(bg);
  angle+=0.01;
  rotateX(angle);
  rotateZ(angle);
  sphere(500)
  pop();
  
  //background(bg);
  for(i=0;i<6;i++){
    push();
    translate(-285+128*i,-70,0);
    //texture(computer);
    //box(90, 70);
    scale(20)
    rotateX(-0.05)
    rotateZ(3.13)
    rotateY(-1.6)
    normalMaterial();
    model(comp)
    //normalMaterial();
    pop();
    push();
    translate(-285+128*i,-75,0)
    texture(computer)
    box(40,35)
    pop();
    textSize(20)
    text("Empty "+(i+1),-320+120*i,-10,0)
}
    push();
    rotate(PI/2)

   tint(t)
  t+=t1;
  if(t>=255||t<=0){
    t1=-t1;
  }  
  image(title,-300,-200, 200,400)
 
  pop();
     textSize(45);
  stroke(0);
  strokeWeight(2);
  fill(255);
  textFont(myFont);
  text("Internet Cafe", -130,-200);
  textSize(20);
  text(hour()+":"+minute()+':'+second(),-30,-160)

   myVideo.loadPixels();
  var stepSize = 15;
for (var x = 0; x < myVideo.width; x += stepSize) {
  for (var y = 0; y < myVideo.height; y += stepSize) {
    var index = ((y*myVideo.width) + x) * 4;
    // The code for your filter will go here!
    var redVal = myVideo.pixels[index];
    var greenVal = myVideo.pixels[index + 1];
    var blueVal = myVideo.pixels[index + 2];
    // you can add or remove the stroke
    //pg.strokeWeight(1);
    //stroke(255,0,255,255);
    pg.noStroke();
    // you can change the colors
    pg.fill(redVal, greenVal*1.4, blueVal);
    // you can change the shape of the 'pixels'
    pg.rectMode(CENTER);
    pg.rect(x/(myVideo.width/pg.width), y/(myVideo.height/pg.height), stepSize, stepSize);
    //circle(x, y, stepSize, stepSize);
  }}
  if(myVideo!=null){
    push();
    translate(Positionarray[seat1],0,0);
  console.log("my index is "+ seat1);
  texture(pg);
  box(70,55);
  
    pop();
  }
     textSize(20)
    text(name,-320+120*(seat1-1),50);
  push();
    if(order1==1){ 
      
      textFont(times);
      text("Fanta",235,115)
      image(fanta,-285+120*(seat1-1),30, 45,45)
    }
  if(order1==2){
    
    textFont(times);
    text("Coffee",235,115)
    image(coffee,-285+120*(seat1-1),30, 45,45)
  }
  if(order1==3){
    textFont(times);
    text("Coke",235,115)
    image(cola,-285+120*(seat1-1),30, 45,45)
  }
  if(order1==4){
    textFont(times);
    text("LiQun Cigarette",205,115)
    image(liqun,-285+120*(seat1-1),30, 45,45)
  }
  if(order1==5){
    textFont(times);
    text("ShuangXi Cigarette",185,115)
    image(shuangxi,-285+120*(seat1-1),30, 45,45)}
 
    if(order1==6){
      textFont(times);
      text("Melted Milk Balls",195,115)
      image(mls,-285+120*(seat1-1),30, 45,45)
    
  }
  pop()
  let num=1;
  for (let id in myFriends) {
    myFriends[id].update();
    myFriends[id].openCom();
    textSize(20);
    text("Online: "+(num+1), 100, -160);
 
}
    if (frameCount % 10 === 0){
    sharePosition1();
  }
  push()
  fill('#ffce55')
  rect(338,-260,25,120)
  pop()
}

let order1=0;
let dataToSend2;
function mousePressed(){
  
  console.log(mouseX,mouseY);
  if(445<mouseY&&mouseY<495){
  if(556<mouseX&&mouseX<605){
    teleport.play()
    teleport.setVolume(0.5)
    order1=1;
  }
  if(635<mouseX&&mouseX<684){
    teleport.play()
    teleport.setVolume(0.5)
    order1=2;
  }
    if(710<mouseX&&mouseX<760){
 
      teleport.play()
      teleport.setVolume(0.5)
      order1=3;
    }
  }
  if(518<mouseY&&mouseY<572){
    if(558<mouseX&&mouseX<607){
      teleport.play()
      teleport.setVolume(0.5)
      order1=4;
    }
    if(635<mouseX&&mouseX<685){
      teleport.play()
      teleport.setVolume(0.5)
      order1=5;
    }
    if(710<mouseX&&mouseX<760){
      teleport.play()
      teleport.setVolume(0.5)
      order1=6
    }
      
  }
   console.log("order is "+ order1)
}

class Friends{
    constructor(stream,id) {
    this.x = 0;
    this.y = 0;
      this.index=0;
    this.stream=stream;
      this.id=id;
      this.name="";
      this.order=0;
      this.stream.elt.volume = 0;
      this.messageList=[];
  }
  update(){
     let distanceSquared = (this.x - mouseX)* (this.x - mouseX) + (this.y-mouseY) * (this.y-mouseY);
      
    // console.log('distance:',distanceSquared);
    
    let volume = min(1, 25000 / distanceSquared);
    
    this.stream.elt.volume = volume;
    // console.log(volume);
  }

  openCom(){
    this.pg=createGraphics(100,100)
    this.stream.loadPixels();
    var stepSize = 15;
for (var x = 0; x < this.stream.width; x += stepSize) {
  for (var y = 0; y < this.stream.height; y += stepSize) {
    var index = ((y*this.stream.width) + x) * 4;
    // The code for your filter will go here!
    var redVal = this.stream.pixels[index];
    var greenVal = this.stream.pixels[index + 1];
    var blueVal = this.stream.pixels[index + 2];
    // you can add or remove the stroke
    //pg.strokeWeight(1);
    //stroke(255,0,255,255);
    this.pg.noStroke();
    // you can change the colors
    this.pg.fill(redVal, greenVal*1.2, blueVal);
    // you can change the shape of the 'pixels'
    this.pg.rectMode(CENTER);
    this.pg.rect(x/(this.stream.width/pg.width), y/(this.stream.height/pg.height), stepSize, stepSize);
    //circle(x, y, stepSize, stepSize);
  }}
    push();
    translate(Positionarray[this.index],0,0);
    console.log("index is "+ this.index);
  texture(this.pg);
  box(70,55);
    pop();
    textSize(20)
    text(this.name,-320+120*(this.index-1),50);
    if(this.order==1){
      image(fanta,-290+120*(this.index-1),30, 45,45)
    }
  if(this.order==2){
    image(coffee,-290+120*(this.index-1),30, 45,45)
  }
  if(this.order==3){
    image(cola,-290+120*(this.index-1),30, 45,45)
  }
  if(this.order==4){
    image(liqun,-290+120*(this.index-1),30, 45,45)
  }
  if(this.order==5){
    image(shuangxi,-290+120*(this.index-1),30, 45,45)
  }
    if(this.order==6){
      image(mls,-290+120*(this.index-1),30, 45,45)
    }
  }
}
