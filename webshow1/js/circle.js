function Circle( x, y, r,t){
 var options = {
  friction: 0.1,
  restitution: 3,
  isStatic: true
}

this.body = Bodies.circle(x,y,r);
this.r = r;
World.add(world, this.body);

this.show = function(){
  var pos = this.body.position;
  var angle = this.body.angle;

  push();
  translate(pos.x, pos.y);

  rotate(angle);

  if(windowWidth>450){
    strokeWeight(2.5);
  }else{
    strokeWeight(1.5);
  }

  fill('#2e75af');

  noStroke();
  //画表情就行！

  ellipse(0,0,this.r*2-2);

  stroke(255,100);
  strokeWeight(3);
  noFill();
  arc(0, 0, this.r*2*0.85, this.r*2*0.85, -PI/2+PI, -PI/4+PI);
  arc(0, 0, this.r*2*0.85, this.r*2*0.85, -PI/5+PI, -PI/7+PI);
  fill(250);
  noStroke();
  textSize(this.r);
  textAlign(CENTER);
  text(t,0,0);
  pop();

}
}