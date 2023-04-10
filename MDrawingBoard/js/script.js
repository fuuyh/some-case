const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// 设置画笔初始大小
let lineWidth = 5


autoSetCanvasSize(canvas)
listenToMouse(canvas)
    /*******/

// 封装鼠标 触屏 事件函数 优化
function listenToMouse(canvas) {
    var flag = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    // 判断是否支持touch手机触屏    undefinded是声明未定义，也就是没有初始化(不存在)。null是声明并定义成null
    // 也叫特性检测
    if (document.body.ontouchstart !== undefined) {
        // 触屏设备
        // touchstart 点击触屏事件
        canvas.addEventListener('touchstart', function(e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            flag = true
            if (usingEraser) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                };
            }
        });
        // touchmove 移动触屏事件
        canvas.addEventListener('touchmove', function(e) {
            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;

            if (!flag) {
                return
            }

            if (usingEraser) {
                ctx.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
                var newPoint = {
                    'x': x,
                    'y': y
                };
                // console.log(newPoint);
                // drawCircle(x, y, 1);
                drawLine(lastPoint.x, lastPoint.y, newPoint.x,
                    newPoint.y)
                lastPoint = newPoint
            }
        });
        //离开屏幕事件touchend
        canvas.addEventListener('touchend', function(e) {
            flag = false
        });
    } else {
        // 非触屏设备
        canvas.addEventListener('mousedown', function(e) {
            var x = e.clientX
            var y = e.clientY
            flag = true
            if (usingEraser) {
                ctx.clearRect(x - 5, y - 5, 25, 25)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                };
            }
            // console.log(lastPoint);
            // drawCircle(x, y, 1)
        })

        canvas.addEventListener('mousemove', function(e) {
            var x = e.clientX;
            var y = e.clientY;

            if (!flag) {
                return
            }

            if (usingEraser) {
                ctx.clearRect(x - 5, y - 5, 25, 25)
            } else {
                var x = e.clientX;
                var y = e.clientY;
                var newPoint = {
                    'x': x,
                    'y': y
                };
                // console.log(newPoint);
                // drawCircle(x, y, 1);
                drawLine(lastPoint.x, lastPoint.y, newPoint.x,
                    newPoint.y)
                lastPoint = newPoint

            }
        })

        canvas.addEventListener('mouseup', function(e) {
            flag = false
        })
    }

}

/*********/

// 封装关于改变页面尺寸的函数
function autoSetCanvasSize(canvas) {
    setCanvasSize();
    // 当屏幕变化时
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

/**********/

// 按下橡皮擦或者画笔
const eraser = document.getElementById('eraser');
const brush = document.getElementById('brush');
const colors = document.querySelector('.colors');
// 获取画笔颜色列表
const black = document.querySelector('.black')
const red = document.querySelector('.red')
const blue = document.querySelector('.blue');
//获取清屏属性
const clear = document.getElementById('clear');
// 获取下载属性
const download = document.getElementById('download')

// 设置橡皮擦的开启或关闭
let usingEraser = false;
// 设置画笔列表的开启和关闭
let brushListFlag = false;



// 橡皮
eraser.onclick = function() {
    usingEraser = true
    brushListFlag = false
    eraser.classList.add('active')
    if (brushListFlag == false) {
        colors.style.opacity = 0
    }
    brush.classList.remove('active')
};
// 画笔
brush.onclick = function() {
    usingEraser = false
    brushListFlag = !brushListFlag
    brush.classList.add('active')
    if (brushListFlag) {
        colors.style.opacity = 1
    } else {
        colors.style.opacity = 0
    }
    eraser.classList.remove('active')
};

//清屏
clear.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// 下载
download.onclick = function() {
    var url = canvas.toDataURL("image/png")
        // console.log(url);
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url;
    // 1到1000随机数
    a.download = Math.floor((Math.random() * 1000) + 1);
    a.click()
}


// 黑色
black.onclick = function() {
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
};
// 红色
red.onclick = function() {
    ctx.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
};
// 蓝色
blue.onclick = function() {
    ctx.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    black.classList.remove('active')
};

//设置线条粗细
const addThin = document.getElementById('addThin');
//细线
addThin.onclick = function() {
  if (lineWidth === 5) {
    lineWidth = 10
  } else {
    lineWidth = 5
  }
}

// 为了让线条更流畅
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
        // ctx.strokeStyle = 'black'
    ctx.moveTo(x1, y1); //起点
    ctx.lineWidth = lineWidth; //线条大小
    ctx.lineTo(x2, y2); //终点
    ctx.stroke()
    ctx.closePath()
}