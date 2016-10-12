/*全局变量*/
var canvasWidth = 480; //画布的宽
var canvasHeight = 650;	 //
var canvas=document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');
var offsetX=null;
var offsetY=null;
//所有图片
var imgBackground;
var imgBullet1;
//小号敌机
var imgsEnemy1=[]; 
 //中号敌机
var imgsEnemy2=[];
//大号敌机
var imgsEnemy3=[]; 

var imgsGameLoading=[];

var imgGamePauseNor;

var imgsHero=[];

var imgStart;

const PHASE_DOWNLOAD = 1;
const PHASE_READY = 2;
const PHASE_LOADING = 3;
const PHASE_PLAY = 4;
const PHASE_PAUSE = 5;
const PHASE_GAMEOVER = 6;

var curPhase = PHASE_DOWNLOAD; //当前状态
download();

//下载图片
function download(){
	var progress = 0;

	function drawProgress(){
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		var txt=progress+'%';
		var w=ctx.measureText(txt).width;
		ctx.font='35px  Helvetica';
		ctx.fillStyle='#fff'
		ctx.fillText(txt,canvasWidth/2-w/2,canvasHeight/2+80/2);
		
		ctx.strokeStyle='black';
		ctx.strokeText(txt ,canvasWidth/2-w/2,canvasHeight/2+80/2);
		ctx.beginPath();
		ctx.strokeStyle='#fff';
	
		ctx.arc(240, 355, 60,0,progress*3.6*Math.PI/180);
		ctx.stroke();
		if(progress==100){
			startGame();
		}
		
	}
	//1
	imgBackground = new Image();
	imgBackground.src='img/background.png';
	imgBackground.onload = function(){
		progress+=4;
		drawProgress();
	}
	//2
	imgBullet1 = new Image();
	imgBullet1.src='img/bullet1.png';
	imgBullet1.onload = function(){
		progress+=3;
		drawProgress();
	}
	//3
	imgsEnemy1[0] = new Image();
	imgsEnemy1[0].src='img/enemy1.png';
	imgsEnemy1[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	//4
	imgsEnemy1[1] = new Image();
	imgsEnemy1[1].src='img/enemy1_down1.png';
	imgsEnemy1[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	//5
	imgsEnemy1[2] = new Image();
	imgsEnemy1[2].src='img/enemy1_down2.png';
	imgsEnemy1[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	//6
	imgsEnemy1[3] = new Image();
	imgsEnemy1[3].src='img/enemy1_down3.png';
	imgsEnemy1[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	//7
	imgsEnemy1[4] = new Image();
	imgsEnemy1[4].src='img/enemy1_down4.png';
	imgsEnemy1[4].onload = function(){
		progress+=3;
		drawProgress();
	}
	//8
	imgsEnemy2[0] = new Image();
	imgsEnemy2[0].src='img/enemy2.png';
	imgsEnemy2[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	//9
	imgsEnemy2[1] = new Image();
	imgsEnemy2[1].src='img/enemy2_down1.png';
	imgsEnemy2[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	//10
	imgsEnemy2[2] = new Image();
	imgsEnemy2[2].src='img/enemy2_down2.png';
	imgsEnemy2[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	//11
	imgsEnemy2[3] = new Image();
	imgsEnemy2[3].src='img/enemy2_down3.png';
	imgsEnemy2[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	//12
	imgsEnemy2[4] = new Image();
	imgsEnemy2[4].src='img/enemy2_down4.png';
	imgsEnemy2[4].onload = function(){
		progress+=3;
		drawProgress();
	}
	//13
	imgsEnemy3[0] = new Image();
	imgsEnemy3[0].src='img/enemy3_n1.png';
	imgsEnemy3[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	//14
	imgsEnemy3[1] = new Image();
	imgsEnemy3[1].src='img/enemy3_n2.png';
	imgsEnemy3[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	//15
	imgsEnemy3[2] = new Image();
	imgsEnemy3[2].src='img/enemy3_hit.png';
	imgsEnemy3[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	//16
	imgsEnemy3[3] = new Image();
	imgsEnemy3[3].src='img/enemy3_down1.png';
	imgsEnemy3[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	//17
	imgsEnemy3[4] = new Image();
	imgsEnemy3[4].src='img/enemy3_down2.png';
	imgsEnemy3[4].onload = function(){
		progress+=3;
		drawProgress();
	}
	//18
	imgsEnemy3[5] = new Image();
	imgsEnemy3[5].src='img/enemy3_down3.png';
	imgsEnemy3[5].onload = function(){
		progress+=3;
		drawProgress();
	}
	//19
	imgsEnemy3[6] = new Image();
	imgsEnemy3[6].src='img/enemy3_down4.png';
	imgsEnemy3[6].onload = function(){
		progress+=3;
		drawProgress();
	}
	//20
	imgsEnemy3[7] = new Image();
	imgsEnemy3[7].src='img/enemy3_down5.png';
	imgsEnemy3[7].onload = function(){
		progress+=3;
		drawProgress();
	}
	//21
	imgsEnemy3[8] = new Image();
	imgsEnemy3[8].src='img/enemy3_down6.png';
	imgsEnemy3[8].onload = function(){
		progress+=3;
		drawProgress();
	}
	
	
	//22
	imgsGameLoading[0] = new Image();
	imgsGameLoading[0].src='img/game_loading1.png';
	imgsGameLoading[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	//23
	imgsGameLoading[1] = new Image();
	imgsGameLoading[1].src='img/game_loading2.png';
	imgsGameLoading[1].onload = function(){
		progress+=3;
		drawProgress();
	}
	//24
	imgsGameLoading[2] = new Image();
	imgsGameLoading[2].src='img/game_loading3.png';
	imgsGameLoading[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	//25
	imgsGameLoading[3] = new Image();
	imgsGameLoading[3].src='img/game_loading4.png';
	imgsGameLoading[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	//26
	imgsHero[0] = new Image();
	imgsHero[0].src='img/hero1.png';
	imgsHero[0].onload = function(){
		progress+=3;
		drawProgress();
	}
	//27
	imgsHero[1]  = new Image();
	imgsHero[1] .src='img/hero2.png';
	imgsHero[1] .onload = function(){
		progress+=3;
		drawProgress();
	}
	//28
	imgsHero[2] = new Image();
	imgsHero[2].src='img/hero_blowup_n1.png';
	imgsHero[2].onload = function(){
		progress+=3;
		drawProgress();
	}
	//29
	imgsHero[3] = new Image();
	imgsHero[3].src='img/hero_blowup_n2.png';
	imgsHero[3].onload = function(){
		progress+=3;
		drawProgress();
	}
	//30
	imgsHero[4] = new Image();
	imgsHero[4].src='img/hero_blowup_n3.png';
	imgsHero[4].onload = function(){
		progress+=3;
		drawProgress();
	}
	//31
	imgHeroBlowupN4 = new Image();
	imgHeroBlowupN4.src='img/hero_blowup_n4.png';
	imgHeroBlowupN4.onload = function(){
		progress+=3;
		drawProgress();
	}
	
	//32
	imgStart = new Image();
	imgStart.src='img/start.png';
	imgStart.onload = function(){
		progress+=3;
		drawProgress();
	}
	//33
	imgGamePauseNor = new Image();
	imgGamePauseNor.src='img/game_pause_nor.png';
	imgGamePauseNor.onload = function(){
		progress+=3;
		drawProgress();
	}
};
//第二步..............
var sky;
var logo;
function startGame(){
	curPhase=PHASE_READY;//状态
	sky=new Sky(imgBackground);
	logo=new Logo(imgStart);
	startEngine();//游戏主引擎--定时器
	canvas.onclick=function(){
		if(curPhase==PHASE_READY){
			curPhase=PHASE_LOADING;
			 loading=new Loading(imgsGameLoading);
		}
	}

}
function Sky(img){//背景图片构造函数.........
	this.x1=0;
	this.y1=0;
	this.x2=0;
	this.y2=-img.height;
	this.draw=function(){
		ctx.drawImage(img,this.x1,this.y1);
		ctx.drawImage(img,this.x2,this.y2);
	}
	this.move=function(){
		this.y1++;
		this.y2++;
		if(this.y1>=canvas.height){
			this.y1=this.y2-img.height;
		}
		if(this.y2>=canvas.height){
			this.y2=this.y1-img.height;
		}
	}
}


function startEngine(){//游戏主引擎--定时器

	setInterval(function(){
		sky.draw();
		sky.move();
		switch(curPhase){
			case PHASE_READY:
				logo.draw();
				break;
			case PHASE_LOADING:
				loading.draw();
				loading.move();
				
				break;
			case PHASE_PLAY:
				hero.draw();
				hero.move();
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();
				break;
			case PHASE_PAUSE:
				break;
			case PHASE_GAMEOVER:
				break;

		}
	},40)//每一秒25次
}

function Logo(img){
	this.x=canvasWidth/2-img.width/2;
	this.y=0;
	this.draw=function(){
		ctx.drawImage(img,this.x,this.y);
	}
}

//第三步.............
var loading=null
function Loading(imgs){
	this.x = 0;
	this.y = canvas.height-imgs[0].height;
	this.index=0;
	this.counter=0;
	this.draw=function(){		
		ctx.drawImage(imgs[this.index],this.x,this.y);		
	}
	this.move=function(){
		this.counter++;
		if(this.counter%6===0){
			this.index++;
			if(this.index>=imgs.length){
				 curPhase=PHASE_PLAY;
				 hero=new Hero(imgsHero);
				 bulletList=new BulletList();
				 enemyList=new EnemyList();
			}
		}
	}
}
//第四步..................
var hero;//
function Hero(imgs){
	this.x=canvas.width/2-imgs[0].width/2;
	this.y=canvas.height-imgs[0].height;
	this.index=0;
	this.counter=0;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
		if(offsetX!=null&&offsetY!=null){
			if(this.x!=offsetX-imgs[0].width/2){
				this.x+=(offsetX-this.x-imgs[0].width/2)*0.6;
				if(this.x<0){
				this.x=0;
				}
				if(this.x>canvas.width-imgs[0].width){
					this.x=canvas.width-imgs[0].width
				}
			}
			 if(this.y!=offsetY){
				this.y+=(offsetY-this.y-imgs[0].height/2)*0.6;
				if(this.y<0){
					this.y=0;
					console.log(imgs[0].height/2)
				}
				if(this.y>canvas.height-imgs[0].height){
					this.y=canvas.height-imgs[0].height
				}
			}
		}
	}
	this.move=function(){
		this.counter++
		if(this.counter%3==0){
			if(this.index==0){
				this.index=1;
			}else if(this.index==1){
				this.index=0;
			}
		}
		if(this.counter%5===0){
			this.fire();
		}
	}
	this.fire=function(){
		var b=new Bullet(imgBullet1);
		bulletList.add(b);
	}
}
canvas.onmousemove=function(e){
	if(curPhase==PHASE_PLAY){	
		offsetX=e.offsetX;
		offsetY=e.offsetY;
	}
}


function Bullet(img){
	this.x=hero.x+(imgsHero[0].width/2-img.width/2);
	this.y=hero.y-img.height;
	this.removable=false;

	this.draw=function(){
		ctx.drawImage(img,this.x,this.y)
	}
	this.move=function(){
		this.y-=30;
		if(this.y<=-img.height){
			this.removable=true;
		}
	}	
}
var bulletList;
function BulletList(){
	this.arr=[];
	this.add=function(bullet){
		this.arr.push(bullet);
	}
	this.draw=function(){
		for(var i in this.arr){
			this.arr[i].draw()//绘制每一个子弹
		}
	}
	this.remove=function(i){
		this.arr.splice(i,1);
	}
	this.move=function(){
		for(var i in this.arr){
			this.arr[i].move();
			if(this.arr[i].removable){
				this.remove(i);
			}
		}
	}
}

//小号敌机
function Enemy1(imgs){
	this.x=Math.random()*(canvas.width-imgs[0].width);
	this.y=-imgs[0].height;
	this.index=0;
	this.speed=10;
	this.removable=false;
	this.blood=1;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.move=function(){	
		this.y+=this.speed;
		if(this.y>=canvas.height){
			this.removable=true;
		}
	}
}

//中号敌机
function Enemy2(imgs){
	this.x=Math.random()*(canvas.width-imgs[0].width);
	this.y=-imgs[0].height;
	this.index=0;
	this.speed=6;
	this.removable=false;
	this.blood=3;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.move=function(){	
		this.y+=this.speed;
		if(this.y>=canvas.height){
			this.removable=true;
		}
	}
}

//大号敌机
function Enemy3(imgs){
	this.x=Math.random()*(canvas.width-imgs[0].width);
	this.y=-imgs[0].height;
	this.index=0;
	this.speed=3;
	this.removable=false;
	this.blood=10;
	this.counter=0;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y)
	}
	this.move=function(){	
		this.counter++
		if(this.counter%2==0){
			if(this.index==0)this.index=1
			else if(this.index==1)this.index=0
		}
		this.y+=this.speed;
		if(this.y>=canvas.height){
			this.removable=true;
		}
	}
}
//敌机列表号敌机
var enemyList;
function EnemyList(){
	this.arr=[];
	this.add=function(enemy){
		this.arr.push(enemy);
	}
	this.remove=function(i){
		this.arr.splice(i,1);
	}
	this.draw=function(){
		for(var i in this.arr){
			this.arr[i].draw();
		}
	}
	this.move=function(){
		this.generate();//生成新的敌机.....
		for(var i in this.arr){
			var e=this.arr[i];
			e.move();
			if(e.removable){
				this.remove(i);
			}
		}
	}
	this.generate=function(){
		var num=Math.floor(Math.random()*100);
		if(num<6){
			this.add(new Enemy1(imgsEnemy1));
		}else if(num<9){
			this.add(new Enemy2(imgsEnemy2));
		}else if(num<12){
			this.add(new Enemy3(imgsEnemy3));
		}
	}
}