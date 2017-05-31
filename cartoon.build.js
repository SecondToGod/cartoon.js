function draw(cxt,lineWidth,linejoin,borderColor,fillColor){
    cxt.strokeStyle = borderColor || '';
    cxt.lineWidth = lineWidth || 1;
    cxt.linejoin = linejoin || 'round'; 
    cxt.fillStyle = fillColor || "";
    cxt.fill();
    cxt.stroke();
}//两点连线
function drawLine(mycanvas,x1,y1,x2,y2){
    var cxt = mycanvas.getContext('2d');
    cxt.moveTo(x1,y1);
    cxt.lineTo(x2,y2);
    draw(cxt,0.5,'round','#ccc');
}
//连线动画
function linkTo(mycanvas,x1,y1,x2,y2,speed){
    var ctx = mycanvas.getContext('2d');
        ctx.beginPath(); 
        ctx.moveTo(x1,y1);
    var k = (y2-y1)/(x2-x1);    
    var tick = setInterval(function(){
        if(k>0){
            if(x1 < x2){
                ctx.lineTo(x1+=speed,y1+=k*speed);
            }else{
                ctx.lineTo(x1-=speed,y1-=k*speed);
            }
        }else{
            if(x1 < x2){
                ctx.lineTo(x1+=speed,y1+=k*speed);
            }else{
                ctx.lineTo(x1-=speed,y1-=k*speed);
            }
        }
        ctx.stroke();
        if(x1 === x2 && y1 === y2){
            clearInterval(tick);
        }         
    },50);
}//随机颜色
function randomColor(){
   var R = Math.floor(Math.random()*255),
       G = Math.floor(Math.random()*255),
       B = Math.floor(Math.random()*255);
    return 'rgb('+R+','+G+','+B+')';   
}
//画矩形
function drawRect(mycanvas,x,y,width,height){
    var cxt = mycanvas.getContext('2d');
    cxt.beginPath();
    cxt.rect(x,y,width,height);
    draw(cxt,8,'round','light-blue','orange');
}
function drawRect2(mycanvas,x,y,width,height,lineWidth,linejoin,borderColor,fillColor){
    var cxt = mycanvas.getContext('2d');
    cxt.beginPath();
    cxt.strokeStyle = borderColor || '#eee';
    cxt.lineWidth = lineWidth || 1;
    cxt.lineJoin = linejoin || 'round';
    cxt.fillStyle = fillColor || "#000";
    cxt.strokeRect(x,y,width,height);
    cxt.fillRect(x,y,width,height);
}
//五角星路径
function drawStar(mycanvas,x,y,r,R,rot){
    var cxt = mycanvas.getContext('2d');
    var rot = rot || 0;
    cxt.beginPath();
    for(var i=0;i<5;++i){
        cxt.lineTo(x+Math.cos((18+rot+72*i)/180*Math.PI)*R,y-Math.sin((18+rot+72*i)/180*Math.PI)*R);
        cxt.lineTo(x+Math.cos((54+rot+72*i)/180*Math.PI)*r,y-Math.sin((54+rot+72*i)/180*Math.PI)*r);
    }
    cxt.closePath();
    draw(cxt,4,'round','#03b','orange');
}
function getNewmycanvas(){
    var backmycanvas = document.createElement('mycanvas');
    backmycanvas.width = 50;
    backmycanvas.height = 50;
    var bcxt = backmycanvas.getContext('2d');
    drawStar(bcxt,25,25,10,20,3);
    return backmycanvas;
}
//圆角矩形
function roundRectPath(cxt,width,height,radius){	
    var tempH = height - 2*radius;
    var tempW = width - 2*radius;
    cxt.arc(tempW,tempH,radius,0,Math.PI*0.5);
    cxt.lineTo(0,tempH+radius);
    cxt.arc(0,tempH,radius,0.5*Math.PI,Math.PI);
    cxt.lineTo(-radius,0);
    cxt.arc(0,0,radius,Math.PI,Math.PI*3/2);
    cxt.lineTo(tempW,-radius);
    cxt.arc(tempW,0,radius,Math.PI*3/2,Math.PI*2);
    cxt.closePath();
}
function drawRoundRect(mycanvas,x,y,width,height,radius,lineWidth,linejoin,borderColor,fillColor){
    var cxt = mycanvas.getContext('2d');
    if(2*radius > width || 2*radius > height) return;
    cxt.beginPath();
    cxt.translate(x,y);
    roundRectPath(cxt,width,height,radius);
    draw(cxt,lineWidth,linejoin,borderColor,fillColor);
}//弧
function drawArcTo(mycanvas,x0,y0,x1,y1,x2,y2,radius,lineWidth,linejoin,borderColor){
    var cxt = mycanvas.getContext('2d');
    cxt.beginPath();
    cxt.moveTo(x0,y0);
    cxt.arcTo(x1,y1,x2,y2,radius);
    draw(cxt,lineWidth,linejoin,borderColor);
}
function moonPath(cxt,d){//d表示月亮弯曲程度[0,1]
    cxt.beginPath();
    cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
    cxt.arcTo(d,0,0,1,dist(0,-1,d,0)/d);
    cxt.closePath();
}
function moonPath2(cxt,d){//d表示月亮弯曲程度[0,1]
    cxt.beginPath();
    cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
    cxt.quadraticCurveTo(d,0,0,1);
    cxt.closePath();
}
//月亮
function drawMoon(mycanvas,x,y,d,r,rot,lineWidth,linejoin,borderColor,fillColor){
    var cxt = mycanvas.getContext('2d');
    cxt.save();
    cxt.translate(x,y);
    cxt.scale(r,r);
    cxt.rotate(rot*Math.PI/180);
    moonPath2(cxt,d);
    cxt.restore();
    draw(cxt,lineWidth,linejoin,borderColor,fillColor);
}//山坡
function drawLand(mycanvas,lineWidth,linejoin,borderColor,fillColor){
    var cxt = mycanvas.getContext('2d');
    cxt.save();
    cxt.beginPath();
    cxt.moveTo(0,500);
    cxt.bezierCurveTo(230,400,510,580,800,470);
    cxt.lineTo(800,600);
    cxt.lineTo(0,600);
    cxt.closePath();
    cxt.restore();
    var landstyle = cxt.createLinearGradient(0,420,800,600);
    landstyle.addColorStop(0,'#030');
    landstyle.addColorStop(1,'#580');
    draw(cxt,lineWidth,linejoin,borderColor,landstyle);
}
function dist(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
//随机运动小球
function drawRandomBalls(mycanvas,num){
    var cxt = mycanvas.getContext('2d'),
        balls = [],
        mycanvasW = mycanvas.width,
        mycanvasH = mycanvas.height;
    cxt.globalAlpha = 0.6;
    cxt.globalCompositeOperation = 'xor';
    for(var j=0;j<num;j++){
         aBall = {
                radius: Math.random()*2+3,
                x: Math.random()*mycanvasW,
                y: Math.random()*mycanvasH,
                color: randomColor(),
                vx: Math.random()*2+0.5,
                vy: Math.random()*2+0.5
                };
        balls[j] = aBall;
    }
    //mycanvas.addEventListener('click',detect);
    setInterval(function(){
        drawBalls(mycanvas,balls);
        updateObj(mycanvas,balls);
    },45);
}
function updateObj(mycanvas,objArrary){	
    var len = objArrary.length; 
    for(var i=0;i<len;i++){//检测碰撞
        objArrary[i].x += objArrary[i].vx;
        objArrary[i].y += objArrary[i].vy;
        if(objArrary[i].x - objArrary[i].radius<0){
            objArrary[i].vx = -objArrary[i].vx;
            objArrary[i].x = objArrary[i].radius;
        }
        if(objArrary[i].y - objArrary[i].radius<0){
            objArrary[i].vy = -objArrary[i].vy;
            objArrary[i].y = objArrary[i].radius;
        }
        if(objArrary[i].x + objArrary[i].radius>mycanvas.width){
            objArrary[i].vx = -objArrary[i].vx;
            objArrary[i].x = mycanvas.width - objArrary[i].radius;
        }
        if(objArrary[i].y + objArrary[i].radius>mycanvas.height){
            objArrary[i].vy = -objArrary[i].vy;
            objArrary[i].y = mycanvas.height - objArrary[i].radius;
        }
    }
}
function drawBalls(mycanvas,objArrary){
    var len = objArrary.length,
    cxt = mycanvas.getContext('2d');
    cxt.clearRect(0,0,mycanvas.width,mycanvas.height);  
    for(var i=0;i<len;i++){
        drawParticle(mycanvas,objArrary[i].x,objArrary[i].y,objArrary[i].radius,objArrary[i].color);
        for(var k=0;k!=i;k++){
            if(dist(objArrary[k].x,objArrary[k].y,objArrary[i].x,objArrary[i].y)<80){
                drawLine(mycanvas,objArrary[k].x,objArrary[k].y,objArrary[i].x,objArrary[i].y);
            }
        }	
    }   
}
// function detect(mycanvas,event){
// 	var cxt = mycanvas.getContext('2d');
// 	var x = event.clientX - mycanvas.getBoundingClientRect().left;//
// 	var y = event.clientY - mycanvas.getBoundingClientRect().top;//获取点击坐标
// 	if(cxt.isPointInPath(x,y)){//交互
// 		cxt.fill();
// 	}//判断是否在点击区域
// }
//探照灯
function searchLight(mycanvas,light){
    var cxt = mycanvas.getContext('2d'),
    len = light.length;
    mycanvasW = mycanvas.width,
    mycanvasH = mycanvas.height;
    cxt.clearRect(0,0,mycanvasW,mycanvasH);
    cxt.save();
    cxt.beginPath();
    cxt.fillStyle = "black";
    cxt.fillRect(0,0,mycanvasW,mycanvasH);

    for(i=0;i<len;++i){
        cxt.beginPath();
        cxt.arc(light[i].x,light[i].y,light[i].radius,0,Math.PI*2);
        cxt.fillStyle = "#fff";
        cxt.fill();
        cxt.clip();
    }

    cxt.font = "bold 50px Arial";
    cxt.fillStyle = "#058";
    cxt.fillText('hello cartoon.js!',mycanvasW/3,mycanvasW/2);
    cxt.restore();
}
function drawSearchLight(mycanvas,light){
    var tick = setInterval(function(){
        updateObj(mycanvas,light);
        searchLight(mycanvas,light);
    },40);
}
//星空
function drawStarSky(){
    var can,ctx,canW,canH,
    girl = new Image(),
    star = new Image(),
    //定义星星对象
    starObj = function(){
        this.x;
        this.y;
        this.frame;
        this.gap;
    },
    num = 50,
    stars = [],
    gapTime,lastTime;
    starObj.prototype.init = function(){
        this.x = Math.random()*(canW-25);
        this.y = Math.random()*(canH-80);
        this.frame = Math.floor(Math.random()*7);
        this.gap = 0;
    }
    starObj.prototype.anime = function(){
        this.gap += gapTime;
        if(this.gap > 120) {
            this.frame += 1;
            this.frame %= 7;
            this.gap = 0;
        }
    }
    starObj.prototype.drawStar = function(){
        ctx.drawImage(star,this.frame*7,0,7,7,this.x,this.y,7,7);
    }
    function init(){
        can = document.getElementById('mycanvas');
        ctx = can.getContext('2d');
        canW = can.width;
        canH = can.height;
        girl.src = 'src/girl.jpg';
        star.src = 'src/star.png';
        for(var i=0;i<num;i++){
            var obj = new starObj();
            obj.init();
            stars.push(obj);
        }
        lastTime = Date.now();
        frameLoop();
        /*setInterval(function(){
            frameLoop();
        },250);*/
    }
    function frameLoop(){
        window.requestAnimationFrame(frameLoop);
        var now = Date.now();
        gapTime = now - lastTime;//两帧之间的时间
        lastTime = now;
        drawBackgroud();
        drawStars();
    }
    function drawBackgroud(){
        ctx.fillStyle ='black';
        ctx.fillRect(0,0,canW,canH);
    }
    //处理序列帧图片
    function drawObj(obj,sx,sy,sWidth,sHeight,x,y,width,height){
        ctx.drawImage(obj,x,y,width,height);
    }
    function drawStars(){
        for(var i=0;i<num;++i){
            stars[i].anime();
            stars[i].drawStar();	
        }
    }	
    init();
}
function drawRiver(mycanvas,lineWidth,linejoin,borderColor,fillColor){
    var cxt = mycanvas.getContext('2d'),
        mycanvasH = mycanvas.height,
        riverH = mycanvasH;
    cxt.clearRect(0,0,mycanvas.width,mycanvas.height);
    var tick = setInterval(function(){
        riverH -= 10; 
        riverFlowing(mycanvas,riverH,lineWidth,linejoin,borderColor,fillColor);
        if (riverH === -20) clearInterval(tick);
    },50);
}
function riverFlowing(mycanvas,riverH,lineWidth,linejoin,borderColor,fillColor){
    var cxt = mycanvas.getContext('2d'),
    mycanvasW = mycanvas.width,
    mycanvasH = mycanvas.height,
    riverW = parseInt(mycanvasW/3);
    cxt.save();
    cxt.beginPath();
    cxt.moveTo(0,riverH*0.8);
    cxt.bezierCurveTo(mycanvasW+Math.random()*20,riverH-Math.random()*80,mycanvasW*2+Math.random()*20,riverH+Math.random()*200,mycanvasW*3+Math.random()*80,riverH+Math.random()*120);
    cxt.lineTo(mycanvasW,mycanvasH);
    cxt.lineTo(0,mycanvasH);
    cxt.closePath();
    cxt.restore();
    var landstyle = cxt.createLinearGradient(0,riverH,mycanvasW,mycanvasH);
    landstyle.addColorStop(0,'#069');
    landstyle.addColorStop(0.5,'#06c');
    landstyle.addColorStop(1,'#06f');
    draw(cxt,0.5,linejoin,'#007',landstyle);
}
//粒子系统
function drawParticle(ctx,x,y,radius,fillColor){
    var ctx = mycanvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fillStyle = fillColor;
    ctx.fill();
}
function updateParticles(particles,obj,radius,turbulence,life){
    var len = particles.length;
    for(var i=0;i<len;++i){
        var temp = particles[i];
        temp.x += temp.vx;
        temp.y += temp.vy;
        temp.life -= 1;
        temp.radius = (temp.radius>2)?(temp.radius-=0.4):3;
        //加速度
        // temp.vy -= temp.vy*0.1;
        // temp.vx -= temp.vx*0.1;
        if(temp.life === 0 || dist(temp.x,temp.y,obj.x,obj.y)>300){
            particles.splice(i,1);
            particles.push({
                radius: Math.random()*turbulence*0.7 + radius,
                x: (Math.random()*2-1)*obj.radius*1.1 + obj.x,
                y: (Math.random()*2-1)*turbulence + obj.y,
                vx: -obj.vx + Math.random()*turbulence-turbulence/2,
                vy: -obj.vy,
                life:life
            });
        }
    }
}
//数量，粒子半径，颜色，扰动，生命周期
function particleSystem(obj,particles,num,radius,color,turbulence,life){
    for(var j=0;j<num;j++){
        var particle = {
                    radius: Math.random()*turbulence + radius,
                    x: (Math.random()*2-1)*obj.radius*0.6 + obj.x,
                    y: (Math.random()*2-1)*turbulence + obj.y,
                    vx: -obj.vx + Math.random()*turbulence-turbulence/2,
                    vy: -obj.vy,
                    life: life
                };
        particles[j] = particle;
    }
}//运动粒子
function jetParticles(mycanvas,num,radius,color,turbulence,life,obj){
    var ctx = mycanvas.getContext('2d'),
        turbulence = turbulence || '0',
        particles = new Array(num),
        mycanvasW = mycanvas.width,
        mycanvasH = mycanvas.height;
        obj.vx = 5;
        obj.vy = 3;
        objArrary = [obj];
        //ctx.globalCompositeOperation = 'xor';
        particleSystem(obj,particles,num,radius,color,turbulence,life);
    var tock = setInterval(function(){
        ctx.clearRect(0,0,mycanvasW,mycanvasH);
        drawParticle(ctx,obj.x,obj.y,obj.radius,color);
        updateObj(mycanvas,objArrary);
        for(var i=0;i<num;++i){
            drawParticle(ctx,particles[i].x,particles[i].y,particles[i].radius,color);
        }
        updateParticles(particles,obj,radius,turbulence,life);
    },60);
    if(particles.length > num) clearInterval(tock);
}
//粒子轮廓动画
function getImgData(mycanvas,text,size,x,y){
    var ctx = mycanvas.getContext('2d'),
        canW = mycanvas.width,
        canH = mycanvas.height,
        dots = [];
    ctx.beginPath();
    ctx.font = size +'px Arial';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillText(text,x,y);
    var img = ctx.getImageData(0,0,canW,canH);//直接取整个Canvas
    ctx.clearRect(0,0,canW,canH);
    for(var x=0;x<img.height;x+= 8){//每隔3像素取一点
        for(var y=0;y<img.width;y+= 8){//每隔3像素取一点
            var i = (y + x*img.width)*4;//获取每个像素点在img.data数组中的首地址
            var dot = {
                x:0,
                y:0
            };
            if(img.data[i+3]>= 128){//若alpha的值大于128，则选取该点
                dot.x = y;
                dot.y = x;
                dots.push(dot);
            }
        }
    }
    return dots;
}
function img2Pixel(mycanvas,text,size,x,y,radius,speed,color){//文字，大小，位置(x,y),粒子半径,速度，颜色
    var dots = getImgData(mycanvas,text,size,x,y),
        ctx = mycanvas.getContext('2d'),
        len = dots.length,
        canW = mycanvas.width,
        canH = mycanvas.height,
        radius = radius || 1,
        spped = speed || 5,
        _dots = new Array(len),
        kl = new Array(len);
    for(var n=0;n<len;++n){
        _dots[n] = {
            x: Math.round(Math.random()*canW),
            y: 0,
            color: color || randomColor(),
            tx: dots[n].x,//目的地x
            ty: dots[n].y//目的地y
         };
         kl[n] = (_dots[n].ty - _dots[n].y)/(_dots[n].tx - _dots[n].x);
    }
    var start = Date.now();
    var tick = setInterval(function(){   
            ctx.clearRect(0,0,canW,canH);
            var tlen = _dots.length;
            for(var m=0;m<tlen;++m){  
                ctx.beginPath();    
                ctx.arc(_dots[m].x,_dots[m].y,radius,0,Math.PI*2);
                ctx.fillStyle = _dots[m].color ;
                ctx.fill();             
                if(dist(_dots[m].x,_dots[m].y,dots[m].x,dots[m].y)<=speed*0.6){//误差
                               
                }else if(kl[m]>0){
                    _dots[m].x += speed;
                    _dots[m].y += speed*kl[m];
                }else{
                    _dots[m].x -= speed;
                    _dots[m].y -= speed*kl[m];
                }              
            } 
            var now = Date.now(),
            delta = now - start,
            gap =  (canH*40/speed)                 
            if(delta > gap){
                ctx.clearRect(0,0,canW,canH);               
                for(var i=0;i<len;++i){    
                    ctx.beginPath();    
                    ctx.arc(_dots[i].tx,_dots[i].ty,radius,0,Math.PI*2);
                    ctx.fillStyle = _dots[i].color;
                    ctx.fill();
                }
                _dots.splice(0,len);  
                clearInterval(tick);
            }
        },40);       
}
//伪3D旋转
function rotate(mycanvas){
   var initialize = function () {
		var focalLength = 250,
			ballR = 20,
			ballN = 20,
			balls = [],
			vpx = 0,
			vpy = 0,
			angleY = 0;
 
		for (var i=0; i<ballN; i++) {
			var ball = createBall(ballR);
			stage.addChild(ball);
			ball.xpos = Math.random() * 200 - 100;
			ball.ypos = Math.random() * 200 - 100;
			ball.zpos = Math.random() * 200 - 100;
			balls.push(ball);
		}
		vpx = canvas.width/2;
		vpy = canvas.height/2;
 
		stage.addEventListener('mousemove', function (x, y) {
			angleY = (x - vpx) * .001;
		});
		
		function rotateY(ball, angleY) {
			var cosy = Math.cos(angleY),
				siny = Math.sin(angleY),
				x1 = ball.xpos * cosy - ball.zpos * siny,
				z1 = ball.zpos * cosy + ball.xpos * siny;
			ball.xpos = x1;
			ball.zpos = z1;
 
			var scale = focalLength / (focalLength + ball.zpos);
			ball.x = vpx + ball.xpos * scale;
			ball.y = vpy + ball.ypos * scale;
			ball.width = ballR*2*scale;
		}
 
		stage.onRefresh = function () { 
			for (var i=0,ball; ball=balls[i]; i++) { rotateY(ball, angleY) ;}
		}
   }
}
//分形树
