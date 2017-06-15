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
//矩形
function Rect(mycanvas,x,y,width,height){
    var cxt = mycanvas.getContext('2d');
    cxt.beginPath();
    cxt.rect(x,y,width,height);
}
//五角星
function Star(mycanvas,x,y,r,R,rot){
    var cxt = mycanvas.getContext('2d');
    var rot = rot || 0;
    cxt.beginPath();
    for(var i=0;i<5;++i){
        cxt.lineTo(x+Math.cos((18+rot+72*i)/180*Math.PI)*R,y-Math.sin((18+rot+72*i)/180*Math.PI)*R);
        cxt.lineTo(x+Math.cos((54+rot+72*i)/180*Math.PI)*r,y-Math.sin((54+rot+72*i)/180*Math.PI)*r);
    }
    cxt.closePath();
}
//正多边形
function Isogon(mycanvas,x,y,edges,r,rot){//边数,大小
    var cxt = mycanvas.getContext('2d'),
        inner = 360 / edges;
        cxt.beginPath();
    for(var i=0;i<edges;++i){
        cxt.lineTo(x+Math.cos((rot+inner*i)/180*Math.PI)*r,y-Math.sin((rot+inner*i)/180*Math.PI)*r);
    }
    cxt.closePath();
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
function RoundRect(mycanvas,x,y,width,height,radius){
    var cxt = mycanvas.getContext('2d');
    if(2*radius > width || 2*radius > height) return;
    cxt.beginPath();
    cxt.translate(x,y);
    roundRectPath(cxt,width,height,radius);
}//弧
function ArcTo(mycanvas,x0,y0,x1,y1,x2,y2,radius){
    var cxt = mycanvas.getContext('2d');
    cxt.beginPath();
    cxt.moveTo(x0,y0);
    cxt.arcTo(x1,y1,x2,y2,radius);
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
function Moon(mycanvas,x,y,d,r,rot){
    var cxt = mycanvas.getContext('2d');
    cxt.save();
    cxt.translate(x,y);
    cxt.scale(r,r);
    cxt.rotate(rot*Math.PI/180);
    moonPath2(cxt,d);
    cxt.restore();
}//山坡
function Land(mycanvas,lineWidth,linejoin,borderColor,fillColor){
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
function drawRandomBalls(mycanvas,num,flag){
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
        drawBalls(mycanvas,balls,flag);
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
function drawBalls(mycanvas,objArrary,flag){//flag表示是否进行连线操作
    var len = objArrary.length,
    cxt = mycanvas.getContext('2d');
    cxt.clearRect(0,0,mycanvas.width,mycanvas.height);  
    for(var i=0;i<len;i++){
        var temp = objArrary[i];
        drawParticle(mycanvas,temp.x,temp.y,temp.radius,temp.color);
        if(flag){
            for(var k=0;k!=i;k++){
                var tmp = objArrary[k];
                if(dist(tmp.x,tmp.y,temp.x,temp.y)<80){
                    drawLine(mycanvas,tmp.x,tmp.y,temp.x,temp.y);
                }
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
function drawStarSky(mycanvas,num,background){//数量，背景
    var canW,canH,
    star = new Image(),
    //定义星星对象
    starObj = function(){
        this.x;
        this.y;
        this.frame;
        this.gap;
    },
    num = num || 50,
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
        ctx = mycanvas.getContext('2d');
        canW = mycanvas.width;
        canH = mycanvas.height;
        star.src = './examples/star.png';
        for(var i=0;i<num;i++){
            var obj = new starObj();
            obj.init();
            stars.push(obj);
        }
        lastTime = Date.now();
        frameLoop();
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
        ctx.fillStyle = background || 'black';
        ctx.fillRect(0,0,canW,canH);
    }
    //处理序列帧图片
    //function drawObj(obj,sx,sy,sWidth,sHeight,x,y,width,height){
       // ctx.drawImage(obj,x,y,width,height);
    //}
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
        temp.radius = (temp.radius>2)?(temp.radius-=0.4):2;
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
        objArrary = [obj];//产生粒子的对象
        //ctx.globalCompositeOperation = 'xor';
        particleSystem(obj,particles,num,radius,color,turbulence,life);
    var tock = setInterval(function(){
        ctx.clearRect(0,0,mycanvasW,mycanvasH);
        drawParticle(ctx,obj.x,obj.y,obj.radius,color);
        updateObj(mycanvas,objArrary);
        for(var i=0;i<num;++i){
            var temp  = particles[i];
            drawParticle(ctx,temp.x,temp.y,temp.radius,color);
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
function initParticles(num,focalLength){
    var balls = [];
    for(var j=0;j<num;j++){
         aBall = {
                radius: Math.random()*2+2,
                xpos: Math.random()*focalLength-focalLength/2,//xpos,ypos,zpos指相对中心位置偏移
                ypos: Math.random()*focalLength-focalLength/2,
                zpos: Math.random()*focalLength-focalLength/2,
                color: randomColor(),
                x:0,
                y:0
        };
        balls[j] = aBall;
    }
    return balls;
}
function rotateSystem(mycanvas,num,angleX,angleY,focalLength){//粒子数量，绕X、Y轴旋转动量，景深
    var focalLength = focalLength || 250,//focalLength表示当前焦距，一般可设为一个常量
        num = num || 20,
        angleY = angleY || 0.2,//旋转弧度[-2*PI,2*PI]
        angleX = angleX || -0.1,
        balls = initParticles(num,focalLength),//生成随机粒子
        canW = mycanvas.width,
        canH = mycanvas.height,
        tempR = [];//保存点的原始半径
		//angleY = (x - vpx) * .001;
        for(var j=0;j<num;++j){
            tempR[j] = balls[j].radius;
        }	
		var tick = setInterval( function() { 
			for (var i=0;i<num;++i) {
                var ball=balls[i];
                rotateXY(mycanvas,ball,angleX,angleY,focalLength,tempR[i]);
            }
            drawBalls(mycanvas,balls,true);
		},50);
}
//绕XY轴伪3D旋转
function rotateXY(mycanvas,ball,angleX,angleY,focalLength,tempR){
    var cosx = Math.cos(angleX),
        sinx = Math.sin(angleX),
        cosy = Math.cos(angleY),
        siny = Math.sin(angleY),    
        x1 = ball.xpos * cosy - ball.zpos * siny,
        z1 = ball.zpos * cosy + ball.xpos * siny;     
        ball.xpos = x1;
        ball.zpos = z1;
        y1 = ball.ypos * cosx - ball.zpos * sinx,
        z1 = ball.zpos * cosx + ball.ypos * sinx;
        ball.ypos = y1;
        ball.zpos = z1;
        cx = mycanvas.width/2,//旋转轴或点
        cy = mycanvas.height/2;
         if (ball.zpos > -focalLength){
            var scale = focalLength / (focalLength + ball.zpos);
            ball.x = cx + ball.xpos * scale;
            ball.y = cy + ball.ypos * scale;
            ball.radius = tempR*2*scale;
        }
}
//分形树
function drawTree(mycanvas,startX, startY, trunkWidth,trunkHeight,level) {//起始点，树粗，树干高度，层级（茂密程度）
    var cxt = mycanvas.getContext('2d');
    if(level < 12) {  //分枝级数
        var changeX = 180 /(level+1),//分枝宽度变化范围  
        changeY = 220 /(level+1), //分枝高度变化范围
        topRightX = startX + Math.random() * changeX,  //右分枝起始点
        topRightY = startY -trunkHeight - Math.random() * changeY,
        topLeftX = startX - Math.random() * changeX,  //左分枝起始点
        topLeftY = startY -trunkHeight - Math.random() * changeY; 

        //连接右分枝
        cxt.beginPath();  
        cxt.moveTo(startX + trunkWidth / 4, startY ); 
        cxt.lineTo(startX , startY - trunkHeight); 
        cxt.quadraticCurveTo(startX + trunkWidth / 4, startY - trunkWidth-trunkHeight, topRightX, topRightY);
        cxt.lineWidth = trunkWidth*2;  
        cxt.lineCap = 'round';  
        cxt.stroke();
        //连接左分枝
        cxt.beginPath();  
        cxt.moveTo(startX - trunkWidth / 4, startY); 
        cxt.lineTo(startX , startY - trunkHeight);   
        cxt.quadraticCurveTo(startX - trunkWidth / 4, startY - trunkWidth-trunkHeight, topLeftX, topLeftY);
        cxt.lineWidth = trunkWidth*2;  
        cxt.lineCap = 'round';  
        cxt.stroke();
        //递归画左右分支
        drawTree(mycanvas,topRightX, topRightY, trunkWidth * 0.6, 0, level + 1);  
        drawTree(mycanvas,topLeftX, topLeftY, trunkWidth * 0.6, 0, level + 1);  
    }
}
//一些运动数学函数
function quaHermite(p1,p2,p3,t){//二次Hermite插值三个参照点
    var p = {};
        p.x = Math.pow(1-t,2)*p1.x + 2*t*(1-t)*p2.x + t*t*p3.x;
        p.y = Math.pow(1-t,2)*p1.y + 2*t*(1-t)*p2.y + t*t*p3.y;
}
function triHermite(p1,p2,p3,p4,t){//三次Hermite插值四个参照点
    var p = {};
        p.x = Math.pow(1-t,3)*(p1.x) + 3*t*Math.pow(1-t,2)*(p2.x) +3*Math.pow(t,2)*(1-t)*(p3.x)+t*t*t*(p4.x);
        p.y = Math.pow(1-t,3)*(p1.y) + 3*t*Math.pow(1-t,2)*(p2.y) +3*Math.pow(t,2)*(1-t)*(p3.y)+t*t*t*(p4.y);
}
//粒子拖尾效果
