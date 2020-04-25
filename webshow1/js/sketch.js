// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies,
//Runner = Matter.Runner,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
Constraint = Matter.Constraint;

// create an engine
var engine,world;
var circles = [];
var mConstraint;

let t = ["😘","😎","😊","😍","😱","🤣","🙄","🤔","😭","😡","🤭","😂","😣","😓","😔"];
let r= [.4,.3,.3,.3,.3,1,1,.3,.2,.2,.2,.9,.7,.5,.9];//调整表情大小？？？？或者数目


function setup () {
	var canvas =createCanvas (windowWidth, 500);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);
	var options = {
		isStatic: true
	}
	ground = Bodies.rectangle( width/2, height, width,2, options);
	groundL = Bodies.rectangle( 0, height/2, 2,height,options);
	groundR = Bodies.rectangle( width, height/2, 2, height,options);
	groundT = Bodies.rectangle( width/2, -500,width,100,options);
	World.add(world, [ground,groundL,groundR,groundT]);
	for(var i = 0 ; i < t.length; i++){
		var radius = map(r[i],0,10,20,70);
		var n = map(windowWidth,10,500,0.2,1.0);
		circles.push(new Circle(random(width),random(-1,-3), radius*n,t[i]));
	}


	var canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = 2; 
	var options = {
		mouse: canvasmouse
	}


	mConstraint = MouseConstraint.create(engine,options);
	World.add(world, mConstraint);
} 



function draw () {
	pixelDensity(2);
	background ('#ffffff');
	var percent = norm(sin(PI/2+frameCount/100), -1, 1);
	var between = lerpColor(color('#a4eeec'),color('#ffffff'), percent);
	fill(between);
	noStroke();
	rect(0,0,width,height);

	fill('#434343');
	noStroke();
	var size = map(windowWidth,375,500,1,3);
	textSize(size*20);
	textAlign(CENTER);
	textSize(size*2.5);//改大小
	// text("HI, I'm Yasai", width/2, height*0.4 );
	// textSize(20);
	// textAlign(LEFT);
	// text("I'm a data visualization designer who is curiosity of data, design and coding. I create elegant and creative vis to tell story. Besides, I have been made ten effective and effient design tools. Have fun：）", width/2-200, height*0.42,size*20,900);

	text("TRENDING!", width/2, height*0.3 );
	textSize(size);
	textAlign(CENTER);
	text("小表情是微博里面用的最多的东西", width/2, height*0.4);
	text("它们简简单单，但藏在手机另一头的发送者的情绪却很复杂", width/2, height*0.48);
	text("通过爬取小表情，并将小表情科学的分类到对应的情绪种类，分析它们出现的数量与占比", width/2, height*0.56);
	text("是否比起单纯的文本情感分析，更有意思？", width/2, height*0.64);

	for(var i = 0; i < t.length; i++){ 
		circles[i].show();
	}   

}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight-100);
}