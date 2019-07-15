 //渲染上下文
 var palette = document.getElementById('xxx');
 var context = palette.getContext('2d');
 context.fillRect(0, 0, palette.width, palette.height)
 context.fillStyle = 'wheat'
 autocanvasSize(palette)
 listenTomouse(palette)


 //画笔模式切换
 var eraserEnabled = false
 eraser.onclick = function() {
     eraserEnabled = true
     actions.className = 'actions x'
 }
 brush.onclick = function() {
         eraserEnabled = false
         actions.className = 'actions'
     }
     //画笔颜色切换
 blue.onclick = function() {
     console.log('切换蓝色')
     context.strokeStyle = 'blue'
 }
 green.onclick = function() {
     console.log('切换绿色')
     context.strokeStyle = 'green'
 }
 yellow.onclick = function() {
         console.log('切换黄色')
         context.strokeStyle = 'yellow'
     }
     //笔触大小切换
 thin.onclick = function() {
     console.log('小')
     brushwork.className = 'brushwork'
     var thickness = context.lineWidth = 4
     return thickness
 }

 wide.onclick = function() {
     console.log('大')
     brushwork.className = 'brushwork x'
     var thickness = context.lineWidth = 8
     return thickness
 }

 //清屏功能
 canvasclear.onclick = function() {
         console.log('clear')
         context.clearRect(0, 0, palette.width, palette.height)
     }
     //保存功能
 download.onclick = function() {
         var url = palette.toDataURL("image/jpg")
         var a = document.createElement('a')
         document.body.appendChild(a)
         a.href = url
         a.download = 'image'
         a.click()
     }
     //获取页面宽高
 function autocanvasSize(canvas) {
     setCanvasSize()
         //监听用户窗口
     window.onresize = function() {
         setCanvasSize()
     }

     function setCanvasSize() {
         var pageWidth = document.documentElement.clientWidth
         var pageHeight = document.documentElement.clientHeight
         canvas.width = pageWidth
         canvas.height = pageHeight
     }
 }

 //监听鼠标事件
 var usering = false //判断画笔模式
 var lastPoint = { //初始化鼠标坐标
         x: undefined,
         y: undefined
     }
     //检测ontouchstart元素是否在body里面
 if (document.body.ontouchstart !== undefined) {
     //触屏设备
     //监听移动端动作
     palette.ontouchstart = function(xx) {
         var x = xx.touches[0].clientX
         var y = xx.touches[0].clientY
         usering = true
         if (eraserEnabled) {
             context.clearRect(x - 6, y - 6, 12, 12)
         } else {
             lastPoint = {
                 x: x,
                 y: y
             }
         }
     }
     palette.ontouchmove = function(xx) {
         var x = xx.touches[0].clientX
         var y = xx.touches[0].clientY
         if (!usering) {
             return
         }
         if (eraserEnabled) {
             context.clearRect(x - 6, y - 6, 12, 12)
         } else {
             var newPoint = {
                 "x": x,
                 "y": y
             }
             drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
             lastPoint = newPoint
         }
     }
     palette.ontouchend = function(xx) {

         context.closePath();
         usering = false
     }
 } else {}
 //非触屏设备
 function listenTomouse(canvas) {
     palette.onmousedown = function(xx) { //点击鼠标事件
         var x = xx.clientX
         var y = xx.clientY
         usering = true
         if (eraserEnabled) {
             context.clearRect(x - 6, y - 6, 12, 12)
         } else {
             lastPoint = {
                 x: x,
                 y: y
             }
         }
     }

     palette.onmousemove = function(xxx) { //移动鼠标事件
         var x = xxx.clientX
         var y = xxx.clientY
         if (!usering) {
             return
         }
         if (eraserEnabled) {
             context.clearRect(x - 6, y - 6, 12, 12)
         } else {
             var newPoint = {
                 "x": x,
                 "y": y
             }
             drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
             lastPoint = newPoint
         }
     }
     palette.onmouseup = function() { //松开鼠标事件
         context.closePath();
         usering = false
     }
 }

 //画笔属性
 function drawLine(x1, y1, x2, y2, thickness) {
     context.beginPath()
     context.lineWidth = thickness
     context.moveTo(x1, y1) //起点
     context.lineTo(x2, y2); //终点
     context.stroke()
     context.closePath()
 }
 //橡皮擦属性
 function drawCircle(x, y, radius) {
     context.beginPath()
     context.fillStyle = 'red'
     context.arc(x, y, radius, 0, Math.PI * 2);
     context.fill()
 }