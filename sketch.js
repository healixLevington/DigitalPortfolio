//Original design by Matthew Thomasson

var brProb = 0.8;


function setup() {
var canvas =  createCanvas(600, 400);
canvas.parent('header');
	  system = new ParticleSystem(createVector(width/1.5, 140));
}
var system;

function draw() {
 
	var r1 = random(1.0);
	
	background (123,149,150);
	
	if (r1>brProb){
	 system.addParticle();
	}
	
  system.run();
  
	 //name
	strokeWeight(1)
	textSize(30);
	fill(255,0,0);
	text("Matthew",50,200); //shadow
	text("Thomasson",50,225); //shadow
	fill(0,0,0);
	text("Matthew",48,198);
	text("Thomasson",48,223);
	
	//Ground
	noStroke();
	fill(0,150,36);
	rect(0,300,600,100);
	fill(255,255,255);
	rect(0,299,490,4);
	
	//Umbrella
	fill(0,0,0)
	rect(398,85,4,115);
	arc(400,144.5,100,100,PI,0);
	stroke(0);
	strokeWeight(4)
	noFill();
	arc(405,200,10,10,0,3.5);
	
	//Person
	fill(0,0,0);
	noStroke();
	ellipse(375,175,35,35);
	strokeWeight(5);
	stroke(1);
	line(375,175,375,250);
	line(375,250,360,300);
	line(375,250,390,300);
	line(375,200,385,225);
	line(385,225,400,200);
	line(375,200,360,250);


}


// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.015);
  this.velocity = createVector(random(-.4, .4), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 500;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 4, 4);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};