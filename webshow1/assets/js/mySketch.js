//this is a sketch made using a dataset from the pedometer of my phone.

//lines correspond to number of steps recorded.
//line  日关注度的累计  -  表示情绪分布

//bubbles correspond to number of calories burned.
//bubbles 大小->关注度

//alpha value corresponds to the recorded speed.
//   速度 ->

//background circles are used for scale. 
//use slider to choose how many days are displayed. If counter is set to 0 labels about the information are displayed.
//slider 时间累计
let stepData;//variable that will host .json file.
//arrays of jason data.
let steps=[];
let speed=[];
let calories=[];
let distance=[];

//declare a slider for choosing the number of days displayed.
let countSlider;

function preload(){
	/*	this table is a json file that contains data
	extracted by my phone via samsung health
	each object contains data about each day's : estimated walked distance ,
	step count,speed (m/s),calories burned trough walking. for the past 847 days	*/
	stepData=loadJSON("Step_count.json");
}

function setup() {
	createCanvas(windowWidth, screen.availHeight);
	background(240);
	pixelDensity(4);//better resolution :)
	//colorMode(HSB,360,100,100);

	//setup slider to choose how many days are displayed.
	countSlider=createSlider(0,846,1,1);//starting with displaying the first 20 days recorded.
	countSlider.style('width', '400px');
	countSlider.position(width/2-200,90);

	//pass data from json file to arrays
	for(i=0;i<=846;i++){
		steps[i]=stepData[i].count;
		speed[i]=stepData[i].speed;
		calories[i]=stepData[i].calorie;
		distance[i]=stepData[i].distance;
	}
	colorMode(HSB, 255);
}

function draw() {
	background(84.9);
	translate(width/2,height/2);
    scale(0.8);//had to scale it to better fit screen.
	let count=countSlider.value();

	printLabels(count);

	//draw circles to define scale.
	//each distance between lines counts as 5,000 steps.
	for(i=240;i<=870;i+=90){
		noFill();
		strokeWeight(1);
		stroke(150,0,20);
		if (i==690){strokeWeight(2)}
		ellipse(0,0,i,i);
	}
	//visualise data.
	beginShape();
	for(i=1;i<=count;i++){
		//set color alpha value according to speed measured.The darker the color the faster I was walking
		let alpha=map(speed[i],0,max(speed),150,255);//map alpha value between 150 and 255.
		strokeWeight(map(count,0,846,5,1));//decreasing strokeWeight as displayed lines are increased.
		strokeCap(SQUARE);
		stroke(150,0,20,alpha);
		//fill(steps[i]/135%255,255,235,alpha);
		fill(150,0,20,alpha);//柱子颜色

		//draw a line perpendicular to a circle that has the length of the steps done each day.
		let angle=map(i,0,count,0,TWO_PI);//equally spacing lines along the circle.
		let lineLength=map(steps[i],0,max(steps),0,300);
		let radius=120; //radius of the internal cycle.半径
		let x1=radius*cos(angle);
		let y1=radius*sin(angle);
		let x2=(radius+lineLength)*cos(angle);
		let y2=(radius+lineLength)*sin(angle);
		line(x1,y1,x2,y2);

		//draw a circle at the end of the line that its radius is representative
		//of the calories burnt through walking.
		let r=map(calories[i],0,max(calories),0,25/*100*/);//the smaller the circle the smaller the amount of calories burnt.(dah)
		let x=(radius+lineLength+10)*cos(angle); //20px away from the end of the line.
		let y=(radius+lineLength+10)*sin(angle);
		//stroke(150,0,20);
		strokeWeight(1);
		//fill(150,0,20,100);
		ellipse(x,y,r,r);

		//draw a vertex that demonstrates the estimated walked distance.
		//The close to the center means small distance.Range between 2 external circles with a step of 14.000 m.
		let walkedDistance=map(count[i], 0,max(count), 345,435);//波动幅度mapping
		let vx=(walkedDistance)*cos(angle);
		let vy=(walkedDistance)*sin(angle);
		noFill();
		stroke(255,204,0);
		strokeWeight(2);
		curveVertex(vx,vy);	//波动
	}
	endShape(CLOSE);
}


function printLabels(count){
	//lables for number of steps.
	if (count==0){
		noStroke();
		fill(150,0,20);
		for(i=0;i<=7;i++){
		let num= 5000*i+' steps'/*'关注热度'*/;
		text(num,0-textWidth(num)/2,-120-(45*i));
		}
		text(14 +'Km.',390,0);
		text(28 +'Km.',435,0);
		//labe; for calorie burn indication
		text(max(calories)+ ' max calories',435,-435);
		ellipse(420,-440,25,25);
		//speed gradient.
		for (i=150;i<=255;i+=10){
		fill(150,0,20,i);
		rect(415,-550+i,10,10);
		}
		text("7 m/s",435,-550+170);
		text("1 m/s",435,-550+260);
		}
}