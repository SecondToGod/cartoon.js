<script type="text/javascript">
	var line = document.getElementById('line');
	var context = line.getContext('2d');
	line.width = 800;
	line.height = 600;

	//渐变
	//context.beginPath();
	//var grad = context.createLinearGradient(0,0,0,line.height);
	//var grad = context.creatRadialGradient(x1,y1,r1,x2,y2,r2)//径向渐变
	
	/*grad.addColorStop(0.0,"#000");
	grad.addColorStop(1.0,"#035");
	context.fillStyle = grad;
	context.fillRect(0,0,line.width,line.height);*/

	//context.beginPath();//重新起笔
	/*context.moveTo(30,20);
	context.lineTo(120,120);
	context.lineTo(30,220)
	context.lineWidth = 8;//线段宽
	context.lineCap = 'round';//squre || butt(default)//线段端点
	context.strokeStyle = "red";//画笔颜色
	context.stroke();//开始画*/
	//矩形
	//context.rect(200,100,100,100);
	//context.fillRect(200,300,100,100);
	//context.strokeRect(200,450,100,100);
	//context.transform(a,b,c,d,e,f)ef位移，ad放大，bc倾斜;//级联性
	//context.setTransform();//变换矩阵
	//context.rotate();//旋转
	//context.scale();//放大
	//context.translate();
	/*context.beginPath();
	context.moveTo(130,20);
	context.lineTo(210,120);
	context.lineTo(130,220);
	context.closePath();//路线封闭
	context.lineWidth = 7;
	context.lineJoin = 'miter';//round||miter线段连接处形状
	context.miterLimit = 100;//连接处延伸距离
	context.strokeStyle = "green";
	context.fillStyle = "navy";
	context.fill();
	context.stroke();*/

	/*context.save();//保存绘制状态
	drawRect(context,310,20,100,100);
	drawRect2(context,400,50,100,100,8,'round','#18e','#130');
	context.restore();//恢复状态*/
	/*for(var num=0;num<30;++num){
		var x = Math.random()*line.width;
		var y = Math.random()*line.height;
		var r = Math.random()*5+5;
		var R = Math.random()*5+15;
		var rot = Math.random()*180;
		drawStar(context,x,y,r,R,rot);
	}*/
	
	//fillstyle,stokestyle填充样式
	//var grad = context.createPattern(img,repeat-style);//图片填充
	//var grad = context.createPattern(video,repeat-style);//video填充	
	//var grad = context.createPattern(canvas,repeat-style);//canvas填充
	/*context.beginPath();
	var backCanvas = getNewCanvas();
	var bgCanvas = context.createPattern(backCanvas,'repeat');
	context.fillStyle = bgCanvas;
	context.fillRect(50,50,300,300);*/
	
	//画弧
	/*context.beginPath();
	context.arc(400,400,40,0,2*Math.PI);//0,0.5,1.5,2顺时针
	context.strokeStyle = 'red';
	context.fillStyle = "orange";
	context.fill();
	context.stroke();*/
	//文字
	//context.textAlign = 'left,center,right'//水平
	//context.textBaseLine = 'top,middle,bottom'//垂直
	//context.messureText(string).width
	/*context.beginPath();
	context.font = 'bold 50px Arial';
	context.fillStyle = '#fb1';
	context.strokeStyle = '#fb1';
	context.fillText("hello canvas!",30,100);
	context.strokeText("hello webGL!",30,290);*/
	//阴影
	//context.shadowColor
	//context.shadowOffsetX
	//context.shadowOffsetY
	//context.shadowBlur
	/*context.save();
	context.beginPath();
	context.fillStyle="red";
	context.strokeStyle="blue";
	context.shadowColor = "#000";
	context.shadowOffsetX = 20;
	context.shadowOffsetY = 20;
	context.shadowBlur = 20;
	context.fillRect(300,300,50,50);
	context.restore();*/
	//全局设置
	//context.globalAlpha;//全局透明度
	//context.globalCompositeOperation = 'source-over,source-atop,source-in,source-out,destination-over,...,lighter,copy,xor'
	//
	//剪辑
	//context.clip()//限制规划路径、区域
	//非零环绕原则，绘图方向影响阴影效果
	//
	//动画要素
	//context.clearRect()
	//context.isPointInPath(x,y)
	
	//drawRoundRect(context,100,100,100,100,30);
	//drawArcTo(context,200,200,600,200,600,600,290,6);
	
	//内阴影圆环，顺逆时针产生
	//context.beginPath();
	/*context.fillStyle = "navy";
	context.arc(300,300,200,0,Math.PI*2);
	context.fill();
	context.stroke();

	context.beginPath();
	context.shadowColor = "#001";
	context.shadowBlur= 20;
	context.shadowOffsetX = 5;
	context.fillStyle = "white";*/
	/*context.arc(300,300,150,0,Math.PI*2,true);
	context.clip();
	context.stroke();*/

	//探照灯
	/*var circleLight = {x:line.width/2,y:line.height/2, radius:100,Vx:Math.random()*5+5,Vy:Math.random()*5+5};
	var tock = setInterval(function(){
			drawSearchLight(line,circleLight);
			updateLight(line,circleLight);
		},40);*/
	//随机小球运动
	randomCircle(line,70);

	//drawMoon(context,650,90,1,68,20,1,'bevel','#fb5','#fb5');
	//drawLand(context,1,'','');

	function draw(cxt,lineWidth,linejoin,borderColor,fillColor){
		cxt.strokeStyle = borderColor || '';
		cxt.lineWidth = lineWidth || 1;
		cxt.linejoin = linejoin || 'round'; 
		cxt.fillStyle = fillColor || "";
		cxt.fill();
		cxt.stroke();
	}
	//画矩形
	function drawRect(cxt,x,y,width,height){
		cxt.beginPath();
		cxt.rect(x,y,width,height);
		draw(cxt,8,'round','navy','orange');
	}
	function drawRect2(cxt,x,y,width,height,lineWidth,linejoin,borderColor,fillColor){
		cxt.beginPath();
		cxt.strokeStyle = borderColor || '#eee';
		cxt.lineWidth = lineWidth || 1;
		cxt.lineJoin = linejoin || 'round';
		cxt.fillStyle = fillColor || "#000";
		cxt.strokeRect(x,y,width,height);
		cxt.fillRect(x,y,width,height);
	}
	//五角星路径
	function drawStar(cxt,x,y,r,R,rot){
		cxt.beginPath();
		for(var i=0;i<5;++i){
			cxt.lineTo(x+Math.cos((18+rot+72*i)/180*Math.PI)*R,y-Math.sin((18+rot+72*i)/180*Math.PI)*R);
			cxt.lineTo(x+Math.cos((54+rot+72*i)/180*Math.PI)*r,y-Math.sin((54+rot+72*i)/180*Math.PI)*r);
		}
		cxt.closePath();
		draw(cxt,4,'round','#03b','orange');
	}
	function getNewCanvas(){
		var backCanvas = document.createElement('canvas');
		backCanvas.width = 50;
		backCanvas.height = 50;
		var bcxt = backCanvas.getContext('2d');
		drawStar(bcxt,25,25,10,20,3);
		return backCanvas;
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
	function drawRoundRect(cxt,x,y,width,height,radius,lineWidth,linejoin,borderColor,fillColor){
		if(2*radius > width || 2*radius > height) return;
		cxt.beginPath();
		cxt.translate(x,y);
		roundRectPath(cxt,width,height,radius);
		draw(cxt,lineWidth,linejoin,borderColor,fillColor);
	}
	function drawArcTo(cxt,x0,y0,x1,y1,x2,y2,radius,lineWidth,linejoin,borderColor){
		cxt.beginPath();
		cxt.moveTo(x0,y0);
		cxt.arcTo(x1,y1,x2,y2,radius);
		draw(cxt,lineWidth,linejoin,borderColor);
	}
	function moonPath(cxt,d){//d表示月亮弯曲程度
		cxt.beginPath();
		cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
		cxt.arcTo(d,0,0,1,dist(0,-1,d,0)/d);
		cxt.closePath();
	}function moonPath2(cxt,d){//d表示月亮弯曲程度
		cxt.beginPath();
		cxt.arc(0,0,1,0.5*Math.PI,1.5*Math.PI,true);
		cxt.quadraticCurveTo(d,0,0,1);
		cxt.closePath();
	}
	function drawMoon(cxt,x,y,d,r,rot,lineWidth,linejoin,borderColor,fillColor){
		cxt.save();
		cxt.translate(x,y);
		cxt.scale(r,r);
		cxt.rotate(rot*Math.PI/180);
		moonPath2(cxt,d);
		cxt.restore();
		draw(cxt,lineWidth,linejoin,borderColor,fillColor);
	}
	function drawLand(cxt,lineWidth,linejoin,borderColor,fillColor){
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
	function randomCircle(canvas,num){
		var cxt = canvas.getContext('2d');
		var balls = [];
		var canvasW = canvas.width,canvasH = canvas.height;
		cxt.globalAlpha = 0.8;
		context.globalCompositeOperation = 'xor';
		for(var j=0;j<num;j++){
			var R = Math.floor(Math.random()*255);
			var G = Math.floor(Math.random()*255);
			var B = Math.floor(Math.random()*255);
			var random =Math.random();
			var aBall = {
						radius: random*40+10,
						x: random*canvasW,
						y: random*canvasH,
						color: "rgb("+R+","+G+','+B+')',
						Vx: random*5+5,
						Vy: random*5+5
					}
			balls[j] = aBall;
		}
		//canvas.addEventListener('click',detect);
		setInterval(function(){
			drawBalls(canvas,balls);
			updateBalls(canvas,balls);
		},40);
	}
	function updateBalls(canvas,objArrary){	
		var len = objArrary.length; 
		var cxt = canvas.getContext('2d');
		for(var i=0;i<len;i++){//检测碰撞
			objArrary[i].x += objArrary[i].Vx;
			objArrary[i].y += objArrary[i].Vy;
			if(objArrary[i].x- objArrary[i].radius<0){
				objArrary[i].Vx = -objArrary[i].Vx;
				objArrary[i].x = objArrary[i].radius;
			}
			if(objArrary[i].y - objArrary[i].radius<0){
				objArrary[i].Vy = -objArrary[i].Vy;
				objArrary[i].y = objArrary[i].radius;
			}
			if(objArrary[i].x + objArrary[i].radius>canvas.width){
				objArrary[i].Vx = -objArrary[i].Vx;
				objArrary[i].x = canvas.width - objArrary[i].radius;
			}
			if(objArrary[i].y + objArrary[i].radius>canvas.height){
				objArrary[i].Vy = -objArrary[i].Vy;
				objArrary[i].y = canvas.height - objArrary[i].radius;
			}
		}
	}
	function drawBalls(canvas,objArrary){
		var len = objArrary.length;
		var cxt = canvas.getContext('2d');
		cxt.clearRect(0,0,canvas.width,canvas.height);
		cxt.save();
		for(var i=0;i<len;i++){
			cxt.fillStyle = objArrary[i].color;
			cxt.beginPath();	
			cxt.arc(objArrary[i].x,objArrary[i].y,objArrary[i].radius,0,Math.PI*2);
			cxt.closePath();
			cxt.fill();		
		}
		cxt.restore();
	}
	function detect(canvas,event){
		var cxt = canvas.getContext('2d');
		var x = event.clientX - canvas.getBoundingClientRect().left;//
		var y = event.clientY - canvas.getBoundingClientRect().top;//获取点击坐标
		if(cxt.isPointInPath(x,y)){//交互
			cxt.fill();
		}//判断是否在点击区域
	}
	function drawSearchLight(canvas,searchLight){
		var cxt = canvas.getContext('2d');
		var canvasW = canvas.width,canvasH = canvas.height;
		cxt.clearRect(0,0,canvasW,canvasH);
		context.save();
		cxt.beginPath();
		cxt.fillStyle = "black";
		cxt.fillRect(0,0,canvasW,canvasH);

		cxt.beginPath();
		cxt.arc(searchLight.x,searchLight.y,searchLight.radius,0,Math.PI*2);
		cxt.fillStyle = "#fff";
		cxt.fill();
		cxt.clip();

		cxt.font = "bold 50px Arial";
		cxt.fillStyle = "#058";
		cxt.fillText('hello canvas!',line.width/2,line.height/2);
		cxt.restore();
	}
	function updateLight(canvas,searchLight){
		searchLight.x += searchLight.Vx;
		searchLight.y += searchLight.Vy;
		//碰撞检测
		if(searchLight.x - searchLight.radius<0){
			searchLight.Vx = -searchLight.Vx;
			searchLight.x = searchLight.radius;
		}if(searchLight.y - searchLight.radius<0){
			searchLight.Vy = -searchLight.Vy;
			searchLight.y = searchLight.radius;
		}if(searchLight.x + searchLight.radius>canvas.width){
			searchLight.Vx = -searchLight.Vx;
			searchLight.x = canvas.width - searchLight.radius;
		}if(searchLight.y + searchLight.radius>canvas.height){
			searchLight.Vy = -searchLight.Vy;
			searchLight.y = canvas.height - searchLight.radius;
		}
	}
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
			can = document.getElementById('canvas');
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
</script>